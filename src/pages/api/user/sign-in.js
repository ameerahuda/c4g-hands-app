import { sign } from 'jsonwebtoken';
import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryUserByName} from "@/backend/service/user";

const handler = getHandler();

// POST /api/user/sign-in
handler.post(async (req, res) => {

    const { username, password } = req.body;
    const result = await queryUserByName(username);

    console.log(result)
    if (result && result[0].password === password) {
        const token = sign({username},
            'secret',
            { expiresIn: '8h' });

        return res.status(200).json({ username, token });
    } else {
        throw new CustomError("Bad credential", 400);
    }
});

export default handler;
