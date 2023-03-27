import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllHouseholdIntake = async () => {
    return await pool.query("SELECT * FROM HouseholdIntake");
};

const insertHouseholdIntake = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO HouseholdIntake SET ?", data);
};

const queryByHouseholdIntakeID = async (householdIntakeID) => {
    if (!householdIntakeID) {
        throw new CustomError('householdIntakeID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM HouseholdIntake where householdIntakeID = ?",
        [householdIntakeID]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${householdIntakeID}`, 404);
    }
};

const queryHouseholdIntakeByPartnerAndProgram = async (partnerID, programID) => {
    if (!partnerID || !programID) {
        throw new CustomError('partnerID and programID must defined', 404);
    }
    const result = await pool.query("SELECT * FROM HouseholdIntake where fk_Partner_partnerID  = ? and fk_Program_programID = ?",
        [partnerID, programID]);
    if (result && result.length > 0) {
        return result;
    } else {
        throw new CustomError(`Cannot find by ${partnerID} and ${programID}`, 404);
    }
};

const updateHouseholdIntake = async (data, householdIntakeID) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;

    data.fk_User_email = undefined;
    data.fk_Partner_partnerID = undefined;
    data.fk_Program_programID = undefined;

    delete data.fk_User_email;
    delete data.fk_Partner_partnerID;
    delete data.fk_Program_programID;

    return await pool.query("Update HouseholdIntake SET ? where householdIntakeID=?", [data, householdIntakeID]);
};


export {
    queryAllHouseholdIntake,
    queryHouseholdIntakeByPartnerAndProgram,
    insertHouseholdIntake,
    updateHouseholdIntake,
    queryByHouseholdIntakeID
}