import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService {
  constructor() {}

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return getAuth().verifyIdToken(token);
  }

  async createUser({ email, password }): Promise<admin.auth.UserRecord> {
    return getAuth().createUser({
      email,
      password,
    });
  }

  async createCustomToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }

  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    return getAuth().getUserByEmail(email);
  }

  async deleteUser(uid: string) {
    return getAuth().deleteUser(uid);
  }

  async updateUser(uid: string, data: any) {
    return getAuth().updateUser(uid, data);
  }
}
