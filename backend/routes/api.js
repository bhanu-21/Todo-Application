import express from 'express';
import Register from '../controllers/register.js';
import { RegisterSchema } from '../validationSchema/registerSchema.js';

const apiRoute = express.Router();

apiRoute.post('/register', RegisterSchema, Register);

export default apiRoute;