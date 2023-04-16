import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {insertJourneyMonth, queryAllJourneyMonth, queryJourneyMonthByPrimaryKey, updateJourneyMonth} from "@/backend/service/journey-month-service";
import {syncJourneyDetail} from "@/backend/service/journey-service";

const handler = getHandler();

// GET /api/journey-month query all journey-months
handler.get(async (req, res) => {
    const result = await queryAllJourneyMonth();
    return res.status(200).json(result);
});


// POST /api/journey-month create journey-month
handler.post(async (req, res) => {
    const {journeyID, month} = req.body;

    const result = await queryJourneyMonthByPrimaryKey(journeyID, month);
    if (result) {
        throw new CustomError("JourneyID and month already exists", 400);
    }

    const insertResult = await insertJourneyMonth({
        ...req.body, createdBy:req.email
    });

    if (insertResult.affectedRows > 0)
        await syncJourneyDetail(journeyID);

    return res.status(200).json(await queryJourneyMonthByPrimaryKey(journeyID, month));
});


// PUT /api/journey-month update journey-month
handler.put(async (req, res) => {
    const {journeyID, month} = req.body;

    const result = await queryJourneyMonthByPrimaryKey(journeyID, month);
    if (result) {
        const updateResult = await updateJourneyMonth(req.body);

        if (updateResult.affectedRows > 0)
            await syncJourneyDetail(journeyID);

        return res.status(200).json(await queryJourneyMonthByPrimaryKey(journeyID, month));
    } else {
        throw new CustomError(`${req.query.journeyID} and ${req.query.month} not found`, 404);
    }
});


export default handler;