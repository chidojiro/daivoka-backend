import { UserModel } from './models';
import { CreateUserPayload } from './types';

const create = (data: CreateUserPayload) => {
  return UserModel.create(data);
};

const getByEmail = (email: string) => {
  return UserModel.findOne({ email }).exec();
};

const getById = (_id: string) => {
  return UserModel.findOne({ _id }).exec();
};

export const UserServices = { create, getByEmail, getById };
