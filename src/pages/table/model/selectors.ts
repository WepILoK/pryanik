import {ITableState} from "./types.ts";

export const selectTableDataState = (state: RootState): ITableState["data"] => state.table.data

export const selectTableStatusState = (state: RootState): ITableState["loading"] => state.table.loading
