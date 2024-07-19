import {Draft, produce} from "immer";
import {ILoginActions, ILoginState} from "./types.ts";
import {LoginActionsType} from "./actionCreators.ts";

const initialState: ILoginState = {
    token: localStorage.getItem("token")
}

export const loginReducer = produce((draft: Draft<ILoginState>, action: ILoginActions) => {
    switch (action.type) {
        case LoginActionsType.SET_TOKEN:
            localStorage.setItem('token', action.payload)
            draft.token = action.payload
            break;
        default:
            break;
    }
}, initialState)