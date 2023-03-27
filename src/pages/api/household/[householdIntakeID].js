import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryByHouseholdIntakeID} from "@/backend/service/household";

const handler = getHandler();

// GET /api/household/[householdIntakeID]
handler.get(async (req, res) => {

    const result = await queryByHouseholdIntakeID(req.query.householdIntakeID);
    if (result) {
        return res.status(200).json({...result});
    } else {
        throw new CustomError(`$req.query.householdIntakeID not found`, 404);
    }
});

export default handler;
