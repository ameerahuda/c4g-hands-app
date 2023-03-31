import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllJourneyDetails = async () => {
    return await pool.query("SELECT * FROM JourneyDetails");
};

const insertJourneyDetail = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO JourneyDetails SET ?", data);
};

const queryByJourneyID = async (journeyID) => {
    if (!journeyID) {
        throw new CustomError('journeyID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM JourneyDetails where journeyID = ?",
        [journeyID]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${journeyID}`, 404);
    }
};

const updateJourneyDetail = async (data, journeyID) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    delete data.createdBy;
    delete data.createdAt;

    return await pool.query("Update JourneyDetails SET ? where journeyID=?", [data, journeyID]);
};

export {
    queryAllJourneyDetails,
    insertJourneyDetail,
    updateJourneyDetail,
    queryByJourneyID
}