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
import { fetchMaterials } from 'src/store/systems/materialCatalogue/MaterialCatalogueSlice';
import { fetchMaterialDetails } from 'src/store/systems/materialCatalogue/MaterialDetailsSlice';

const roles = ['Active', 'Inactive'];

function generateGetMaterials(materials, searchMaterial) {
  return materials
    .filter((material) =>
      Object.values(material).join(' ').toLowerCase().includes(searchMaterial.toLowerCase()),
    )
    .map((material) => ({
      id: material.Material_code,
      category: material.Category,
      'material code': material.Material_code,
      'material description': material.Description,
      'material specification': material.Material_spec,
      uom: material.Unit,
      status: material.Status,
    }));
}

function EditToolbar(props) {
  const {
    handleMaterialSearch,
    searchMaterial,
    handleAddClick,
    handleSaveAllClick,
    showAddButton,
    showSaveAllButton,
    showSearchButton,
  } = props;

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
      {showSearchButton && (
        <div>
          <TextField
            autoFocus
            placeholder="Search Material..."
            value={searchMaterial}
            onChange={handleMaterialSearch}
            style={{ width: '250px', marginBottom: -6 }}
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
      )}
      {showAddButton && (
        <div style={{ marginLeft: 'auto' }}>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
            Add Material
          </Button>
        </div>
      )}
      {showSaveAllButton && (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveAllClick}
            sx={{
              height: '33px',
              marginRight: '1px',
            }}
          >
            Save All
          </Button>
        </div>
      )}
    </GridToolbarContainer>
  );
}

export default function ComMaterial() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const { materials } = useSelector((state) => state.materialCatalogueReducer);
  const dispatch = useDispatch();
  const [searchMaterial, setSearchMaterial] = useState('');
  const [rows, setRows] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    // setSelectionModel(newSelectionModel);
    console.log(newSelectionModel);
  };

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  useEffect(() => {
    const getMaterials = generateGetMaterials(materials, searchMaterial);
    setRows(getMaterials);
  }, [materials, searchMaterial]);

  const handleMaterialSearch = (event) => {
    setSearchMaterial(event.target.value);
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

  const handleMaterialEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleMaterialDeleteClick = (id) => () => {
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

  const handleRowClick = (params) => {
    const materialCode = params.row['material code'];
    dispatch(fetchMaterialDetails(materialCode));
  };

  const columns = [
    {
      field: 'category',
      headerName: 'CATEGORY',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'material code',
      headerName: 'MATERIAL CODE',
      type: 'string',
      width: 240,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'material description',
      headerName: 'MATERIAL DESCRIPTION',
      type: 'string',
      width: 290,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'material specification',
      headerName: 'MATERIAL SPECIFICATION',
      width: 280,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'uom',
      headerName: 'UOM',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      type: 'string',
      headerClassName: 'table-header',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 172,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      type: 'singleSelect',
      headerClassName: 'table-header',
      valueOptions: ['Active', 'Inactive'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACTION',
      width: 168,
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
            onClick={handleMaterialEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleMaterialDeleteClick(id)}
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
    <Box>
      <div style={{ height: 640, width: '100%' }}>
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
          <Paper variant="outlined" sx={{ padding: '16px', height: '80%' }}>
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
              onRowClick={handleRowClick}
              initialState={{
                pagination: { paginationModel: { pageSize: 6 } },
              }}
              pageSizeOptions={[6, 25, 50, 100]}
              slots={{
                toolbar: (props) => (
                  <EditToolbar
                    {...props}
                    showAddButton={true}
                    showSaveAllButton={true}
                    showSearchButton={true}
                  />
                ),
              }}
              slotProps={{
                toolbar: {
                  setRows,
                  setRowModesModel,
                  handleMaterialSearch,
                  searchMaterial,
                  handleAddClick,
                },
              }}
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #F7F2F2',
                },
              }}
            />
          </Paper>
        </Box>
      </div>
      <div style={{ marginBottom: -110 }}></div>

      <SECT />
    </Box>
  );
}

function SECT() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const { materialDetails } = useSelector((state) => state.materialDetailsReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    // setSelectionModel(newSelectionModel);
    console.log(newSelectionModel);
  };

  function generateGetMaterialDetails(materialDetails) {
    return materialDetails
      .filter((materialDetail) =>
        Object.values(materialDetail).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((materialDetail) => ({
        id: materialDetail.MatCode,
        warehouse: materialDetail.WHname,
        binLocation: materialDetail.BinLocation,
        reOrderQuantity: materialDetail.ReorderLevel,
        balanceQuantity: materialDetail.BalanceVal,
        avgRate: materialDetail.AvgPrice,
        balanceValue: materialDetail.BalanceVal,
      }));
  }

  // useEffect(() => {
  //   dispatch(fetchMaterialDetails());
  // }, [dispatch]);

  useEffect(() => {
    const getMaterialDetails = generateGetMaterialDetails(materialDetails, searchTerm);
    setRows(getMaterialDetails);
  }, [materialDetails, searchTerm]);

  const handleMaterialDetailsSearch = (event) => {
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

  const handleMaterialDetailsEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleMaterialDetailsDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
      field: 'warehouse',
      headerName: 'WAREHOUSE',
      width: 210,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'binLocation',
      headerName: 'BIN LOCATION',
      width: 210,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'reOrderQuantity',
      headerName: 'RE_ORDER QUANTITY',
      width: 260,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'balanceQuantity',
      headerName: 'BALANCE QUANTITY',
      width: 210,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'avgRate',
      headerName: 'AVG RATE',
      width: 210,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'balanceValue',
      headerName: 'BALANCE VALUE',
      width: 210,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACTION',
      width: 210,
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
            onClick={handleMaterialDetailsEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleMaterialDetailsDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  columns.forEach((column) => {
    column.headerClassName = 'table-header';
  });

  return (
    <Box>
      <div style={{ height: 640, width: '100%' }}>
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
          <Paper variant="outlined" sx={{ padding: '16px', height: '55%' }}>
            <div style={{ marginBottom: '-25px' }}>
              <div>
                <TextField
                  placeholder="Search Material Details..."
                  value={searchTerm}
                  onChange={handleMaterialDetailsSearch}
                  style={{ width: '250px', marginBottom: 15, marginTop: 5 }}
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
            </div>
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
                pagination: { paginationModel: { pageSize: 4 } },
              }}
              pageSizeOptions={[4, 25, 50, 100]}
              localeText={{
                noRowsLabel: '!  There is no data to display  !',
              }}
              slots={{
                toolbar: (props) => (
                  <EditToolbar
                    {...props}
                    showAddButton={false}
                    showSaveAllButton={false}
                    showSearchButton={false}
                  />
                ),
              }}
              slotProps={{
                toolbar: {
                  setRows,
                  setRowModesModel,
                  handleMaterialDetailsSearch,
                  searchTerm,
                  handleAddClick,
                },
              }}
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #F7F2F2',
                },
              }}
            />
          </Paper>
        </Box>
      </div>
    </Box>
  );
}
