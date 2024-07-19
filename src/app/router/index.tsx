import {createBrowserRouter, Navigate} from "react-router-dom";
import {PrivateRoutes} from "./ui.tsx";
import {MainLayout} from "../../shared/ui";
import {TablePage, LoginPage} from "../../pages";

export const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    path: "/",
                    element: <PrivateRoutes/>,
                    children: [
                        {
                            index: true,
                            element: <TablePage/>,
                        },
                    ]
                },
                {
                    path: "/login",
                    element: <LoginPage/>
                }
            ]
        },
        {
            path: "*",
            element: <Navigate to="/" replace/>
        }
    ],
    {basename: "/pryanik"}
)