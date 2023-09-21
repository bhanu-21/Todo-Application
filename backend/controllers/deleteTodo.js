import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import todos from "../models/todos.js";
import user from "../models/user.js";

export const deleteTodo = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo id is required", error.mapped()));
    }

    try {
        const result = await todos.findOneAndDelete({
            userId: req.userId,
            _id: req.body.todo_id
        })

        if (result) {
            const users = await user.findOneAndUpdate({
                _id: req.userId,
            }, {
                $pull: { todos: req.body.todo_id }
            })

            return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", null))
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not deleted", null))
    }
}