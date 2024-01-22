import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import MaterialCatalogueService from 'src/store/service/MaterialCatalogueService';

const initialState = {
  materials: [],
  materialSave: '',
  employeeSearch: '',
  error: '',
};

export const MaterialCatalogueSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMaterials: (state, action) => {
      state.materials = action.payload;
    },
    SearchMaterial: (state, action) => {
      state.materialSearch = action.payload;
    },
    saveMaterial: (state, action) => {
      state.materialSave = action.payload;
    },
  },
});
export const { hasError, getMaterials, SearchEmployee } = MaterialCatalogueSlice.actions;

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

export const fetchMaterials = () => async (dispatch) => {
  try {
    const response = await MaterialCatalogueService.GetMaterials();
    dispatch(getMaterials(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default MaterialCatalogueSlice.reducer;
