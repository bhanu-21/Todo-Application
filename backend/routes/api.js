import express from 'express';
import Register from '../controllers/register.js';
import { RegisterSchema } from '../validationSchema/registerSchema.js';
import Login from '../controllers/login.js';
import { LoginSchema } from '../validationSchema/loginSchema.js';

const apiRoute = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);

export default apiRoute;