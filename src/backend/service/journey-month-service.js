import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllJourneyMonth = async () => {
    return await pool.query("SELECT * FROM JourneyByMonth");
};

const insertJourneyMonth = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO JourneyByMonth SET ?", data);
};

const queryByJourneyMonthID = async (journeyByMonthID) => {
    if (!journeyByMonthID) {
        throw new CustomError('journeyID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM JourneyByMonth where journeyByMonthID = ?",
        [journeyByMonthID]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${journeyByMonthID}`, 404);
    }
};

const queryJourneyMonthByJourneyID = async (journeyID) => {
    if (!journeyID) {
        throw new CustomError('journeyID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM JourneyByMonth where fk_JourneyDetails_journeyID = ?",
        [journeyID]);

    return result;
};

const updateJourneyMonth = async (data, journeyByMonthID) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    delete data.createdBy;
    delete data.createdAt;

    return await pool.query("Update JourneyByMonth SET ? where journeyByMonthID=?", [data, journeyByMonthID]);
};

export {
    queryAllJourneyMonth,
    insertJourneyMonth,
    updateJourneyMonth,
    queryJourneyMonthByJourneyID,
    queryByJourneyMonthID
}