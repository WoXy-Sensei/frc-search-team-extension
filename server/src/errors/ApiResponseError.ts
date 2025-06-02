import { BaseError } from './BaseError';

export default class ApiResponseError extends BaseError {
    private static readonly _statusCode = 404;
    private readonly _code: number;
    readonly details: any; 

    constructor(params?: { code?: number; message?: string; details?: any }) {
        const { code, message, details } = params || {};

        super(message || 'Bad request', details);
        this._code = code || ApiResponseError._statusCode;
        this.details = details;
        Object.setPrototypeOf(this, ApiResponseError.prototype);
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

    toJSON() {
        return {
            code: this.statusCode,
            message: this.message,
            details: this.details,
        };
    }
}
