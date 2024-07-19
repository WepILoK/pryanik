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
import {createTableItemRequest, deleteTableItemRequest, getTableListRequest} from "../../model/actionCreators.ts";
import {EditToolbar} from "../EditToolbar/EditToolbar.tsx";
import {TableItemType} from "../../../../shared/api/endpoints/table";

export const TablePage = () => {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const dispatch = useDispatch()
    const loadingStatus = useSelector(selectTableStatusState)
    const data = useSelector(selectTableDataState)
    const [isCreateItem, setIsCreateItem] = useState(false)
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        dispatch(deleteTableItemRequest({id: id as string}))
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });
    };

    const processRowUpdate = (newRow: GridRowModel<TableItemType>) => {
        if (newRow.isNew) {
            if (newRow.documentName && newRow.documentStatus) {
                dispatch(createTableItemRequest(newRow))
                return {...newRow, isNew: false};
            }
            setIsCreateItem(false)
        } else {
            dispatch(createTableItemRequest(newRow))
            return {...newRow, isNew: false};
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: 'companySigDate',
            headerName: '',
            editable: true,
            type: "date",
            width: 100,
            valueFormatter: (value) => {
                if (!value) return value
                return Intl.DateTimeFormat('ru-RU').format(new Date(value))
            },
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
            width: 190,
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
            width: 100,
            type: "date",
            valueFormatter: (value) => {
                if (!value) return value
                return Intl.DateTimeFormat('ru-RU').format(new Date(value))
            },
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
            width: 140,
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
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
                    toolbar: {isCreateItem, setIsCreateItem, setRowModesModel},
                }}
            />
        </TableWrapper>

    )
}

