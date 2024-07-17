import axios from 'axios';

const instance = axios.create({
    'x-auth': localStorage.getItem("token") || "",
    baseURL: "https://test.v5.pryaniky.com/",
});

export default instance;