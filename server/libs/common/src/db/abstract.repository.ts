import { PrismaClient, Prisma } from '@prisma/client'; // Adjust model imports as needed
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InternalArgs } from '@prisma/client/runtime/library';

@Injectable()
export abstract class AbstractRepository<TModel, TCreateInput, TUpdateInput> {
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
  async findOne(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<TModel | null> {
    const document = await this.model.findUnique({ where });
    return document;
  }
  //   async findOne(where: Prisma.ToolWhereUniqueInput): Promise<TModel | null> {
  //     const document = await this.model.findUnique({ where });
  //     if (!document) {
  //       this.logger.warn('Document not found with filterQuery', where);
  //       throw new NotFoundException('Document not found.');
  //     }
  //     return document;
  //   }

  async findMany(
    params: Prisma.ToolFindManyArgs<InternalArgs>,
  ): Promise<TModel[]> {
    return this.model.findMany(params);
  }

  async update(
    where: Prisma.CategoryWhereUniqueInput,
    data: TUpdateInput,
  ): Promise<TModel> {
    try {
      const updatedDocument = await this.model.update({ where, data });
      return updatedDocument;
    } catch (error) {
      this.logger.error('Error updating document', { where, data, error });
      throw error;
    }
  }

  async delete(where: Prisma.CategoryWhereUniqueInput): Promise<TModel> {
    try {
      return await this.model.delete({ where });
    } catch (error) {
      this.logger.error('Error deleting document', { where, error });
      throw error;
    }
  }

  async upsert(
    where: Prisma.CategoryWhereUniqueInput,
    create: TCreateInput,
    update: TUpdateInput,
  ): Promise<TModel> {
    return this.model.upsert({
      where,
      create,
      update,
    });
  }

  async transaction<R>(
    callback: (prisma: PrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(callback); // Pass full PrismaClient instance
  }
  //   async transaction<R>(
  //     callback: (prisma: PrismaClient) => Promise<R>,
  //   ): Promise<R> {
  //     return this.prisma.$transaction(async (prisma) => {
  //       return callback(prisma); // Ensure "prisma" is of type PrismaClient
  //     });
  //   }
}
