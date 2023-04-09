import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllPartners = async () => {
    return await pool.query("SELECT * FROM Partner");
};

const insertPartner = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO Partner SET ?", data);
};

const queryByPartnerID = async (partnerID) => {
    if (!partnerID) {
        throw new CustomError('partnerID undefined', 404);
    }
    const result = await pool.query("SELECT * FROM Partner where partnerID = ?",
        [partnerID]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${partnerID}`, 404);
    }
};

const updatePartner = async (data, partnerID) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    delete data.createdBy;
    delete data.createdAt;

    return await pool.query("Update Partner SET ? where partnerID=?", [data, partnerID]);
};

const queryStaffView = async () => {
    return await pool.query("WITH tmp AS (\n" +
        "    Select fk_Partner_partnerID,\n" +
        "           sureImpactStatus,\n" +
        "           count(*) countHousehold\n" +
        "    from HouseholdIntake hh\n" +
        "    group by fk_Partner_partnerID, sureImpactStatus\n" +
        ")\n" +
        "Select partner.partnerName,\n" +
        "       partner.partnerAddress,\n" +
        "       partner.partnerBudget,\n" +
        "       COUNT(HouseholdIntake.householdIntakeID)              as numOfHouseholds,\n" +
        "       SUM(programs.programBudget)                           as moneySpent,\n" +
        "       (partner.partnerBudget - SUM(programs.programBudget)) as moneyRemaining,\n" +
        "       (select countHousehold from tmp where tmp.fk_Partner_partnerID = partner.partnerID and tmp.sureImpactStatus='Completed') as householdsCompleted,\n" +
        "       (select countHousehold from tmp where tmp.fk_Partner_partnerID = partner.partnerID and tmp.sureImpactStatus='Dropped') as householdsDropped,\n" +
        "       (select countHousehold from tmp where tmp.fk_Partner_partnerID = partner.partnerID and tmp.sureImpactStatus='In Progress') as householdsInProgres\n" +
        "   FROM Partner partner\n" +
        "   LEFT JOIN HouseholdIntake ON partner.partnerID = HouseholdIntake.fk_Partner_partnerID\n" +
        "   LEFT JOIN Programs programs ON HouseholdIntake.fk_Program_programID = programs.programID\n" +
        "GROUP BY partner.partnerID");
};

export {
    queryAllPartners,
    insertPartner,
    updatePartner,
    queryByPartnerID,
    queryStaffView
}