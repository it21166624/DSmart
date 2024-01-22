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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from 'src/store/systems/emplopyee/EmployeeSlice';

const roles = ['Active', 'Inactive'];

function generateInitialRows(employees, searchTerm) {
  return employees
    .filter((employee) =>
      Object.values(employee).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((employee) => ({
      id: employee.ServiceNo,
      'service no': employee.ServiceNo,
      'first name': employee.FirstName,
      'last name': employee.LastName,
      'mobile no': employee.MobileNo,
      email: employee.Email,
      nic: employee.NIC,
      status: employee.Status,
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
          placeholder="Search Employee..."
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
      <div style={{ marginLeft: 'auto' }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
          Add Employee
        </Button>
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
          Save All
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

export default function ComEmployee() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const { employees } = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    // setSelectionModel(newSelectionModel);
    console.log(newSelectionModel);
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    const initialRows = generateInitialRows(employees, searchTerm);
    setRows(initialRows);
  }, [employees, searchTerm]);

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
      field: 'service no',
      headerName: 'SERVICE NO',
      width: 210,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'first name',
      headerName: 'FIRST NAME',
      type: 'string',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'last name',
      headerName: 'LAST NAME',
      type: 'string',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'mobile no',
      headerName: 'MOBILE NO',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      width: 210,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'nic',
      headerName: 'NIC',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'singleSelect',
      headerClassName: 'table-header',
      valueOptions: ['Active', 'Inactive'],
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

  columns.forEach((column) => {
    // column.headerClassName = 'custom-header';
  });

  return (
    <div style={{ height: 650, width: '100%' }}>
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
            selectionModel={selectionModel}
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
