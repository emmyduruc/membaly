import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  userId: string;

  @IsString()
  tier: string;
}

export class UpdateSubscriptionDto {
  @IsString()
  @IsOptional()
  tier?: string;
}
