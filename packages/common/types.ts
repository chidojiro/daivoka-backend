import { Types } from 'mongoose';

export type WithoutId<T> = Omit<T, '_id'>;

export type Id = Types.ObjectId | string;
