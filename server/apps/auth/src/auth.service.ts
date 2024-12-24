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
import { BadRequestException } from '@nestjs/common';

const __DEV__ = process.env.NODE_ENV !== 'development';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: UserLoginDto): Promise<{
    token: string;
    user: User;
  }> {
    try {
      if (__DEV__) {
        if (!loginDto.email) {
          throw new BadRequestException('Email is required');
        }
        const existingUser = await this.userService.findUserByEmail(
          loginDto.email,
        );
        if (!existingUser) {
          throw new Error('User not found');
        }
        const token = this.jwtSign(existingUser);

        return {
          token: token,
          user: existingUser,
        };
      } else {
        const decodedToken =
          await this.firebaseAdminService.verifyFirebaseToken(loginDto.token);

        const user = await this.userService.findUserById(decodedToken.uid);
        return {
          token: this.jwtSign(user),
          user: user,
        };
      }
    } catch (err) {
      console.error('Error during login:', err);
      throw err;
    }
  }

  jwtSign(payload: User): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  jwtVerify(token: string): User {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async register(
    data: UserRegisterDto,
  ): Promise<{ user: User; token: string }> {
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

      if (!prismaUser) {
        throw new Error('Failed to create user in Prisma');
      }

      const token = this.jwtSign(prismaUser);

      return {
        token: token,
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
