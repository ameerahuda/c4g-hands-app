import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {generateID} from "@/backend/service/common";
import {insertProgram, queryAllPrograms, queryByProgramID, queryProgramByPartnerID, updateProgram} from "@/backend/service/program-service";

const handler = getHandler();

// GET /api/program query all programs
// GET /api/program?partnerID=:partnerID query all programs by PartnerID
handler.get(async (req, res) => {

    let allPrograms;
    if (req.query && req.query.partnerID)
        allPrograms = await queryProgramByPartnerID(req.query.partnerID);
    else
        allPrograms = await queryAllPrograms();

    return res.status(200).json(allPrograms);
});

// POST /api/program create program
handler.post(async (req, res) => {
    const {programID} = req.body;
    const partner_id = req.partner_id;

    if (!req.body.partnerID && partner_id) {
        req.body.partnerID = partner_id;
    }

    if (!req.body.partnerID) {
        throw new CustomError("PartnerID not provided", 400);
    }

    let genID = programID;
    if (!genID)
        genID = generateID();
    else {
        const result = await queryByProgramID(programID);

        if (result) {
            throw new CustomError("ProgramID already exists", 400);
        }
    }

    await insertProgram({
        ...req.body, programID:genID, createdBy:req.email
    });

    return res.status(200).json(await queryByProgramID(genID));
});


// PUT /api/program update program
handler.put(async (req, res) => {
    const {programID} = req.body;

    const result = await queryByProgramID(programID);
    if (result) {
        await updateProgram(req.body, programID);
        return res.status(200).json(await queryByProgramID(programID));
    } else {
        throw new CustomError(`${req.query.programID} not found`, 404);
    }
});


export default handler;