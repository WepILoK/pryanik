import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import styles from "./styles/styles.module.scss"
import {Provider} from "react-redux";
import store from "./store.ts";

export const App = () => {

    return (
        <div className={styles.app}>
            <Provider store={store}>
                <RouterProvider router={router}>

                </RouterProvider>
            </Provider>
        </div>
    )
}