export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const MONGO_URI = process.env.MONGO_URI ?? '';
export const SALT_ROUNDS = +(process.env.SALT_ROUNDS ?? 0);
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
