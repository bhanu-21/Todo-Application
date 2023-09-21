import express from 'express';
import Register from '../controllers/register.js';
import { RegisterSchema } from '../validationSchema/registerSchema.js';
import Login from '../controllers/login.js';
import { LoginSchema } from '../validationSchema/loginSchema.js';
import { createTodo } from '../controllers/todo.js';
import { check } from 'express-validator';
import { getTodos } from '../controllers/todolists.js';

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);

// protected routes
apiProtected.post("/createTodo", [check("desc", "Todo description is required").exists()], createTodo);
apiProtected.get("/todolists", getTodos);

export default apiRoute;