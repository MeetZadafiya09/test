import { PRIVATE_KEY } from '../app.config.js';
import { importPKCS8, SignJWT } from 'jose';

const privateKey = await importPKCS8(PRIVATE_KEY as string, 'ES256');

export const generateToken = async (data: any) => {
    const token = await new SignJWT(data)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(privateKey);
    return token;
}