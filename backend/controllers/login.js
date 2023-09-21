import { validationResult } from "express-validator";
import user from "../models/user.js";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET_KEY, StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const Login = async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { username, password } = req.body;
        const users = await user.findOne({ username: username });

        if (!users) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or Password is incorrect"));
        }

        const verified = bcrypt.compareSync(password, users.password);

        if (!verified) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or Password is incorrect"));
        }

        const token = Jwt.sign({ userId: users._id }, JWT_TOKEN_SECRET_KEY);
        return res.json(jsonGenerate(StatusCode.SUCCESS, "Login Successfull", { userId: users._id, token: token }))
    }

    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
}

export default Login;