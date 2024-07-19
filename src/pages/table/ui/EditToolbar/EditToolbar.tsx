import {GridRowModes, GridRowModesModel, GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {setTableNewItem} from "../../model/actionCreators.ts";
import {useDispatch} from "react-redux";

interface EditToolbarProps {
    setIsCreateItem: (value: (((prevState: boolean) => boolean) | boolean)) => void
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}


export const EditToolbar = (props: EditToolbarProps) => {
    const { setRowModesModel, setIsCreateItem, isCreateItem } = props;
    const dispatch = useDispatch()

    const handleClick = () => {
        const id = new Date().toString()
        dispatch(setTableNewItem({
            id: id,
            companySigDate: "",
            companySignatureName: "",
            documentName: "",
            documentStatus: "",
            documentType: "",
            employeeNumber: "",
            employeeSigDate: "",
            employeeSignatureName: "",
            isNew: true
        }))
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
        setIsCreateItem(true)
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} disabled={isCreateItem} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}