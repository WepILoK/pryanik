import {Action} from "redux";
import {TableActionsType} from "./actionCreators.ts";
import {TableItemType} from "../../../shared/api/endpoints/table";

export interface ITableState {
    data: TableItemType[]
    loading: LoadingStatus
}

export enum LoadingStatus {
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR",
}

export interface IGetTableListRequest extends Action<TableActionsType> {
    type: TableActionsType.GET_LIST
}

export interface ISetTableList extends Action<TableActionsType> {
    type: TableActionsType.SET_LIST
    payload: TableItemType[]
}

export interface IUpdateTableItemRequest extends Action<TableActionsType> {
    type: TableActionsType.UPDATE_ITEM
    payload: TableItemType
}

export interface ICreateTableItemRequest extends Action<TableActionsType> {
    type: TableActionsType.CREATE_ITEM
    payload: TableItemType
}

export interface IDeleteTableItemRequest extends Action<TableActionsType> {
    type: TableActionsType.DELETE_ITEM
    payload: {id: string}
}

export interface ISetTableItem extends Action<TableActionsType> {
    type: TableActionsType.SET_TABLE_ITEM
    payload: TableItemType
}

export interface ISetTableNewItem extends Action<TableActionsType> {
    type: TableActionsType.SET_TABLE_NEW_ITEM
    payload: TableItemType
}

export interface IDeleteTableItem extends Action<TableActionsType> {
    type: TableActionsType.DELETE_TABLE_ITEM
    payload: string
}

export interface ISetLoadingStatus extends Action<TableActionsType> {
    type: TableActionsType.SET_LOADING_STATUS
    payload: LoadingStatus
}

export type ILoginActions =
    IGetTableListRequest |
    ISetTableList |
    IUpdateTableItemRequest |
    ICreateTableItemRequest |
    IDeleteTableItemRequest |
    ISetLoadingStatus |
    ISetTableItem |
    IDeleteTableItem |
    ISetTableNewItem