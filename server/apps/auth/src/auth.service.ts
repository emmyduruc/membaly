import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { FirebaseAdminService } from '../firebase';
import { User } from '@prisma/client';
import {
  UserLoginDto,
  UserRegisterDto,
} from '@app/common/decorator/user.decorator';
import { UserService } from 'apps/user/src/user.service';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly userService: UserService,
  ) {}

  async login(
    credentials: UserLoginDto,
  ): Promise<{ message: string; token: string }> {
    // const tokenPayload: TokenPayload = {
    //   userId: user._id.toHexString(),
    // };

    // const expires = new Date();
    // expires.setSeconds(
    //   expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    // );

    // const token = this.jwtService.sign(tokenPayload);

    // response.cookie('Authentication', token, {
    //   httpOnly: true,
    //   expires,
    // });
    try {
      const userCred = await this.firebaseAdminService.getUserByEmail(
        credentials.email,
      );

      // Verify email  password (done client-side)
      const token = await this.firebaseAdminService.createCustomToken(
        userCred.uid,
      );

      return {
        message: 'Login successful',
        token,
      };
    } catch (err) {
      console.error('Error during login:', err);
      throw err;
    }
  }

  async register(
    data: UserRegisterDto,
  ): Promise<{ user: User; message: string }> {
    try {
      const firebaseUser = await this.firebaseAdminService.createUser({
        email: data.email,
        password: data.password,
      });

      if (!firebaseUser) {
        throw new Error('Failed to create user in Firebase');
      }

      const prismaUser = await this.userService.createUser({
        id: firebaseUser.uid,
        email: data.email,
        role: data.role,
      });

      return {
        message: 'User registered successfully',
        user: prismaUser,
      };
    } catch (err) {
      console.error('Error during registration:', err);
      throw err;
    }
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
