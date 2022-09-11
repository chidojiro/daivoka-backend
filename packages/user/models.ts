import mongoose from 'mongoose';
import { User } from './types';

const userSchema = new mongoose.Schema({
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
});

export const UserModel = mongoose.model<User>('user', userSchema);
