import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import SupplierService from 'src/store/service/SupplierService';

const initialState = {
  suppliers: [],
  supplierSearch: '',
  supplierSave: '',
  error: '',
};

export const SupplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
    SearchSupplier: (state, action) => {
      state.supplierSearch = action.payload;
    },
    saveSupplier: (state, action) => {
      state.supplierSave = action.payload;
    },
  },
});
export const { hasError, getSuppliers, SearchSupplier } = SupplierSlice.actions;

// export const fetchEmployees = () => async (dispatch) => {
//   try {
//     return await EmployeeService.GetEmployeeDetails().then(
//       (response) => {
//         dispatch(getEmployees(response.data.resultSet));
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response && error.data && error.data.message) || error.message || error.toString();
//         return Promise.reject();
//       },
//     );
//   } catch (error) {
//     dispatch(hasError(error));
//   }
// };

export const fetchSuppliers = () => async (dispatch) => {
  try {
    const response = await SupplierService.GetSupplierDetails();
    dispatch(getSuppliers(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default SupplierSlice.reducer;
