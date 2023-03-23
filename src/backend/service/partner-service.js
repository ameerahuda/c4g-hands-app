import {pool} from "@/backend/pool";


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
        return undefined;
    }
    const result = await pool.query("SELECT * FROM Partner where partnerID = ?",
        [partnerID]);
    return result && result.length > 0 ? result[0] : undefined;
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
    return await pool.query("Select partner.partnerName,\n" +
        "       partner.partnerAddress,\n" +
        "       partner.partnerBudget,\n" +
        "       count(HouseholdIntake.fk_User_email)                  as numOfHouseholds,\n" +
        "       SUM(programs.programBudget)                           as moneySpent,\n" +
        "       (partner.partnerBudget - SUM(programs.programBudget)) as moneyRemaining,\n" +
        "       0                                                     as householdsCompleted,\n" +
        "       0                                                     as householdsDropped,\n" +
        "       0                                                     as householdsInProgres\n" +
        "FROM Programs programs,\n" +
        "     Partner partner,\n" +
        "     HouseholdIntake\n" +
        "WHERE programs.partnerID = partner.partnerID\n" +
        "  AND HouseholdIntake.fk_Partner_partnerID = partner.partnerID");
};

export {
    queryAllPartners,
    insertPartner,
    updatePartner,
    queryByPartnerID,
    queryStaffView
}