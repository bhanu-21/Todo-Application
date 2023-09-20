import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET_KEY, StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import user from "../models/user.js";
import Jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { username, password, email, name } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userExist = await user.findOne({
            $or: [{
                email: email
            }, {
                username: username
            }]
        })

        if (userExist) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User/Email already exists"))
        }

        // Save to db
        try {
            const result = await user.create({
                username: username,
                password: hashPassword,
                email: email,
                name: name,
            })

            const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET_KEY);

            return res.json(jsonGenerate(StatusCode.SUCCESS, "Registration Successfull", { userId: result._id, token: token }));
        } catch (error) {
            console.log("................", error);
        }
    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
}

export default Register;