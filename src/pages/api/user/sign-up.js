import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// POST /api/user/sign-up
handler.post(async (req, res) => {
    throw new CustomError('Not Supported', 400);
});

export default handler;
