import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryByProgramID} from "@/backend/service/program-service";

const handler = getHandler();

// GET /api/program/[programID]
handler.get(async (req, res) => {

    const result = await queryByProgramID(req.query.programID);
    if (result) {
        return res.status(200).json({...result});
    } else {
        throw new CustomError(`$req.query.programID not found`, 404);
    }
});

export default handler;
