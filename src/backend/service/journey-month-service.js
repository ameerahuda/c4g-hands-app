import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllJourneyMonth = async () => {
    return await pool.query("SELECT * FROM JourneyByMonth");
};

const insertJourneyMonth = async (data) => {
    console.log("insertJourneyMonth")
    data.createdAt = undefined;
    delete data.createdAt;
    console.log("insertJourneyMonth")
    return await pool.query("INSERT INTO JourneyByMonth SET ?", data);
};

const queryJourneyMonthByPrimaryKey = async (journeyID, month) => {
    if (!journeyID || !month) {
        throw new CustomError('journeyID or month undefined', 404);
    }
    const result = await pool.query("SELECT * FROM JourneyByMonth " +
        "where journeyID = ? and month = ?",
        [journeyID, month]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
};

const queryJourneyMonthByJourneyID = async (journeyID) => {
    if (!journeyID) {
        throw new CustomError('journeyID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM JourneyByMonth where journeyID = ? order by month",
        [journeyID]);

    return result;
};

const updateJourneyMonth = async (data) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    delete data.createdBy;
    delete data.createdAt;

    return await pool.query("Update JourneyByMonth SET ? " +
        "where journeyID = ? and month = ?",
        [data, data.journeyID, data.month]);
};

export {
    queryAllJourneyMonth,
    insertJourneyMonth,
    updateJourneyMonth,
    queryJourneyMonthByJourneyID,
    queryJourneyMonthByPrimaryKey
}