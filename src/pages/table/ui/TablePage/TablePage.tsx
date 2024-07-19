import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridSlots,
} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {TableWrapper} from "./TablePage.styles.ts";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTableDataState, selectTableStatusState} from "../../model/selectors.ts";
import {LoadingStatus} from "../../model/types.ts";
import {deleteTableItemRequest, getTableListRequest} from "../../model/actionCreators.ts";
import {EditToolbar} from "../EditToolbar/EditToolbar.tsx";

export const TablePage = () => {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const dispatch = useDispatch()
    const loadingStatus = useSelector(selectTableStatusState)
    const data = useSelector(selectTableDataState)
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        dispatch(deleteTableItemRequest({id: id as string}))
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row: any[]) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
        },
        {
            field: 'companySigDate',
            headerName: '',
            editable: true,
            // type: "date",
            valueFormatter: (value) => {
              console.log(value)
            },
            width: 130,
        },
        {
            field: 'companySignatureName',
            headerName: '',
            editable: true,
            width: 130,
        },
        {
            field: 'documentName',
            headerName: '',
            editable: true,
            width: 130,
        },
        {
            field: 'documentStatus',
            headerName: '',
            editable: true,
            width: 130,
        },
        {
            field: 'documentType',
            headerName: '',
            editable: true,
            width: 130,
        },
        {
            field: 'employeeNumber',
            headerName: '',
            editable: true,
            width: 90,
        },
        {
            field: 'employeeSigDate',
            headerName: '',
            editable: true,
            width: 130,
            // type: "date",
        },
        {
            field: 'employeeSignatureName',
            headerName: '',
            editable: true,
            width: 130,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Управление',
            width: 160,
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

    useEffect(() => {
        dispatch(getTableListRequest())
    }, []);

    return (
        <TableWrapper>
            <DataGrid
                rows={data}
                columns={columns}
                loading={loadingStatus === LoadingStatus.LOADING}
                hideFooter
                showCellRightBorder
                showColumnRightBorder
                disableSelectionOnClick
                disableColumnMenu
                disableColumnFilter
                disableColumnSorting
                disableColumnResize
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 20},
                    },
                }}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </TableWrapper>

    )
}