import {createBrowserRouter} from "react-router-dom";
import {PrivateRoutes} from "./ui.tsx";

export const router = createBrowserRouter([
    {
        path: "/pryanik",
        children: [
            {
                path: "/pryanik/table",
                element: <PrivateRoutes/>,
                children: [
                    {
                        index: true,
                        element: <>Table</>,
                    },
                ]
            },
            {
                path: "/pryanik/login",
                element: <>Login</>
            }
        ]
    },
])