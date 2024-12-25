import { prisma } from '@app/common';
import {
  Inject,
  Logger,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentProviderService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentProviderService.name);
  private readonly configService = new ConfigService();

  constructor() {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2024-12-18.acacia',
    });
    this.logger.log('StripeService initialized with API version 2023-10-16');
  }
  //This method is used to connect a Stripe account to a creator's profile, so that we can charge users for their subscriptions and they can receive payments.
  async connectStripeAccount(
    creatorId: string,
  ): Promise<{ onboardingLink: string }> {
    const creator = await prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) throw new BadRequestException('Creator not found');

    let stripeAccountId = creator.stripeAccountId;

    if (!stripeAccountId) {
      const account = await this.stripe.accounts.create({
        type: 'express',
      });

      stripeAccountId = account.id;

      await prisma.user.update({
        where: { id: creatorId },
        data: { stripeAccountId },
      });
    }

    const onboardingLink = await this.stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: process.env.STRIPE_REDIRECT_URI,
      return_url: process.env.STRIPE_RETURN_URI,
      type: 'account_onboarding',
    });

    return { onboardingLink: onboardingLink.url };
  }
  async createSubscription(
    userId: string,
    membershipId: string,
    paymentMethodId: string,
  ) {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId },
    });

    if (!membership) {
      throw new Error('Membership not found');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.name,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: membership.stripePriceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    await prisma.subscription.create({
      data: {
        userId,
        membershipId,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        amount: membership.price,
      },
    });

    return subscription;
  }
}
