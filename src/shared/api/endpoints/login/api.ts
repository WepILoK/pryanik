import {LoginRequestType} from "./model.ts";
import {AxiosPromise} from "axios";
import instance from "../../instance.ts";

export const loginApi = {
    auth: (params: LoginRequestType): AxiosPromise<void> => {
        return instance.post("/ru/data/v3/testmethods/docs/login",params);
    }
};