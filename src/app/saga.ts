import { all } from "redux-saga/effects";
import {LoginSaga} from "../pages/login/model/sagas.ts";
import {TableSaga} from "../pages/table/model/sagas.ts";

export default function* rootSaga() {
    yield all([
        LoginSaga(),
        TableSaga()
    ])
}