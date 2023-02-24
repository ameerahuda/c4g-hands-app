import { verify } from 'jsonwebtoken';
import nextConnect from 'next-connect';
import CustomError from "@/backend/error/CustomError";
import {decodeJWT} from "@/backend/service/user";

export default function getHandler() {
    return nextConnect({
        attachParams: true,
        onError(err, req, res) {
            let error = { ...err };
            error.statusCode = err.statusCode || 500;
            error.message = err.message;
            res.status(error.statusCode).json(error);
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        },
    }).use((req, res, next) => {
        req.userId = null;
        req.username = null;
        req.role = null;

        // authrorization code should start with Bearer
        const { authorization } = req.headers;

        if (!authorization) {
            if (req.url.includes('/api/user/sign-in') ||
                req.url.includes('/api/user/sign-up')) {
                next();
            } else {
                throw new CustomError("Missing authorization token", 403)
            }
        } else {
            const decoded = decodeJWT(authorization);

            if (decoded) {
                req.userId = decoded.userId;
                req.username = decoded.username;
                req.role = decoded.role;

                next();
            } else {
                throw new CustomError("Invalid token", 401)
            }
        }
    })};
