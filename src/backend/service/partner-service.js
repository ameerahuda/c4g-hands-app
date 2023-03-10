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

export {
    queryAllPartners,
    insertPartner,
    updatePartner,
    queryByPartnerID
}