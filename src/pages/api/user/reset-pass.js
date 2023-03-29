import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {hashPassword, queryUserByEmail, updatePassword} from "@/backend/service/user";

const handler = getHandler();

// PUT /api/user/reset-pass
handler.put(async (req, res) => {
    const {email, password} = req.body;

    if (email !== req.email) {
        throw new CustomError("email doesn't match current login user", 403);
    }

    let result = await queryUserByEmail(email);

    if (!result) {
        throw new CustomError("user not exists", 404);
    }

    const saltPwd = hashPassword(password);

    await updatePassword(saltPwd, email);

    return res.status(200).json('success');
});

export default handler;
