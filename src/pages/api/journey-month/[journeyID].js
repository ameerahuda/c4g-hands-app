import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryJourneyMonthByJourneyID} from "@/backend/service/journey-month-service";

const handler = getHandler();

// GET /api/journey-month/[journeyID]
handler.get(async (req, res) => {

    const result = await queryJourneyMonthByJourneyID(req.query.journeyID);
    if (result) {
        return res.status(200).json(result);
    } else {
        throw new CustomError(`${req.query.journeyID} not found`, 404);
    }
});

export default handler;
