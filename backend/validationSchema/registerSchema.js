import { check } from "express-validator";

export const RegisterSchema = [
    check('username', 'Username should be atleast 6 characters').exists().isAlphanumeric().withMessage('Username is required').trim().isLength({ min: 6, max: 32 }),

    check('password', 'password should be atleast 6 characters').exists().isAlphanumeric().withMessage('Password is required').trim().isLength({ min: 6, max: 100 }),

    check('email', 'please enter a valid email').exists().isEmail().withMessage('email is required').trim(),

    check('name', 'Name should be atleast 6 characters').exists().withMessage('Name is required').trim().isLength({ min: 6, max: 32 }),
]