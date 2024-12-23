import * as Joi from 'joi';

export const favoriteSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
  createdAt: Joi.date().required(),
});

export const createFavoriteSchema = Joi.object({
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
});

export const favoriteIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const recommendationSchema = Joi.object({
  id: Joi.string().required(),
  recommenderId: Joi.string().required(),
  membershipId: Joi.string().required(),
  createdAt: Joi.date().required(),
});

export const createRecommendationSchema = Joi.object({
  recommenderId: Joi.string().required(),
  membershipId: Joi.string().required(),
});

export const recommendationIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const successStorySchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  media: Joi.array().items(Joi.string()).optional(),
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
  createdAt: Joi.date().required(),
});

export const createSuccessStorySchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  media: Joi.array().items(Joi.string()).optional(),
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
});

export const successStoryIdSchema = Joi.object({
  id: Joi.string().required(),
});
