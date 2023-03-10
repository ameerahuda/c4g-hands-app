import getHandler from "@/backend/handler";
import {insertPartner, queryAllPartners, queryByPartnerID, updatePartner} from "@/backend/service/partner-service";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// GET /api/partner query all partners
handler.get(async (req, res) => {
    const allPartners = await queryAllPartners();
    return res.status(200).json(allPartners);
});


// POST /api/partner create partner
handler.post(async (req, res) => {
    const {partnerID} = req.body;

    let result = await queryByPartnerID(partnerID);

    if (result) {
        throw new CustomError("PartnerID already exists", 401);
    }

    result = await insertPartner({
        ...req.body, createdBy:req.email
    });

    return res.status(200).json(result);
});


// PUT /api/partner update partner
handler.put(async (req, res) => {
    const {partnerID} = req.body;

    const result = await queryByPartnerID(partnerID);
    if (result) {
        const result2 = await updatePartner(req.body, partnerID);
        return res.status(200).json({...result2});
    } else {
        throw new CustomError(`$req.query.partnerID not found`, 404);
    }
});


export default handler;