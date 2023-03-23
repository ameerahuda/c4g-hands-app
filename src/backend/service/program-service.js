import {pool} from "@/backend/pool";


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
        return undefined;
    }
    const result = await pool.query("SELECT * FROM Programs where programID = ?",
        [programID]);
    return result && result.length > 0 ? result[0] : undefined;
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
    insertProgram,
    updateProgram,
    queryByProgramID
}