import axios from "axios";

export const GetEmployeeDetails = async () => {
    let config = {
        method: "get",
        url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/Employee/GetEmployeeDetails",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetEmployeeDetails,
};