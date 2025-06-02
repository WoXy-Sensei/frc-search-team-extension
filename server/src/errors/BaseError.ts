export type BaseErrorContent = {
    message: string;
    context?: { [key: string]: any };
};

export abstract class BaseError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: BaseErrorContent[];
    abstract readonly logging: boolean;
    readonly details?: any;

    constructor(message: string, details?: any) {
        super(message);
        this.details = details;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}