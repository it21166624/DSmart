import axios from "axios";

const GetMaterials = async () => {
    let config = {
        method: "get",
        url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetMaterials",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetMaterials,
};