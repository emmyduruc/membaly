import { PrismaClient, Prisma } from '@prisma/client';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export abstract class AbstractRepository<
  TModel,
  TCreateInput,
  TUpdateInput,
  TWhereUniqueInput,
  TFindManyArgs,
> {
  protected abstract readonly logger: Logger;
  protected abstract readonly prisma: PrismaClient;
  protected abstract readonly modelName: keyof PrismaClient;

  private get model() {
    return this.prisma[this.modelName] as any;
  }

  async create(data: TCreateInput): Promise<TModel> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      this.logger.error('Error creating document', { data, error });
      throw error;
    }
  }

  async findOne(where: TWhereUniqueInput): Promise<TModel | null> {
    try {
      const document = await this.model.findUnique({ where });
      if (!document) {
        this.logger.warn('Document not found with filterQuery', where);
        throw new NotFoundException('Document not found.');
      }
      return document;
    } catch (error) {
      this.logger.error('Error finding document', { where, error });
      throw error;
    }
  }

  async findMany(params: TFindManyArgs): Promise<TModel[]> {
    try {
      return this.model.findMany(params);
    } catch (error) {
      this.logger.error('Error finding many documents', { params, error });
      throw error;
    }
  }

  async update(where: TWhereUniqueInput, data: TUpdateInput): Promise<TModel> {
    try {
      return await this.model.update({ where, data });
    } catch (error) {
      this.logger.error('Error updating document', { where, data, error });
      throw error;
    }
  }

  async delete(where: TWhereUniqueInput): Promise<TModel> {
    try {
      return await this.model.delete({ where });
    } catch (error) {
      this.logger.error('Error deleting document', { where, error });
      throw error;
    }
  }

  async upsert(
    where: TWhereUniqueInput,
    create: TCreateInput,
    update: TUpdateInput,
  ): Promise<TModel> {
    try {
      return this.model.upsert({
        where,
        create,
        update,
      });
    } catch (error) {
      this.logger.error('Error upserting document', {
        where,
        create,
        update,
        error,
      });
      throw error;
    }
  }

  async transaction<R>(
    callback: (prisma: PrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(callback);
  }
}

//   //   async transaction<R>(
//   //     callback: (prisma: PrismaClient) => Promise<R>,
//   //   ): Promise<R> {
//   //     return this.prisma.$transaction(async (prisma) => {
//   //       return callback(prisma); // Ensure "prisma" is of type PrismaClient
//   //     });
//   //   }
// }

// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaClient, Prisma } from '@prisma/client';
// import { AbstractRepository } from './abstract.repository';

// @Injectable()
// export class UserRepository extends AbstractRepository<
//   Prisma.User,
//   Prisma.UserCreateInput,
//   Prisma.UserUpdateInput,
//   Prisma.UserWhereUniqueInput,
//   Prisma.UserFindManyArgs
// > {
//   protected readonly logger = new Logger(UserRepository.name);
//   protected readonly prisma: PrismaClient;
//   protected readonly modelName: keyof PrismaClient = 'user';

//   constructor(prisma: PrismaClient) {
//     super();
//     this.prisma = prisma;
//   }
// }
