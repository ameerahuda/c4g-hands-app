import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {queryByPartnerID, updatePartner} from "@/backend/service/partner-service";

const handler = getHandler();

// GET /api/partner/[partnerID]
handler.get(async (req, res) => {

    const result = await queryByPartnerID(req.query.partnerID);
    if (result) {
        return res.status(200).json({...result});
    } else {
        throw new CustomError(`$req.query.email not found`, 404);
    }
});

export default handler;
