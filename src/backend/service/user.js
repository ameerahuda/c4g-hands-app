import {pool} from "@/backend/pool";

const queryUserByName = async (name) => {
    const user = await pool.query("SELECT * FROM user where name = ?",
        [name]);
    return user;
};

const queryUsers = async () => {
    const users = await pool.query("SELECT * FROM user");
    return users;
};

export {
    queryUserByName,
    queryUsers
}