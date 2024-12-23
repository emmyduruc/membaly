import * as Joi from 'joi';

export const subscriptionSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  tier: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const createSubscriptionSchema = Joi.object({
  userId: Joi.string().required(),
  tier: Joi.string().required(),
});

export const updateSubscriptionSchema = Joi.object({
  tier: Joi.string().optional(),
});

export const subscriptionIdSchema = Joi.object({
  id: Joi.string().required(),
});
