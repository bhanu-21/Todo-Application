import axios from 'axios';
import { LOGIN } from './apiConstants';

export const login = async (data) => {
    return axios.post(LOGIN, data);
}