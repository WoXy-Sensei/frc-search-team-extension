import { BaseError } from './BaseError';

export default class BadRequestError extends BaseError {
    private static readonly _statusCode = 400;
    private readonly _code: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: { code?: number; message?: string; logging?: boolean; context?: { [key: string]: any } }) {
        const { code, message, logging } = params || {};

        super(message || 'Bad request');
        this._code = code || BadRequestError._statusCode;
        this._logging = logging || false;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }

    get logging() {
        return this._logging;
    }
}
