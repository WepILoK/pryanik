import {call, put, takeEvery} from "redux-saga/effects";
import {tableApi} from "../../../shared/api/endpoints/table";
import {
    deleteTableItem,
    setLoadingStatus,
    setTableItem,
    setTableList,
    setTableNewItem,
    TableActionsType
} from "./actionCreators.ts";
import {IUpdateTableItemRequest, LoadingStatus} from "./types.ts";

function* getTableList() {
    try {
        yield put(setLoadingStatus(LoadingStatus.LOADING))
        const {data} = yield call(tableApi.get)
        yield put(setTableList(data.data))
        yield put(setLoadingStatus(LoadingStatus.LOADED))
    } catch (error) {
        yield put(setLoadingStatus(LoadingStatus.ERROR))
        alert('Ощибка загрузки данных с сервера\n' + error.message)
    }
}

function* updateTable({payload}: IUpdateTableItemRequest) {
    try {
        console.log(payload)
        yield put(setLoadingStatus(LoadingStatus.LOADING))
        if (!!payload.id && !!payload.documentName) {
            const {data} = yield call(tableApi.set, payload)
            yield put(setTableItem(data.data))
        } else if (!payload.id && !!payload.documentName) {
            const {data} = yield call(tableApi.create, payload)
            yield put(setTableNewItem(data.data))
        } else if (payload.id) {
            yield call(tableApi.delete, payload.id)
            yield put(deleteTableItem(payload.id))
        }
        yield put(setLoadingStatus(LoadingStatus.LOADED))
    } catch (error) {
        yield put(setLoadingStatus(LoadingStatus.ERROR))
        alert('Ощибка загрузки данных с сервера\n' + error.message)
    }
}

export function* TableSaga() {
    yield takeEvery(TableActionsType.GET_LIST, getTableList)
    yield takeEvery(TableActionsType.UPDATE_ITEM, updateTable)
    yield takeEvery(TableActionsType.CREATE_ITEM, updateTable)
    yield takeEvery(TableActionsType.DELETE_ITEM, updateTable)
}