import {call, put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, setToken} from "./actionCreators.ts";
import {loginApi} from "../../../shared/api/endpoints/login";
import {IAuthUser} from "./types.ts";

function* loginUser({payload}: IAuthUser) {
    try {
        const {data} = yield call(loginApi.auth, payload)
        const token = data.data?.token
        if (!token) {
            throw new Error('Доступ запрещен');
        }
        yield put(setToken(token))
        window.localStorage.setItem('token', data.data.token)
    } catch (error) {
        alert('Ощибка загрузки данных с сервера\n' + error.message)
    }
}

export function* LoginSaga() {
    yield takeEvery(LoginActionsType.AUTH, loginUser)
}