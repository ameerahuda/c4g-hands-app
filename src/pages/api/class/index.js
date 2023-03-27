import getHandler from "@/backend/handler";
import CustomError from "@/backend/error/CustomError";
import {insertClass, queryAllClasses, queryByClassName, updateClass} from "@/backend/service/class-service";

const handler = getHandler();

// GET /api/class query all classes
handler.get(async (req, res) => {
    const allClasses = await queryAllClasses();
    return res.status(200).json(allClasses);
});


// POST /api/class create class
handler.post(async (req, res) => {
    const {className} = req.body;

    await insertClass({
        ...req.body, createdBy:req.email
    });

    return res.status(200).json(await queryByClassName(className));
});


// PUT /api/class update class
handler.put(async (req, res) => {
    const {className} = req.body;

    const result = await queryByClassName(className);

    if (result) {
        await updateClass(req.body, className);
        return res.status(200).json(await queryByClassName(className));
    } else {
        throw new CustomError(`ClassName $className not found`, 404);
    }
});


export default handler;