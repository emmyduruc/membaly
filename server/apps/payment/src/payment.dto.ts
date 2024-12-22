import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: 'oeoeoeoe',
  })
  userid: string;

  @ApiProperty({
    description: 'The cost of the payment.',
    example: 56,
  })
  cost: number;
}
