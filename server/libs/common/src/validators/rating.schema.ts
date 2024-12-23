import * as Joi from 'joi';

export const ratingSchema = Joi.object({
  id: Joi.string().required(),
  score: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
  createdAt: Joi.date().required(),
});

export const createRatingSchema = Joi.object({
  score: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
  userId: Joi.string().required(),
  membershipId: Joi.string().required(),
});

export const ratingIdSchema = Joi.object({
  id: Joi.string().required(),
});
