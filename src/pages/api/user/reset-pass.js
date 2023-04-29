import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {hashPassword, queryUserByEmail, updatePassword} from "@/backend/service/user";

const handler = getHandler();

const userTypeList = ["UnitedWay Staff", "Partner Staff", "Household"];

// PUT /api/user/reset-pass
handler.put(async (req, res) => {
    const {email, password} = req.body;

    let modifyUser = await queryUserByEmail(email);

    if (!modifyUser) {
        throw new CustomError(`user ${email} not exists`, 404);
    }

    const loginUserIdx = userTypeList.indexOf(req.user_type);
    const modifyUserIdx = userTypeList.indexOf(modifyUser.user_type);

    if (loginUserIdx > modifyUserIdx) {
        throw new CustomError(`User email[${req.user_type}] cannot reset password for user ${email} ${modifyUser.user_type}`, 403);
    } else if (loginUserIdx === modifyUserIdx) {
        if (loginUserIdx === 0 || email === req.email) {
            console.log(`User ${req.email} ${req.user_type} is resetting user ${email} password`);
        } else {
            throw new CustomError(`User email[${req.user_type}] cannot reset password for user ${email} ${modifyUser.user_type}`, 403);
        }
    }

    let needResetPwd = 'T';
    if (email === req.email) {
        needResetPwd = 'F';
    }

    const saltPwd = hashPassword(password);

    await updatePassword(saltPwd, email, needResetPwd);

    return res.status(200).json('success');
});

export default handler;
