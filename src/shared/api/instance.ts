import axios from 'axios';

const instance = axios.create({
    headers: {
        'x-auth': localStorage.getItem("token") || "321321"
    },
    baseURL: "https://test.v5.pryaniky.com/",
});

export default instance;