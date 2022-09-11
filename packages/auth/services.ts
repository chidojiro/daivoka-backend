import { UserServices } from '@/user/services';
import { CreateUserPayload } from '@/user/types';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginPayload } from './types';

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = +process.env.SALT_ROUNDS!;

const register = async (payload: CreateUserPayload) => {
  const existingUser = await UserServices.getByEmail(payload.email);

  if (existingUser) {
    return Boom.badRequest('User already exists');
  }

  const encryptedPassword = bcrypt.hashSync(payload.password, SALT_ROUNDS);

  const newUser = await UserServices.create({ email: payload.email, password: encryptedPassword });

  return newUser;
};

const login = async (payload: LoginPayload) => {
  const existingUser = await UserServices.getByEmail(payload.email);

  if (!existingUser) {
    return Boom.notFound('User not found');
  }

  const isPasswordMatched = bcrypt.compareSync(payload.password, existingUser.password);

  if (!isPasswordMatched) {
    return Boom.badRequest('Password incorrect');
  }

  const { _id, ...jwtPayload } = existingUser;

  const accessToken = jwt.sign(jwtPayload, JWT_SECRET);

  return accessToken;
};

export const AuthServices = { register, login };
