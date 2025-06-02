import { Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';

export const errorHandler = (err: Error, req: Request, res: Response): void => {
    if (err instanceof BaseError) {
        const { statusCode, errors, details } = err;

        res.status(statusCode).send({ errors, details });
        return;
    }

    console.error(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
    return;
};
