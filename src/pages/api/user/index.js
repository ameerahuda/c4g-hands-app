import { pool } from "database/pool";

export default async function handler(req, res) {
    return res.status(400).send("Method not allowed");
}

const queryUserByName = async (name) => {
    console.log("queryUserByName " + name)
    const user = await pool.query("SELECT * FROM user where name = ?",
        [name]);
    return user;
};

export {queryUserByName}