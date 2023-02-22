import { pool } from "database/pool";
import {queryUserByName} from "@/pages/api/user/index";

// POST /api/user/sign-in
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await sign_in(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const sign_in = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await queryUserByName(username);

        if (result && result[0].password === password) {
            return res.status(200).json({ 'username': username });
        } else {
            return res.status(400).json({ 'message': 'Bad Credential' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
