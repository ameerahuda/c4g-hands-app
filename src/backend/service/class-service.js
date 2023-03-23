import {pool} from "@/backend/pool";


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
        return undefined;
    }
    const result = await pool.query("SELECT * FROM Classes where className = ?",
        [className]);
    return result && result.length > 0 ? result[0] : undefined;
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