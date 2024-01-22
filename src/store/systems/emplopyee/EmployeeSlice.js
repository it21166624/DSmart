import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import EmployeeService from 'src/store/service/EmployeeService';
// const API_URL = '/api/data/employee/EmployeeData';

const initialState = {
  employees: [],
  employeeSearch: '',
  employeeSave: '',
  error: '',
};

export const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getEmployees: (state, action) => {
      state.employees = action.payload;
    },
    SearchEmployee: (state, action) => {
      state.employeeSearch = action.payload;
    },
    saveEmployee: (state, action) => {
      state.employeeSave = action.payload;
    },
  },
});
export const { hasError, getEmployees, SearchEmployee } = EmployeeSlice.actions;

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

export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await EmployeeService.GetEmployeeDetails();
    dispatch(getEmployees(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default EmployeeSlice.reducer;
