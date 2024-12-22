import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }

  async createUser({ email, password }): Promise<admin.auth.UserRecord> {
    return admin.auth().createUser({
      email,
      password,
    });
  }

  async createCustomToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }

  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    return admin.auth().getUserByEmail(email);
  }

  async deleteUser(uid: string) {
    return admin.auth().deleteUser(uid);
  }

  async updateUser(uid: string, data: any) {
    return admin.auth().updateUser(uid, data);
  }
}
