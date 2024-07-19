import {AxiosPromise} from "axios";
import instance from "../../instance.ts";
import {TableItemType} from "./model.ts";

export const tableApi = {
    _getHeaders: () => {
        const token = localStorage.getItem('token')
        return token ? {'x-auth': token} : undefined
    },
    get: (): AxiosPromise<TableItemType[]> => {
        return instance.get("/ru/data/v3/testmethods/docs/userdocs/get", {headers: tableApi._getHeaders()});
    },
    create: (newItem: TableItemType): AxiosPromise<TableItemType[]> => {
        return instance.post("/ru/data/v3/testmethods/docs/userdocs/create", newItem, {headers: tableApi._getHeaders()});
    },
    delete: (id: string): AxiosPromise<TableItemType[]> => {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {}, {headers: tableApi._getHeaders()});
    },
    set: (item: TableItemType): AxiosPromise<TableItemType[]> => {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${item.id}`, item, {headers: tableApi._getHeaders()});
    },
};