import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";

export default getHandler().get(async (req, res) => {
    // console.log(req.userId)
    throw new CustomError('Notfound', 404);
});
