import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {generateID} from "@/backend/service/common";
import {insertProgram, queryAllPrograms, queryByProgramID, updateProgram} from "@/backend/service/program-service";

const handler = getHandler();

// GET /api/program query all programs
handler.get(async (req, res) => {
    const allPrograms = await queryAllPrograms();
    return res.status(200).json(allPrograms);
});


// POST /api/program create program
handler.post(async (req, res) => {
    const {programID} = req.body;

    let result = await queryByProgramID(programID);

    if (result) {
        throw new CustomError("ProgramID already exists", 401);
    }

    let genID = programID;
    if (!genID)
        genID = generateID();
    result = await insertProgram({
        ...req.body, programID:genID, createdBy:req.email
    });

    return res.status(200).json(result);
});


// PUT /api/program update program
handler.put(async (req, res) => {
    const {programID} = req.body;

    const result = await queryByProgramID(programID);
    if (result) {
        const result2 = await updateProgram(req.body, programID);
        return res.status(200).json({...result2});
    } else {
        throw new CustomError(`$req.query.programID not found`, 404);
    }
});


export default handler;