import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import todos from "../models/todos.js";
import user from "../models/user.js";

export const createTodo = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo is required", error.mapped()))
    }

    try {
        const result = await todos.create({
            userId: req.userId,
            desc: req.body.desc
        })

        if (result) {
            const users = await user.findOneAndUpdate({ _id: req.userId },
                {
                    $push: { todos: result }
                });
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result))
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Something went wrong", error))
    }
}