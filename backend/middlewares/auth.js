import { JWT_TOKEN_SECRET_KEY, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    if (req.headers['auth'] === undefined) {
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"))
    }

    const token = req.headers['auth'];

    try {
        const decoded = Jwt.verify(token, JWT_TOKEN_SECRET_KEY);
        console.log("decoded", decoded);

        req.userId = decoded.userId;
        return next();
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token"));
    }
}

export default AuthMiddleware;