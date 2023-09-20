import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import user from "../models/user.js";

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

            return res.json(jsonGenerate(StatusCode.SUCCESS, "Registration Successfull", result));
        } catch (error) {
            console.log("................", error);
        }
    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
}

export default Register;