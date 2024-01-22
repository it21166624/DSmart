import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import ProjectManagerService from 'src/store/service/ProjectManagerService';
// const API_URL = '/api/data/employee/EmployeeData';

const initialState = {
  projectManagers: [],
  projectManagerSearch: '',
  error: '',
};

export const ProjectManagerSlice = createSlice({
  name: 'projectManager',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getProjectManagers: (state, action) => {
      state.projectManagers = action.payload;
    },
    SearchProjectManagers: (state, action) => {
      state.projectManagerSearch = action.payload;
    },
  },
});
export const { hasError, getProjectManagers, SearchProjectManagers } = ProjectManagerSlice.actions;

export const fetchProjectManagers = () => async (dispatch) => {
  try {
    const response = await ProjectManagerService.GetProjectManagers();
    dispatch(getProjectManagers(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};

export default ProjectManagerSlice.reducer;
