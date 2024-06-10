const validarCorreo=(correo)=>{
    return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo.trim());
}
const validarPassword=(password)=>{
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,15}$/.test(password.trim());
}
const validarNombre=(nombre)=>{
    return /^[A-Za-z]\d[A-Za-z0-9.-]{1,20}$/.test(nombre.trim());
}