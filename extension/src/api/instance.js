import axios, { AxiosError } from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default instance;

export { AxiosError };
