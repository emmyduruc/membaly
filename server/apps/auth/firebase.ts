import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService {
  constructor() {}

  async verifyFirebaseToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return await getAuth().verifyIdToken(token);
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

  async createUserWithPassword({ email, password }) {
    return getAuth().createUser({
      email,
      password,
    });
  }

  async loginWithPassword({ email, password }) {
    return getAuth().getUserByEmail(email);
  }

  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    return getAuth().getUser(uid);
  }

  async deleteUser(uid: string) {
    return getAuth().deleteUser(uid);
  }

  async updateUser(uid: string, data: any) {
    return getAuth().updateUser(uid, data);
  }
}
