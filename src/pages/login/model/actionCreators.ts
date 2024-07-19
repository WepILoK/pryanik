import {IAuthUser, ISetToken} from "./types.ts";
import {LoginRequestType} from "../../../shared/api/endpoints/login";

export enum LoginActionsType {
    AUTH = "LOGIN/AUTH",
    SET_TOKEN = "LOGIN/SET_TOKEN"
}

export const authUser = (payload: LoginRequestType): IAuthUser => ({
    type: LoginActionsType.AUTH,
    payload
})

export const setToken = (payload: string): ISetToken => ({
    type: LoginActionsType.SET_TOKEN,
    payload
})