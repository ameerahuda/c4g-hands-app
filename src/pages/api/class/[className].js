import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryByClassName} from "@/backend/service/class-service";

const handler = getHandler();

// GET /api/partner/[className]
handler.get(async (req, res) => {

    const result = await queryByClassName(req.query.className);
    if (result) {
        return res.status(200).json({...result});
    } else {
        throw new CustomError(`$req.query.className not found`, 404);
    }
});

export default handler;
