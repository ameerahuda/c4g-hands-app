import getHandler from "@/backend/handler";
import {queryStaffView} from "@/backend/service/partner-service";
import CustomError from "@/backend/error/CustomError";

const handler = getHandler();

// POST /api/staff/general
handler.get(async (req, res) => {

    const result = await queryStaffView();
    if (result) {
        result.forEach(obj => {
            obj.householdsCompleted = obj.householdsCompleted ? obj.householdsCompleted : 0
            obj.householdsDropped = obj.householdsDropped ? obj.householdsDropped : 0
            obj.householdsInProgres = obj.householdsInProgres ? obj.householdsInProgres : 0
        })
        return res.status(200).json(result);
    } else {
        throw new CustomError(`Not found`, 404);
    }
    //
    // // mock the response for now
    // const data = [
    //     {
    //         partner_id: "ABC001",
    //         partner_name: "Bright House Partners",
    //         partner_address: "123, main Street, Any Town, USA",
    //         partner_budget: 10000,
    //         partner_numOfHouseholds: 10,
    //         partner_moneySpent: 1500,
    //         partner_moneyRemaining: 8500,
    //         partner_householdsCompleted: 12,
    //         partner_householdsDropped: 3,
    //         partner_householdsInProgres: 26
    //     },
    //     {
    //         partner_id: "XYZ001",
    //         partner_name: "Sunshine Community Friends",
    //         partner_address: "456, 2nd Street, Any Town, USA",
    //         partner_budget: 30000,
    //         partner_numOfHouseholds: 16,
    //         partner_moneySpent: 8500,
    //         partner_moneyRemaining: 21500,
    //         partner_householdsCompleted: 99,
    //         partner_householdsDropped: 16,
    //         partner_householdsInProgres: 26
    //     }
    // ];

    // return res.status(200).json(data);
});

export default handler;






