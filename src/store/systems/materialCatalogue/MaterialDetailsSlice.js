import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import MaterialDetailsService from 'src/store/service/MaterialDetailsService';

const initialState = {
  materialDetails: [],
  materialDetailsSave: '',
  materialDetailsSearch: '',
  error: '',
};

export const MaterialDetailsSlice = createSlice({
  name: 'materialDetails',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMaterialDetails: (state, action) => {
      state.materialDetails = action.payload;
    },
    SearchMaterialDetails: (state, action) => {
      state.materialDetailsSearch = action.payload;
    },
    saveMaterialDetails: (state, action) => {
      state.materialDetailsSave = action.payload;
    },
  },
});
export const { hasError, getMaterialDetails, SearchMaterialDetails } = MaterialDetailsSlice.actions;

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

export const fetchMaterialDetails = (matCode) => async (dispatch) => {
  try {
    const response = await MaterialDetailsService.GetMaterialDetails(matCode);
    dispatch(getMaterialDetails(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default MaterialDetailsSlice.reducer;
