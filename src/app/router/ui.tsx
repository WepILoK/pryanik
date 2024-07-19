import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoutes = () => {
    const localStorageToken  = localStorage.getItem("token")

    return localStorageToken
        ? <Outlet />
        : <Navigate to="/login" replace/>;
}