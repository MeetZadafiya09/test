import dotenv from 'dotenv'

dotenv.config();

export const EMAIL_FROM = process.env.EMAIL_FROM || '';
export const EMAIL_HOST = process.env.EMAIL_HOST || '';
export const EMAIL_PORT = process.env.EMAIL_PORT || 465;
export const EMAIL_USER = process.env.EMAIL_USER  || '';
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';

