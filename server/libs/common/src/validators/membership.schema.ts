import * as Joi from 'joi';

export const membershipSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  benefits: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  creatorId: Joi.string().required(),
  createdAt: Joi.date().required(),
});

export const createMembershipSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  benefits: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  creatorId: Joi.string().required(),
});

export const updateMembershipSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
});

export const categorySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  memberships: Joi.array().items(Joi.string()).optional(),
});
export const membershipIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createMembershipTagSchema = Joi.object({
  name: Joi.string().required(),
});

export const createMembershipCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});
export const addTagToCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  tagId: Joi.string().required(),
});
