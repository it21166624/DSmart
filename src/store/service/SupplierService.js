import axios from "axios";

const     GetSupplierDetails = async () => {
    let config = {
        method: "get",
        url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/GetSupplierDetails",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetSupplierDetails,
};