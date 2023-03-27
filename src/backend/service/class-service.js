import {pool} from "@/backend/pool";
import CustomError from "@/backend/error/CustomError";


const queryAllClasses = async () => {
    return await pool.query("SELECT * FROM Classes");
};

const insertClass = async (data) => {
    data.createdAt = undefined;
    delete data.createdAt;
    return await pool.query("INSERT INTO Classes SET ?", data);
};

const queryByClassName = async (className) => {
    if (!className) {
        throw new CustomError('className undefined', 404);
    }
    const result = await pool.query("SELECT * FROM Classes where className = ?",
        [className]);
    if (result && result.length > 0) {
        return result[0];
    } else {
        throw new CustomError(`Cannot find by ${className}`, 404);
    }
};

const updateClass = async (data, className) => {
    // {...data, createdBy:'', createdAt:''}
    data.createdAt = undefined;
    data.createdBy = undefined;
    delete data.createdBy;
    delete data.createdAt;

    return await pool.query("Update Classes SET ? where className=?", [data, className]);
};

export {
    queryAllClasses,
    insertClass,
    updateClass,
    queryByClassName
}