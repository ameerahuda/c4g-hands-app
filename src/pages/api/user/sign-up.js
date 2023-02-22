import { pool } from "database/pool";
import {queryUserByName} from "@/pages/api/user/index";

// POST /api/user/sign-up
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await sign_up(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const sign_up = async (req, res) => {
    try {
        const { username, password } = req.body;

        let result = await queryUserByName(username);

        if (result && result.length > 0) {
            return res.status(400).json({ message: 'user already exists' });
        }

        result = await pool.query("INSERT INTO user SET ?", {
            name: username,
            password: password
        });

        return res.status(200).json({ name: result.name, id: result.insertId });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
