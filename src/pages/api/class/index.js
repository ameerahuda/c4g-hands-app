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

    let result = await queryByClassName(className);

    if (result) {
        throw new CustomError("className already exists", 401);
    }

    result = await insertClass({
        ...req.body, createdBy:req.email
    });

    return res.status(200).json(result);
});


// PUT /api/class update class
handler.put(async (req, res) => {
    const {className} = req.body;

    let result = await queryByClassName(className);

    if (result) {
        const result2 = await updateClass(req.body, className);
        return res.status(200).json({...result2});
    } else {
        throw new CustomError(`ClassName $className not found`, 404);
    }
});


export default handler;