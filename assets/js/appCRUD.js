// Obtener el nombre de usuario almacenado en localStorage
var sesion = localStorage.getItem("nombre");

// Función para verificar la sesión del usuario
const checarSesion = () => {
    if (sesion === null) {
        // Si no hay nombre de usuario en localStorage, redirigir a la página de inicio de sesión
        window.location.href = "index.html";
    } else {
        // Si hay nombre de usuario, mostrarlo en el elemento con id "usuario"
        document.querySelector("#usuario").innerHTML = sesion;
    }
};

// Función para cerrar la sesión del usuario
const cerrarSesion = () => {
    // Limpiar todos los datos de localStorage
    localStorage.clear();
    // Redirigir a la página de inicio de sesión
    window.location.href = "index.html";
};
