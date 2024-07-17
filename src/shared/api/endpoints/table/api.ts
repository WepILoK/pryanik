import {AxiosPromise} from "axios";
import instance from "../../instance.ts";
import {TableItemType} from "./model.ts";

export const tableApi = {
    get: (): AxiosPromise<TableItemType[]> => {
        return instance.get("/ru/data/v3/testmethods/docs/userdocs/get");
    },
    create: (newItem: TableItemType): AxiosPromise<TableItemType[]> => {
        return instance.post("/ru/data/v3/testmethods/docs/userdocs/create", newItem);
    },
    delete: (id: string): AxiosPromise<TableItemType[]> => {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
    },
    set: ({id, updateItem}: {id: string, updateItem: TableItemType}): AxiosPromise<TableItemType[]> => {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, updateItem);
    },
};