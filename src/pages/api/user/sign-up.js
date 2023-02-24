import {hashPassword, insertUser, queryUserByName} from "@/backend/service/user";
import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// POST /api/user/sign-up
handler.post(async (req, res) => {
    const {username, password, role} = req.body;

    let result = await queryUserByName(username);

    if (result && result.length > 0) {
        throw new CustomError("user already exists", 401);
    }

    const saltPwd = hashPassword(password);
    result = await insertUser({
        name: username,
        password: saltPwd,
        role: role
    });

    return res.status(200).json({name: result.name, id: result.insertId});
});

export default handler;
