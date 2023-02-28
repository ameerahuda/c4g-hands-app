import {hashPassword, insertUser, queryUserByEmail} from "@/backend/service/user";
import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// POST /api/user/sign-up
handler.post(async (req, res) => {
    const {email, password} = req.body;

    let result = await queryUserByEmail(email);

    if (result) {
        throw new CustomError("user already exists", 401);
    }

    const saltPwd = hashPassword(password);
    result = await insertUser({
        ...req.body,
        password: saltPwd
    });

    return res.status(200).json({name: result.name, id: result.insertId});
});

export default handler;
