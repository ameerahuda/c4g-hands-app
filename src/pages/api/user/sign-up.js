import { pool } from "@/backend/pool";
import {queryUserByName} from "@/backend/service/user";
import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// POST /api/user/sign-up
handler.post(async (req, res) => {
    const { username, password } = req.body;

    let result = await queryUserByName(username);

    if (result && result.length > 0) {
        throw new CustomError("user already exists", 401);
    }

    result = await pool.query("INSERT INTO user SET ?", {
        name: username,
        password: password
    });

    return res.status(200).json({ name: result.name, id: result.insertId });
});

export default handler;
