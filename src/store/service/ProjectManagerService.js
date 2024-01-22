import axios from "axios";

const GetProjectManagers = async () => {
    let config = {
        method: "get",
        url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/GetProjectManagers",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetProjectManagers,
};