import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {hashPassword, insertUser, queryUserByEmail, updateUser} from "@/backend/service/user";
import {queryByPartnerID} from "@/backend/service/partner-service";

const handler = getHandler();

const userTypeList = ["UnitedWay Staff", "Partner Staff", "Household"];

handler.get(async (req, res) => {
    console.log(req.email)
    console.log(req.user_type)
    throw new CustomError('Not Supported', 400);
});


// POST /api/user create user
handler.post(async (req, res) => {
    const {email, password, user_type, partnerID} = req.body;

    let result = await queryUserByEmail(email);

    if (result) {
        throw new CustomError("user already exists", 400);
    }

    const userCreationIndex = userTypeList.indexOf(user_type);
    if (userTypeList.indexOf(user_type) === -1) {
        throw new CustomError(`user_type[${user_type}] is not in the list of ${userTypeList}`, 400);
    }

    const userLoginIndex = userTypeList.indexOf(req.user_type);
    if (userLoginIndex !== -1 && userLoginIndex < 2 && userLoginIndex <= userCreationIndex) {
        console.log(`User ${req.email} ${req.user_type} is creating user ${email} ${user_type}`)
    } else {
        throw new CustomError(`User email[${req.email}] user_type[${req.user_type}] cannot create user ${email} ${user_type}`, 403);
    }

    if (userCreationIndex === 1 && !partnerID) {
        throw new CustomError(`user_type[${user_type}] must be assigned with a Partner by partnerID`, 400);
    } else if (userCreationIndex !== 1 && partnerID) {
        throw new CustomError(`user_type[${user_type}] cannot assign with a Partner`, 400);
    }

    if (partnerID) {
        await queryByPartnerID(partnerID);
    }

    const saltPwd = hashPassword(password);
    await insertUser({
        ...req.body,
        needResetPwd: 'T',
        password: saltPwd
    });
    result = await queryUserByEmail(email);

    return res.status(200).json({...result, password: null});
});


// PUT /api/user update user
handler.put(async (req, res) => {
    const {email, user_type} = req.body;

    let result = await queryUserByEmail(email);

    if (!result) {
        throw new CustomError("user not exists", 404);
    }

    const userCreationIndex = userTypeList.indexOf(user_type);
    const userLoginIndex = userTypeList.indexOf(req.user_type);
    if (userLoginIndex !== -1 && userLoginIndex <= userCreationIndex) {
        console.log(`User ${req.email} ${req.user_type} is updating user ${email} ${user_type}`)
    } else {
        throw new CustomError(`User ${req.email} ${req.user_type} cannot update user ${email} ${user_type}`, 403);
    }

    await updateUser(req.body, email);

    result = await queryUserByEmail(email);

    return res.status(200).json({...result, password: null});
});


export default handler;
