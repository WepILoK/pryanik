import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga.ts";
import {loginReducer} from "../pages/login/model/reducer.ts";
import {tableReducer} from "../pages/table/model/reducer.ts";

const sagaMiddleware = createSagaMiddleware()

export const rootReducer = combineReducers({
    login: loginReducer,
    table: tableReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store