import axios, { AxiosError } from 'axios';

const instance = axios.create({
    baseURL: 'https://www.thebluealliance.com/api/v3',
    headers: {
        'X-TBA-Auth-Key': process.env.TBA_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default instance;

export { AxiosError };
