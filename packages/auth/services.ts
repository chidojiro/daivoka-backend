import { JWT_SECRET, SALT_ROUNDS } from '@/env/constants';
import { ErrorMessage } from '@/errors/constants';
import { UserServices } from '@/user/services';
import { CreateUserPayload } from '@/user/types';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginPayload } from './types';

const register = async (payload: CreateUserPayload) => {
  const existingUser = await UserServices.getByEmail(payload.email);

  if (existingUser) {
    throw Boom.badRequest(ErrorMessage.ALREADY_EXIST);
  }

  const encryptedPassword = bcrypt.hashSync(payload.password, SALT_ROUNDS);

  const { password, ...newUser } = await (
    await UserServices.create({ email: payload.email, password: encryptedPassword })
  ).toObject();

  const accessToken = jwt.sign(newUser, JWT_SECRET);

  return { accessToken, ...newUser };
};

const login = async (payload: LoginPayload) => {
  const existingUser = await UserServices.getByEmail(payload.email);

  if (!existingUser) {
    throw Boom.notFound('User not found');
  }

  const isPasswordMatched = bcrypt.compareSync(payload.password, existingUser.password);

  if (!isPasswordMatched) {
    throw Boom.badRequest('Password incorrect');
  }

  const { password: _, ...publicUserData } = existingUser.toObject();

  const accessToken = jwt.sign(publicUserData, JWT_SECRET);

  return { accessToken, ...publicUserData };
};

export const AuthServices = { register, login };
