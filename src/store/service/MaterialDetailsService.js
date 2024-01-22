import axios from "axios";

const GetMaterialDetails = async (matCode) => {
    
    let config = {
        method: "get",
        // url: `https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetMatInfo?Mcode=MED00003`,
        url: `https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetMatInfo?Mcode=${matCode}`,
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetMaterialDetails,
};