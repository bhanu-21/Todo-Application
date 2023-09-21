import axios from 'axios';
import { LOGIN, REGISTER } from './apiConstants';

export const login = async (data) => {
    return axios.post(LOGIN, data);
}

export const register = async (data) => {
    return axios.post(REGISTER, data);
}