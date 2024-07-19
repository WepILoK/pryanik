import * as yup from "yup";
export const loginFormSchema = yup.object().shape({
    username: yup.string()
        .matches(/user\d+/, "Логин должен быть вида: user{n}")
        .required('Введите почту'),
    password: yup.string()
        .matches(/password/, "Пароль должен быть: password")
        .required('Введите пароль'),
});