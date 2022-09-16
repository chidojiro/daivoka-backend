import { MongooseError } from 'mongoose';

export const isDuplicateError = (e: unknown) => (e as MongooseError).message.startsWith('E11000');
