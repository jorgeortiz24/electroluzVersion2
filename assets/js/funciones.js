const validarCorreo = (correo) => {
    return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo.trim());
};

const validarPassword = (password) => {
    return /(?=.*[!@#$%^&*])/.test(password.trim());
};

const validarNombre = (nombre) => {
    return /^[A-Za-z][A-Za-z0-9.-]{1,20}$/.test(nombre.trim());
};
