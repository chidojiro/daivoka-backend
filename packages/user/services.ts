import { UserModel } from './models';
import { CreateUserPayload } from './types';

const create = (data: CreateUserPayload) => {
  return UserModel.create(data);
};

const getByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const UserServices = { create, getByEmail };
