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

const __DEV__ = process.env.NODE_ENV !== 'development';
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

  async login(loginDto: UserLoginDto): Promise<string> {
    try {
      if (__DEV__) {
        const existingUser = await this.userService.findUserByEmail(
          loginDto.email,
        );
        if (!existingUser) {
          throw new Error('User not found');
        }
        const token = await this.firebaseAdminService.createCustomToken(
          existingUser.id,
        );

        if (!token) {
          throw new Error('Failed to create custom token');
        }

        const payload = { userId: existingUser.id, role: existingUser.role };
        return this.jwtService.sign(payload, {
          expiresIn: this.configService.get('JWT_EXPIRATION'),
          secret: this.configService.get('JWT_SECRET'),
        });
      } else {
        const decodedToken =
          await this.firebaseAdminService.verifyFirebaseToken(loginDto.token);

        const user = await this.userService.findUserById(decodedToken.uid);
        const payload = { userId: user.id, role: user.role };
        return this.jwtService.sign(payload, {
          expiresIn: Number(this.configService.get('JWT_EXPIRATION')),
          secret: this.configService.get('JWT_SECRET'),
        });
      }
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
