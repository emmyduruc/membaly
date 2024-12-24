import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMembershipDto, MembershipIdDto } from './dto/membership.dto';
import { prisma } from '@app/common';

@Injectable()
export class MembershipService {
  getHello(): string {
    return 'Hello World!';
  }

  async createMembership(dto: CreateMembershipDto) {
    try {
      return await prisma.membership.create({
        data: dto,
      });
    } catch (err) {
      throw new Error(`Error creating membership: ${err}`);
    }
  }

  async updateMembership(dto: CreateMembershipDto) {
    try {
      return await prisma.membership.update({
        where: { id: dto.id },
        data: dto,
      });
    } catch (err) {
      throw new Error(`Error updating membership: ${err}`);
    }
  }

  async deleteMembership(dto: MembershipIdDto) {
    try {
      return await prisma.membership.delete({
        where: { id: dto.id },
      });
    } catch (err) {
      throw new Error(`Error deleting membership: ${err}`);
    }
  }

  async getAllMembership() {
    try {
      return await prisma.membership.findMany();
    } catch (err) {
      throw new Error(`Error getting membership: ${err}`);
    }
  }

  async getMembershipById(id: string) {
    try {
      const membership = await prisma.membership.findUnique({
        where: {
          id: id,
        },
      });
      if (!membership) {
        throw new Error(`Membership with id ${id} not found`);
      }
      return membership;
    } catch (err) {
      throw new Error(`Error getting membership: ${err}`);
    }
  }

  async listMemberships() {
    return [
      { id: 1, name: 'Premium Membership', price: 100 },
      { id: 2, name: 'Basic Membership', price: 50 },
    ];
  }
}
