// validación para contraseñas seguras
export const isValidPassword = (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/.test(password);
