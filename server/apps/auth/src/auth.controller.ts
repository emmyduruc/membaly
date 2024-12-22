import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface User {
  _id: {
    toHexString(): string;
  };
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH') private readonly authService: ClientProxy) {}

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticates the user and returns a token.',
  })
  login(@Body() credentials: any) {
    return this.authService.send({ cmd: 'login' }, credentials);
  }
}
