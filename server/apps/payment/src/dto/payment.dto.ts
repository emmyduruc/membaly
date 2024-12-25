import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsEnum } from 'class-validator';

export enum PaymentType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
  FREE = 'FREE',
}

export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  QUARTERLY = 'QUARTERLY',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNPAID = 'UNPAID',
  CANCELLED = 'CANCELLED',
  TRIAL = 'TRIAL',
  PAST_DUE = 'PAST_DUE',
  PAUSED = 'PAUSED',
}

export class CreatePaymentDto {
  @ApiProperty({ description: 'Membership ID the payment is for' })
  @IsUUID()
  membershipId: string;

  @ApiProperty({ description: 'Payment type (ONE_TIME, RECURRING, or FREE)' })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({ description: 'Payment amount in USD' })
  @IsNumber()
  amount: number;
}

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Membership ID the subscription is for' })
  @IsUUID()
  membershipId: string;

  @ApiProperty({
    description: 'Subscription type (MONTHLY, YEARLY, QUARTERLY)',
  })
  @IsEnum(SubscriptionType)
  subscriptionType: SubscriptionType;

  @ApiProperty({ description: 'User ID of the subscriber' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Payment amount in USD' })
  @IsNumber()
  amount: number;
}

export class UpdateSubscriptionDto {
  @ApiProperty({ description: 'Subscription ID' })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({
    description: 'New subscription type (MONTHLY, YEARLY, QUARTERLY)',
    required: false,
  })
  @IsEnum(SubscriptionType)
  subscriptionType?: SubscriptionType;

  @ApiProperty({ description: 'New payment amount in USD', required: false })
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'New subscription status', required: false })
  @IsString()
  status?: SubscriptionStatus;
}
