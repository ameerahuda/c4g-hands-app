import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {hashPassword, queryUserByEmail, signJWT} from "@/backend/service/user";

const handler = getHandler();

// POST /api/user/sign-in
handler.post(async (req, res) => {

    const {email, password} = req.body;
    const result = await queryUserByEmail(email);

    const saltPwd = hashPassword(password);
    if (result && (result.password === saltPwd || result.password === password)) {
        const token = signJWT(result.email, result.first_name, result.last_name, result.user_type);

        return res.status(200).json({email, token});
    } else {
        throw new CustomError("Bad credential", 400);
    }
});

export default handler;
