import {Action} from "redux";
import {LoginActionsType} from "./actionCreators.ts";
import {LoginRequestType} from "../../../shared/api/endpoints/login";

export interface ILoginState {
    token: string | null
}

export interface IAuthUser extends Action<LoginActionsType> {
    type: LoginActionsType.AUTH
    payload: LoginRequestType
}

export interface ISetToken extends Action<LoginActionsType> {
    type: LoginActionsType.SET_TOKEN
    payload: string
}

export type ILoginActions =
    IAuthUser |
    ISetToken