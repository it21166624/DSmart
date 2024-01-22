import {
  Add as AddIcon,
  Close as CancelIcon,
  DeleteOutlined as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Box, Button, InputAdornment, Paper, TextField } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from 'src/store/systems/projectManagement/ProjectSlice';
import { fetchProjectManagers } from 'src/store/systems/projectManagement/ProjectManagerSlice';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';


function generateInitialRows(projects, searchTerm) {
  return projects
    .filter((project) =>
      Object.values(project).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((project) => ({
      id: project.ProID,
      category: project.ProCat,
      'project id': project.ProID,
      'project name': project.ProName,
      'project specification': project.ProSpec,
      'project manager': project.ProManager,
      'start date': project.ProSDate,
      'end date': project.ProEDate,
      status: project.ProSatus,
    }));
}

function EditToolbar(props) {
  const { handleSearchChange, searchTerm, handleAddClick, handleSaveAllClick } = props;

  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      <div>
        <TextField
          placeholder="Search Project..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '220px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& input': {
              padding: '7px',
            },
          }}
        />
      </div>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSaveAllClick}
          sx={{
            height: '33px',
            marginRight: '16px',
          }}
        >
          Refresh
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

export default function ComProject() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const { projects } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});

  const [testdata, setTestdata] = useState(null);

  const { projectManagers } = useSelector((state) => state.projectManagerReducer);

  const renderProjectManagerEditInputCell = (params) => {
    // Transform the projectManagers data for the Autocomplete options
    const options = projectManagers.map(pm => ({
      label: `${pm.ServiceNo} - ${pm.Name}`,
      value: pm.ServiceNo + '-' + pm.Name,
    }));
    return (
      <Autocomplete
        size={"small"}
        value={options.find(option => option.value === params.value) || null}
        onChange={(event, newValue) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue ? newValue.value : null
          }, event);
        }}
        options={options}
        getOptionLabel={(option) => option ? option.label : ''}
        renderInput={(params) => <TextField {...params} />}
        sx={{ width: '100%', border: 'none' }}
        InputProps={{ style: { fontSize: `10 !important` } }}
      />
    );
  };


  function generateGetProjectManagers(projectManagers) {
    return projectManagers.map((projectManager) => ({
      id: projectManager.ServiceNo,
      ServiceNo: projectManager.ServiceNo,
      Name: projectManager.Name,
    }));
  }

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    console.log(newSelectionModel);
  };

  const handleDateChange = (newDate) => {
    setTestdata(newDate);
  };

  useEffect(() => {
    console.log('Project Managers State:', projectManagers);
    dispatch(fetchProjects(testdata));
    dispatch(fetchProjectManagers());
  }, [dispatch]);

  useEffect(() => {
    const initialRows = generateInitialRows(projects, searchTerm);
    setRows(initialRows);
  }, [projects, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    const id = Math.random().toString();
    const newRow = { id, name: '', age: '', isNew: true };
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'category',
      headerName: 'CATEGORY',
      width: 130,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'project id',
      headerName: 'PROJECT ID',
      type: 'string',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'project name',
      headerName: 'PROJECT NAME',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'project specification',
      headerName: 'PROJECT SPECIFICATION',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'project manager',
      headerName: 'PROJECT MANAGER',
      width: 210,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
      renderEditCell: renderProjectManagerEditInputCell,
    },
    {
      field: 'start date',
      headerName: 'START DATE',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'date',
      valueFormatter: (params) => {
        if (params.value === null || params.value === undefined || params.value === '') {
          return '';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(params.value).toLocaleDateString('en-US', options);
      },
      headerClassName: 'table-header',
    },
    {
      field: 'end date',
      headerName: 'END DATE',
      width: 170,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'date',
      valueFormatter: (params) => {
        if (params.value === null || params.value === undefined || params.value === '') {
          return '';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(params.value).toLocaleDateString('en-US', options);
      },
      headerClassName: 'table-header',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'singleSelect',
      headerClassName: 'table-header',
      valueOptions: ['ACTIVE', 'INACTIVE'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACTION',
      width: 100,
      cellClassName: 'actions',
      headerClassName: 'table-header',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditCellChange = useCallback(
    ({ id, field, props }) => {
      setEditRowsModel((oldModel) => ({
        ...oldModel,
        [id]: { ...oldModel[id], [field]: props.value },
      }));
    },
    [],
  );

  return (
    <div style={{ height: 650, width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={testdata}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .table-header': {
            backgroundColor: '#ECECEC',
          },
        }}
      >
        <Paper elevation={3} sx={{ padding: '16px', height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            editRowsModel={editRowsModel}
            onEditCellChange={handleEditCellChange}
            rowModesModel={rowModesModel}
            onSelectionModelChange={handleSelectionModelChange}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: { paginationModel: { pageSize: 9 } },
            }}
            pageSizeOptions={[9, 25, 50, 100]}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: {
                setRows,
                setRowModesModel,
                handleSearchChange,
                searchTerm,
                handleAddClick,
              },
            }}
          />
        </Paper>
      </Box>
    </div>
  );
}
