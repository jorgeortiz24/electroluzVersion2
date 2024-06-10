var sesion=localStorage.getItem("nombre");
const checarSesion=()=>{
    if(sesion!=null){
        window.location.href="inicio.html";
    }
}

const registrarUsuario= async()=>{
    var correo=document.querySelector("#correo").value;
    var password=document.querySelector("#password").value;
    var nombre=document.querySelector("#nombre").value;

    if(correo.trim()==='' ||
        password.trim()===''||
        nombre.trim()===''){
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "LLENA LOS CAMPOS",
                footer: 'ELECTROLUZ'
              })
        return;
    }
    if(!validarCorreo(correo)){
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "INTRODUCE UN CORREO VALIDO",
            footer: 'ELECTROLUZ'
          })
        return;
    }
    if(!validarPassword(password)){
        Swal.fire({
            icon: "error",
            title: "ERROR",
            html: "CONTRASEÑA INVALIDA <br>[Mayúscula, minúscula, númuros y mín 8 carácteres]",
            footer: 'ELECTROLUZ'
          })
        return;
}
if(!validarNombre(nombre)){
    Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "NOMBRE INVALIDO",
        footer: 'ELECTROLUZ'
      })
    return;
}

//insertar base de datos
const datos = new FormData();
datos.append("correo",correo);
datos.append("password",password);
datos.append("nombre",nombre);

var respuesta=await fetch("php/usuario/registrarUsuario.php",{
    method:'POST',
    body:datos
});

var resultado= await respuesta.json();

if(resultado.success==true){
    Swal.fire({
        icon: "success",
        title: "EXITO!",
        text: resultado,mensaje,
        footer: 'ELECTROLUZ'
      })
      document.querySelector("#formRegistrar").reset();
      setTimeout(()=>{
        window.location.href="index.html";
      },2000);
}else{
    Swal.fire({
        icon: "error",
        title: "ERROR",
        text: resultado,mensaje,
        footer: 'ELECTROLUZ'
      })
}

}

const loginUsuario= async()=>{
    var correo=document.querySelector("#correo").value;
    var password=document.querySelector("#password").value;
    
    if(correo.trim()=== '' || password.trim() === ''){
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "LLENA LOS CAMPOS",
                footer: 'ELECTROLUZ'
              })
        return;
    }
    if(!validarCorreo(correo)){
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "INTRODUCE UN CORREO VALIDO",
            footer: 'ELECTROLUZ'
          })
        return;
    }
    if(!validarPassword(password)){
        Swal.fire({
            icon: "error",
            title: "ERROR",
            html: "CONTRASEÑA INVALIDA <br>[Mayúscula, minúscula, númuros y mín 8 carácteres]",
            footer: 'ELECTROLUZ'
          })
        return;
}

const datos = new FormData();
datos.append("correo",correo);
datos.append("password",password);

var respuesta=await fetch("php/usuario/loginUsuario.php",{
    method:'POST',
    body:datos
});

var resultado= await respuesta.json();

if(resultado.success==true){
    Swal.fire({
        icon: "success",
        title: "EXITO!",
        text: resultado,mensaje,
        footer: 'ELECTROLUZ'
      })
      document.querySelector("#formIniciar").reset();
      localStorage.setItem("nombre", resultado.nombre)
      setTimeout(()=>{
        window.location.href="inicio.html";
      },2000);
}else{
    Swal.fire({
        icon: "error",
        title: "ERROR",
        text: resultado,mensaje,
        footer: 'ELECTROLUZ'
      })
}

}