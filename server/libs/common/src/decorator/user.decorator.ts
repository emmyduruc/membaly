import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserLoginDto {
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: 'JohnDoe@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: '1234567',
  })
  password: string;

  @ApiProperty({
    description: 'The unique identifier for the user role.',
    example: 'token',
  })
  token: string;
}

export class UserRegisterDto {
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: 'email@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: '1234567',
  })
  password: string;
  @ApiProperty({
    description: 'The unique identifier for the user role.',
    example: 'USER',
    enum: Role,
  })
  role: Role;
}
