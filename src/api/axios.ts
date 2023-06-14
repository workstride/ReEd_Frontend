import axios from "axios";

const BASE_URL = 'http://52.79.171.108:8080';

export default axios.create({
    baseURL:BASE_URL,
    withCredentials : true
});

export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});

