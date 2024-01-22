import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import EcommerceReducer from './systems/warehouse/EcommerceSlice';
import EmployeeReducer from './systems/emplopyee/EmployeeSlice';
import SupplierReducer from './systems/supplier/SupplierSlice';
import AuthReducer from './auth/AuthSlice';
import ProjectReducer from './systems/projectManagement/ProjectSlice';
import MaterialCatalogueReducer from './systems/materialCatalogue/MaterialCatalogueSlice';
import MaterialDetailsReducer from './systems/materialCatalogue/MaterialDetailsSlice'
import ProjectManagerReducer from './systems/projectManagement/ProjectManagerSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,
    employeeReducer: EmployeeReducer,
    supplierReducer: SupplierReducer,
    projectReducer: ProjectReducer,
    materialCatalogueReducer: MaterialCatalogueReducer,
    materialDetailsReducer: MaterialDetailsReducer,
    projectManagerReducer: ProjectManagerReducer,
    
    
    auth: AuthReducer,
  },
});

export default store;
