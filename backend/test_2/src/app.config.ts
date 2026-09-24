import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432');

export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
export const PUBLIC_KEY = process.env.PUBLIC_KEY || '';

export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const REDIS_URL = (process.env.NODE_ENV === "production" ? process.env.REDIS_URL : process.env.REDIS_URL_LOCAL) || '';
