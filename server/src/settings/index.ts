import { time } from '../utils';

export const corsConfig = {
    optionsSuccessStatus: 200,
};

export const rateLimiterConfig = {
    windowMs: time.minToMilliseconds(30),
    max: 1000,
};
