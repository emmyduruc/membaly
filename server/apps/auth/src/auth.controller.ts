import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from '../../../libs/common/src/decorator/current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from './guards/firebase.guard';
import { UserService } from 'apps/user/src/user.service';
import { Prisma } from '@prisma/client';
import { createUserSchema, Role } from '@app/common/validators';
import { FirebaseAdminService } from '../firebase';
import {
  UserLoginDto,
  UserRegisterDto,
} from '@app/common/decorator/user.decorator';
import { JoiValidationPipe } from '@app/common/validators/joinValidationPipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH') private readonly authClientProxy: ClientProxy,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticates the user and returns a token.',
  })
  async login(@Body() credentials: UserLoginDto) {
    try {
      return this.authService.login(credentials);
    } catch (err) {
      console.error('Error during login:', err);
      throw err;
    }
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Registers a user with Firebase and saves them in the database.',
  })
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async register(@Body() data: UserRegisterDto) {
    try {
      return this.authService.register(data);
    } catch (err) {
      console.error('Error during registration:', err);
      throw err;
    }
  }
}
