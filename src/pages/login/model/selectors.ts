import {ILoginState} from "./types.ts";

export const selectTokenState = (state: RootState): ILoginState["token"] => state.login.token