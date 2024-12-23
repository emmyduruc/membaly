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

export const membershipIdSchema = Joi.object({
  id: Joi.string().required(),
});
