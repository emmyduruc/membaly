import * as Joi from 'joi';
import { Role as PrismaRole } from '@prisma/client';

//create a schema for the user role
export enum Role {
  'ADMIN',
  'USER',
  'CREATOR',
}
export const mapUserRole = (role: PrismaRole): Role => {
  const roleMap: Record<PrismaRole, Role> = {
    [PrismaRole.ADMIN]: Role.ADMIN,
    [PrismaRole.USER]: Role.USER,
    [PrismaRole.CREATOR]: Role.CREATOR,
  };

  return roleMap[role];
};
export const userSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('ADMIN', 'USER').required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});
export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('ADMIN', 'USER').required(),
});
export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('ADMIN', 'USER'),
});
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const userIdSchema = Joi.object({
  id: Joi.string().required(),
});
export const deleteUserSchema = Joi.object({
  id: Joi.string().required(),
});
export const userResponseSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('ADMIN', 'USER').required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});
export const usersResponseSchema = Joi.array().items(userResponseSchema);
export const userParamsSchema = Joi.object({
  id: Joi.string().required(),
});
