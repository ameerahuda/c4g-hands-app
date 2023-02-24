import {pool} from "@/backend/pool";
import getConfig from 'next/config';
import saltedMd5 from "salted-md5";
import {sign, verify} from "jsonwebtoken";
import CustomError from "@/backend/error/CustomError";

const { serverRuntimeConfig } = getConfig();

const insertUser = async (data) => {
    const user = await pool.query("INSERT INTO user SET ?", data);
    return user;
};

const queryUserByName = async (name) => {
    const user = await pool.query("SELECT * FROM user where name = ?",
        [name]);
    return user;
};

const queryUsers = async () => {
    const users = await pool.query("SELECT * FROM user");
    return users;
};

const hashPassword = (password) => {
    return saltedMd5(password, serverRuntimeConfig.API_SALT, false);
};

const signJWT = (userId, username, role) => {
    return sign({userId, username, role},
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
    queryUserByName,
    queryUsers
}