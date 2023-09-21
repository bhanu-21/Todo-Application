import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";
import todos from "../models/todos.js";

export const markTodo = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo Id is required", error.mapped()));
    }

    try {
        const todo = await todos.findOneAndUpdate({
            _id: req.body.todo_id,
            userId: req.userId
        }, [{
            $set: {
                isCompleted: {
                    $eq: [false, "$isCompleted"]
                }
            }
        }]);

        if (todo) {
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Updated", todo));
        }
    } catch (error) {
        res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update", null));
    }
}