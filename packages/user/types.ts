export type User = {
  _id: string;
  email: string;
  password: string;
};

export type CreateUserPayload = Omit<User, '_id'>;
