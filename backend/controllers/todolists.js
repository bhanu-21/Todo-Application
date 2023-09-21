import User from "../models/user.js"
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const getTodos = async (req, res) => {
    try {
        const list = await User.findById(req.userId).select("-password").populate('todos').exec();

        return res.json(jsonGenerate(StatusCode.SUCCESS, "All todo lists", list));
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error));
    }
}