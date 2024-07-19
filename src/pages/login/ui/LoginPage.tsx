import React from "react";
import {LoginPageBox, LoginPageContainer} from "./LoginPage.styles.ts";
import {Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../model/actionCreators.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormSchema} from "../model/schema.ts";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Navigate} from "react-router-dom";
import {selectTokenState} from "../model/selectors.ts";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = React.useState(false);
    const token = useSelector(selectTokenState)

    const {control, handleSubmit} = useForm({
        resolver: yupResolver(loginFormSchema),
        mode: 'onSubmit'
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        dispatch(authUser(data))
    }

    if(token) {
        return <Navigate to="/table" replace/>;
    }

    return (
        <LoginPageContainer>
            <LoginPageBox>
                <Typography variant="h5" mb={'12px'}>
                    Авторизация
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        render={({field, fieldState, formState}) => (
                            <TextField
                                helperText={fieldState.error ? fieldState.error.message : null}
                                size="small"
                                error={!!fieldState.error}
                                onChange={field.onChange}
                                value={field.value}
                                type={"text"}
                                fullWidth
                                label={"Логин"}
                                variant="outlined"
                                sx={{pb: "12px"}}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({field, fieldState, formState}) => (
                            <TextField
                                helperText={fieldState.error ? fieldState.error.message : null}
                                size="small"
                                error={!!fieldState.error}
                                onChange={field.onChange}
                                value={field.value}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                fullWidth
                                label={"Пароль"}
                                variant="outlined"
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        sx={{mt: "12px"}}
                        variant="contained"
                    >
                        Войти
                    </Button>
                </form>
            </LoginPageBox>
        </LoginPageContainer>
    )
}