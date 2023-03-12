import nextConnect from 'next-connect';
import CustomError from "@/backend/error/CustomError";
import {decodeJWT} from "@/backend/service/user";

// https://www.npmjs.com/package/next-connect
export default function getHandler() {
    return nextConnect({
        attachParams: true,
        onError(err, req, res) {
            console.error(err);
            let error = { ...err };
            error.statusCode = err.statusCode || 500;
            error.message = err.message;
            res.status(error.statusCode).json(error);
            res.end();
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} Not Allowed` });
            res.end();
        },
    }).use((req, res, next) => {
        req.email = null;
        req.first_name = null;
        req.last_name = null;
        req.user_type = null;

        // authorization code should start with Bearer
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
                // email, first_name, last_name, user_type
                req.email = decoded.email;
                req.first_name = decoded.first_name;
                req.last_name = decoded.last_name;
                req.user_type = decoded.user_type;

                next();
            } else {
                throw new CustomError("Invalid token", 401)
            }
        }
    })};
