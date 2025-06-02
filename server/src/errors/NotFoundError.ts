import { BaseError } from './BaseError';

export default class NotFoundError extends BaseError {
    private static readonly _statusCode = 404;
    private readonly _code: number;

    constructor(params?: { code?: number; message?: string }) {
        const { code, message } = params || {};

        super(message || 'Not found');
        this._code = code || NotFoundError._statusCode;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors() {
        return [{ message: this.message }];
    }

    get statusCode() {
        return this._code;
    }

    get logging() {
        return false;
    }
}
