import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {hashPassword, queryUserByName, signJWT} from "@/backend/service/user";

const handler = getHandler();

// POST /api/user/sign-in
handler.post(async (req, res) => {

    const { username, password } = req.body;
    const result = await queryUserByName(username);

    const saltPwd = hashPassword(password);
    if (result && result[0].password === saltPwd) {
        const token = signJWT(result[0].id, result[0].name, result[0].role);

        return res.status(200).json({ username, token });
    } else {
        throw new CustomError("Bad credential", 400);
    }
});

export default handler;
