import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryUserByEmail, updateUser} from "@/backend/service/user";

const handler = getHandler();

// GET /api/user/[email]
handler.get(async (req, res) => {
    console.log('IN GET USER API', req, res)

    const result = await queryUserByEmail(req.query.email);
    if (result) {
        return res.status(200).json({...result, password: ''});
    } else {
        throw new CustomError(`$req.query.email not found`, 404);
    }
});

// PUT /api/user/[email]
handler.put(async (req, res) => {

    delete req.body.password;
    delete req.body.createdAt;
    delete req.body.createdBy;

    const result = await queryUserByEmail(req.query.email);
    if (result) {
        const result2 = await updateUser(req.body, req.query.email);
        return res.status(200).json({...result2});
    } else {
        throw new CustomError(`$req.query.email not found`, 404);
    }
});

export default handler;
