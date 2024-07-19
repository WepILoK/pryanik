import {
    ICreateTableItemRequest, IDeleteTableItem,
    IDeleteTableItemRequest,
    IGetTableListRequest, ISetLoadingStatus,
    ISetTableItem,
    ISetTableList, ISetTableNewItem,
    IUpdateTableItemRequest, LoadingStatus
} from "./types.ts";
import {TableItemType} from "../../../shared/api/endpoints/table";

export enum TableActionsType {
    GET_LIST = "TABLE/GET_LIST",
    SET_LIST = "TABLE/SET_LIST",
    UPDATE_ITEM = "TABLE/UPDATE_ITEM",
    CREATE_ITEM = "TABLE/CREATE_ITEM",
    DELETE_ITEM = "TABLE/DELETE_ITEM",
    SET_TABLE_ITEM = "TABLE/SET_TABLE_ITEM",
    SET_TABLE_NEW_ITEM = "TABLE/SET_TABLE_NEW_ITEM",
    DELETE_TABLE_ITEM = "TABLE/DELETE_TABLE_ITEM",
    SET_LOADING_STATUS = "TABLE/SET_LOADING_STATUS"
}

export const getTableListRequest = (): IGetTableListRequest => ({
    type: TableActionsType.GET_LIST
})

export const setTableList = (payload): ISetTableList => ({
    type: TableActionsType.SET_LIST,
    payload
})

export const updateTableItemRequest = (payload: TableItemType): IUpdateTableItemRequest => ({
    type: TableActionsType.UPDATE_ITEM,
    payload
})

export const createTableItemRequest = (payload: TableItemType): ICreateTableItemRequest => ({
    type: TableActionsType.CREATE_ITEM,
    payload
})

export const deleteTableItemRequest = (payload: {id: string}): IDeleteTableItemRequest => ({
    type: TableActionsType.DELETE_ITEM,
    payload
})

export const deleteTableItem = (payload: string): IDeleteTableItem => ({
    type: TableActionsType.DELETE_TABLE_ITEM,
    payload
})

export const setTableItem = (payload: TableItemType): ISetTableItem => ({
    type: TableActionsType.SET_TABLE_ITEM,
    payload
})

export const setTableNewItem = (payload: TableItemType): ISetTableNewItem => ({
    type: TableActionsType.SET_TABLE_NEW_ITEM,
    payload
})

export const setLoadingStatus = (payload: LoadingStatus): ISetLoadingStatus => ({
    type: TableActionsType.SET_LOADING_STATUS,
    payload
})