import jwt from 'jsonwebtoken';

import { TCompany } from '@/lib/types/Company';
import { AuthError, ParsingError } from '@/lib/errors';

export const signToken = <T>(payload: T): string => {
    if (!globalThis.process.env.JWT_SEED) throw new ParsingError('No hay seed de JWT', 400);

    return jwt.sign(payload as Buffer,
        globalThis.process.env.JWT_SEED, {
        expiresIn: 3600 * 24,
        noTimestamp: true,
    });
};

export const decodeToken = async (token: string): Promise<Pick<TCompany, 'id' | 'email' | 'name'>> => {
    if (!process.env.JWT_SEED) throw new ParsingError('No hay seed de JWT', 400);

    return new Promise((resolve, reject) => {
        jwt.verify(token, globalThis.process.env.JWT_SEED!, (err, payload) => {
            if (err) {
                console.log(err)
                return reject(new AuthError('Ocurrió un error iniciando sesión', 403))
            };

            return resolve(payload as Pick<TCompany, 'id' | 'email' | 'name'> & { exp: number });
        });
    });
};
