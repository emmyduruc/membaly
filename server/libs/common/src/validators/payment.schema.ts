import * as Joi from 'joi';

export const createPaymentSchema = Joi.object({
  membershipId: Joi.string().uuid().required(),
  paymentType: Joi.string().valid('ONE_TIME', 'RECURRING', 'FREE').required(),
  amount: Joi.number().required(),
});

export const createSubscriptionSchema = Joi.object({
  membershipId: Joi.string().uuid().required(),
  subscriptionType: Joi.string()
    .valid('MONTHLY', 'YEARLY', 'QUARTERLY')
    .required(),
  userId: Joi.string().uuid().required(),
  amount: Joi.number().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscriptionId: Joi.string().uuid().required(),
  subscriptionType: Joi.string().valid('MONTHLY', 'YEARLY', 'QUARTERLY'),
  amount: Joi.number(),
  status: Joi.string(),
});
