import * as Joi from 'joi';

export const categorySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  createdAt: Joi.date().required(),
});

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
});

export const categoryIdSchema = Joi.object({
  id: Joi.string().required(),
});
