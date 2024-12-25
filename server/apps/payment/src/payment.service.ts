import { prisma } from '@app/common';
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreatePaymentDto,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/payment.dto';
import { Prisma, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  @MessagePattern({ cmd: 'process-payment' })
  async processPayment(
    @Payload() paymentData: { userid: string; cost: number },
  ) {
    console.log('Processing payment for user:', paymentData.userid);

    return { success: true, message: 'Payment processed successfully' };
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { membershipId, paymentType, amount } = createPaymentDto;

    const payment = await prisma.payment.create({
      data: {
        membershipId,
        paymentType,
        amount,
      } as Prisma.PaymentUncheckedCreateInput,
    });

    return payment;
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const { membershipId, subscriptionType, userId, amount } =
      createSubscriptionDto;

    const subscription = await prisma.subscription.create({
      data: {
        membershipId,
        subscriptionType,
        userId,
        amount,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    return subscription;
  }

  async updateSubscription(updateSubscriptionDto: UpdateSubscriptionDto) {
    const { subscriptionId, subscriptionType, amount, status } =
      updateSubscriptionDto;

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        subscriptionType,
        amount,
        status,
      },
    });

    return updatedSubscription;
  }

  async cancelSubscription(subscriptionId: string) {
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: SubscriptionStatus.CANCELLED },
    });

    return updatedSubscription;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
