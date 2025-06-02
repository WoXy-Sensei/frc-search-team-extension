import axios, { AxiosError } from 'axios';

const instance = axios.create({
    baseURL: 'https://api.statbotics.io/v3',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default instance;

export { AxiosError };
