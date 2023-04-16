import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";
import {queryJourneyMonthByJourneyID} from "@/backend/service/journey-month-service";


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
        const journeyDetails = result[0];

        journeyDetails.journeyByMonth = await queryJourneyMonthByJourneyID(journeyID);

        return journeyDetails;
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

const syncJourneyDetail = async (journeyID) => {
    return await pool.query("update JourneyDetails jd\n" +
        "join (\n" +
        "        select jm.journeyID journeyID,\n" +
        "               sum(jm.subsidyAmt) subsidyAmt,\n" +
        "               sum(jm.debtPaid) debtPaid,\n" +
        "               sum(jm.evictionAmt) evictionAmt,\n" +
        "               sum(jm.savedAmt) savedAmt,\n" +
        "               sum(jm.totalSpent) totalSpent\n" +
        "        from JourneyByMonth jm\n" +
        "        where jm.journeyID = ?\n" +
        "    ) as tmp\n" +
        "on tmp.journeyID = jd.journeyID\n" +
        "set jd.allowanceSpent = tmp.totalSpent,\n" +
        "  jd.totalDebtPaid = tmp.debtPaid,\n" +
        "  jd.totalEviction = tmp.evictionAmt,\n" +
        "  jd.totalSaved = tmp.savedAmt,\n" +
        "  jd.allowanceRemaining = jd.maxAllowance - tmp.totalSpent",
        [journeyID]);
};

export {
    queryAllJourneyDetails,
    insertJourneyDetail,
    updateJourneyDetail,
    queryByJourneyID,
    syncJourneyDetail
}