import {pool} from "@/backend/pool";
import getConfig from 'next/config';
import saltedMd5 from "salted-md5";
import {sign, verify} from "jsonwebtoken";
import CustomError from "@/backend/error/CustomError";

const { serverRuntimeConfig } = getConfig();

const insertUser = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;

    const user = await pool.query("INSERT INTO User SET ?", data);
    return user;
};

const updateUser = async (data, email) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    data.user_type = undefined;
    data.password = undefined;
    data.partnerID = undefined;
    data.needResetPwd = undefined;
    delete data.createdBy;
    delete data.createdBy;
    delete data.user_type;
    delete data.password;
    delete data.partnerID;
    delete data.needResetPwd;

    const user = await pool.query("Update User SET ? where email=?", [data, email]);
    return user;
};

const updatePassword = async (password, email, needResetPwd) => {
    const user = await pool.query("Update User SET password=?, needResetPwd=? where email=?", [password, needResetPwd, email]);
    return user;
};

const queryUserByEmail = async (name) => {
    const user = await pool.query("SELECT * FROM User where email = ?",
        [name]);
    return user && user.length > 0 ? user[0] : undefined;
};

const queryUsers = async () => {
    const users = await pool.query("SELECT * FROM User");
    return users;
};

const hashPassword = (password) => {
    if (!password) {
        throw new CustomError('password undefined', 400);
    }
    return saltedMd5(password, serverRuntimeConfig.API_SALT, false);
};

const signJWT = (email, first_name, last_name, user_type, partner_id) => {
    return sign({email, first_name, last_name, user_type, partner_id},
        serverRuntimeConfig.API_SECRET,
        { expiresIn: '8h' });
};

const decodeJWT = (token) => {
    let jwt = token;
    if(jwt.startsWith('Bearer'))
        jwt = jwt.slice(7);

    let result = {};

    verify(jwt, serverRuntimeConfig.API_SECRET, (error, decoded) => {

        if (error) {
            console.error(error)
            throw new CustomError(error, 401)
        }

        result = {...decoded}
    });

    return result;
};

export {
    hashPassword,
    signJWT,
    decodeJWT,
    insertUser,
    updateUser,
    updatePassword,
    queryUserByEmail,
    queryUsers
}