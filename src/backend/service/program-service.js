import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllPrograms = async () => {
    return await pool.query("SELECT * FROM Programs");
};

const insertProgram = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO Programs SET ?", data);
};

const queryByProgramID = async (programID) => {
    if (!programID) {
        throw new CustomError('partnerID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM Programs where programID = ?",
        [programID]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${programID}`, 404);
    }
};

const queryProgramByPartnerID = async (partnerID) => {
    if (!partnerID) {
        throw new CustomError('partnerID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM Programs where partnerID = ?",
        [partnerID]);
    if (result && result.length > 0) {
        return result;
    } else {
        throw new CustomError(`Cannot find by ${partnerID}`, 404);
    }
};

const updateProgram = async (data, programID) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    data.partnerID = undefined; // partnerID cannot be changed.

    delete data.createdBy;
    delete data.createdAt;
    delete data.partnerID;

    return await pool.query("Update Programs SET ? where programID=?", [data, programID]);
};


export {
    queryAllPrograms,
    queryProgramByPartnerID,
    insertProgram,
    updateProgram,
    queryByProgramID
}