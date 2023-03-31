import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {generateID} from "@/backend/service/common";
import {insertJourneyDetail, queryAllJourneyDetails, queryByJourneyID, updateJourneyDetail} from "@/backend/service/journey-service";

const handler = getHandler();

// GET /api/journey query all journeys
handler.get(async (req, res) => {
    const allPartners = await queryAllJourneyDetails();
    return res.status(200).json(allPartners);
});


// POST /api/journey create journey
handler.post(async (req, res) => {
    const {journeyID} = req.body;

    let genID = journeyID;
    if (!genID) {
        genID = generateID();
    } else {
        const result = await queryByJourneyID(journeyID);
        if (result) {
            throw new CustomError("JourneyID already exists", 401);
        }
    }

    await insertJourneyDetail({
        ...req.body, journeyID:genID, createdBy:req.email
    });

    return res.status(200).json(await queryByJourneyID(genID));
});


// PUT /api/journey update journey
handler.put(async (req, res) => {
    const {journeyID} = req.body;

    const result = await queryByJourneyID(journeyID);
    if (result) {
        await updateJourneyDetail(req.body, journeyID);
        return res.status(200).json(await queryByJourneyID(journeyID));
    } else {
        throw new CustomError(`${req.query.journeyID} not found`, 404);
    }
});


export default handler;