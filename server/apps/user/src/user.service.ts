import { AbstractRepository, prisma } from '@app/common';
import { UserRegisterDto } from '@app/common/decorator/user.decorator';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  getUser(userId: string): string {
    return `User with id ${userId}`;
  }
  createUser(user: Partial<User>): Promise<User> {
    return prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findUserByFirebaseId(firebaseId: string) {
    return prisma.user.findUnique({
      where: { id: firebaseId },
      select: { role: true },
    });
  }
}
