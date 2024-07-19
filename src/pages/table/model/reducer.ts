import {Draft, produce} from "immer";
import {ILoginActions, ITableState, LoadingStatus} from "./types.ts";
import {TableActionsType} from "./actionCreators.ts";

const initialState: ITableState = {
    data: [],
    loading: LoadingStatus.LOADED
}

export const tableReducer = produce((draft: Draft<ITableState>, action: ILoginActions) => {
    switch (action.type) {
        case TableActionsType.SET_LIST:
            draft.data = action.payload
            break;
        case TableActionsType.SET_LOADING_STATUS:
            draft.loading = action.payload
            break;
        case TableActionsType.SET_TABLE_ITEM:
            draft.data.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
            break;
        case TableActionsType.SET_TABLE_NEW_ITEM:
            draft.data = [...draft.data, action.payload]
            break;
        case TableActionsType.DELETE_TABLE_ITEM:
            draft.data = draft.data.filter(item => item.id !== action.payload)
            break;
        default:
            break;
    }
}, initialState)