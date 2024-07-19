import {Outlet} from "react-router-dom";
import {StyledContainer} from "./MainLayout.styles.ts";

export const MainLayout = () => {

    return (
        <StyledContainer>
            <Outlet/>
        </StyledContainer>
    )
}