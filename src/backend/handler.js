import { verify } from 'jsonwebtoken';
import nextConnect from 'next-connect';
import CustomError from "@/backend/error/CustomError";

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
            verify(authorization.slice(7), 'secret', (error, decoded) => {

                if (error) {
                    console.error(error)
                    throw new CustomError(error, 401)
                }

                if (decoded) {
                    req.username = decoded.username;
                }

                next();
            });
        }
    })};
