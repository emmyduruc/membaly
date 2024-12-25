import { MessagePattern } from '@nestjs/microservices';
import {
  CreateMembershipCategoryDto,
  CreateMembershipDto,
  CreateMembershipTagDto,
  MembershipIdDto,
} from './dto/membership.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '@app/common';

@Injectable()
export class MembershipService {
  getHello(): string {
    return 'Hello World!';
  }

  async createMembership(dto: CreateMembershipDto) {
    try {
      const { categoryTags, ...membershipData } = dto;

      const membership = await prisma.membership.create({
        data: {
          ...membershipData,
          creatorId: dto.creatorId,
        },
      });

      if (categoryTags && categoryTags.length > 0) {
        const categoryTagsPromises = categoryTags.map((tag) => {
          return prisma.categoryTags.create({
            data: {
              categoryId: tag.categoryId,
              tagId: tag.tagId,
              memberships: {
                connect: {
                  id: membership.id,
                },
              },
            },
          });
        });

        await Promise.all(categoryTagsPromises);
      }

      return membership;
    } catch (err) {
      throw new Error(`Error creating membership: ${err}`);
    }
  }

  async updateMembership(dto: CreateMembershipDto) {
    try {
      const { categoryTags, id, creatorId, ...updateData } = dto;
      return await prisma.membership.update({
        where: { id: dto.id },
        data: updateData,
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

  async createMembershipTag(createTagDto: CreateMembershipTagDto) {
    const { name } = createTagDto;

    const tag = await prisma.tag.create({
      data: {
        name: name,
      },
    });

    return tag;
  }

  async createMembershipCategory(
    createCategoryDto: CreateMembershipCategoryDto,
  ) {
    try {
      const { name, description } = createCategoryDto;

      const category = await prisma.category.create({
        data: {
          name: name,
          description: description,
        },
      });

      return category;
    } catch (err) {
      throw new Error(`Error creating category: ${err}`);
    }
  }

  async createCategory(categoryName: string, description?: string) {
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (existingCategory) {
        return existingCategory;
      }

      const newCategory = await prisma.category.create({
        data: {
          name: categoryName,
          description: description || '',
        },
      });

      return newCategory;
    } catch (err) {
      throw new Error(`Error creating category: ${err}`);
    }
  }

  async createTag(tagName: string) {
    try {
      const existingTag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      if (existingTag) {
        return existingTag;
      }

      const newTag = await prisma.tag.create({
        data: { name: tagName },
      });

      return newTag;
    } catch (err) {
      throw new Error(`Error creating tag: ${err}`);
    }
  }

  async addTagToCategory(categoryName: string, tagName: string) {
    const category = await this.createCategory(categoryName);
    const tag = await this.createTag(tagName);

    const categoryTag = await prisma.categoryTags.create({
      data: {
        categoryId: category.id,
        tagId: tag.id,
      },
    });

    return { category, tag, categoryTag };
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
