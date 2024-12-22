import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseAdminService } from 'apps/auth/firebase';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return false;
    }

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request.user = decodedToken;
      return true;
    } catch (err) {
      return false;
    }
  }
}
