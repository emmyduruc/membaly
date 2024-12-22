import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/common/decorator/roles.decorator';
import { UserService } from 'apps/user/src/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Note: roles specified means public access
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization token is missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const userId = this.decodeToken(token);

      const user = await this.userService.findUserByFirebaseId(userId);

      if (!user || !user.role) {
        throw new UnauthorizedException('User role not found');
      }

      return requiredRoles.includes(user.role);
    } catch (err) {
      console.error('Error in RolesGuard:', err);
      throw new UnauthorizedException('Access denied');
    }
  }

  private decodeToken(token: string): string {
    //TODO: Decode the token ( Firebase or JWT decode)

    return 'decodedUserId';
  }
}
