import getHandler from "@/backend/handler";
import {
    insertHouseholdIntake,
    queryAllHouseholdIntake,
    queryByHouseholdIntakeID,
    queryHouseholdIntakeByPartnerAndProgram, updateHouseholdIntake
} from "@/backend/service/household";
import CustomError from "@/backend/error/CustomError";
import {generateID} from "@/backend/service/common";
import {queryByPartnerID, updatePartner} from "@/backend/service/partner-service";

const handler = getHandler();

// GET /api/household query all householdIntakes
// GET /api/household?partnerID=:partnerID&programID=:programID query all householdIntakes by PartnerID & programID
handler.get(async (req, res) => {

    let result;
    if (req.query && (req.query.partnerID || req.query.programID))
        result = await queryHouseholdIntakeByPartnerAndProgram(req.query.partnerID, req.query.programID);
    else
        result = await queryAllHouseholdIntake();

    return res.status(200).json(result);
});

// POST /api/household create householdIntake
handler.post(async (req, res) => {
    const {householdIntakeID} = req.body;

    let result = await queryByHouseholdIntakeID(householdIntakeID);

    if (result) {
        throw new CustomError("HouseholdIntakeID already exists", 401);
    }

    let genID = householdIntakeID;
    if (!genID)
        genID = generateID();

    const result2 = await insertHouseholdIntake({
        ...req.body, householdIntakeID:genID, createdBy:req.email
    });

    return res.status(200).json(result2);
});


// PUT /api/household update HouseholdIntake
handler.put(async (req, res) => {
    const {householdIntakeID} = req.body;

    const result = await queryByHouseholdIntakeID(householdIntakeID);
    if (result) {
        const result2 = await updateHouseholdIntake(req.body, householdIntakeID);
        return res.status(200).json({...result2});
    } else {
        throw new CustomError(`$req.query.householdIntakeID not found`, 404);
    }
});

export default handler;