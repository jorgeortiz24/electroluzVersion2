
// Revisar si hay una sesión activa
const checarSesion = () => {
  var sesion = localStorage.getItem("nombre");
  if (sesion != null) {
      window.location.href = "inicio.html";
  }
}

// Función para registrar usuario
const registrarUsuario = async () => {
  var correo = document.querySelector("#correo").value;
  var password = document.querySelector("#password").value;
  var nombre = document.querySelector("#nombre").value;

  // Validar campos vacíos
  if (correo.trim() === '' || password.trim() === '' || nombre.trim() === '') {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "LLENA LOS CAMPOS",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Validar correo
  if (!validarCorreo(correo)) {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "INTRODUCE UN CORREO VÁLIDO",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Validar contraseña
  if (!validarPassword(password)) {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          html: "CONTRASEÑA INVÁLIDA <br>Mayúscula, minúscula, números y mín 8 caracteres",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Validar nombre
  if (!validarNombre(nombre)) {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "NOMBRE INVÁLIDO",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Enviar datos al servidor
  const datos = new FormData();
  datos.append("correo", correo);
  datos.append("password", password);
  datos.append("nombre", nombre);

  try {
      var respuesta = await fetch("php/usuario/registrarUsuario.php", {
          method: 'POST',
          body: datos
      });

      var resultado = await respuesta.json();

      if (resultado.success === true) {
          Swal.fire({
              icon: "success",
              title: "ÉXITO!",
              text: resultado.mensaje,
              footer: 'ELECTROLUZ'
          });
          document.querySelector("#formRegistrar").reset();
          setTimeout(() => {
              window.location.href = "index.html";
          }, 2000);
      } else {
          Swal.fire({
              icon: "error",
              title: "ERROR",
              text: resultado.mensaje,
              footer: 'ELECTROLUZ'
          });
      }
  } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Hubo un problema con la solicitud. Inténtalo de nuevo más tarde.",
          footer: 'ELECTROLUZ'
      });
  }
}

// Función para iniciar sesión de usuario
const loginUsuario = async () => {
  var correo = document.querySelector("#correo").value;
  var password = document.querySelector("#password").value;

  // Validar campos vacíos
  if (correo.trim() === '' || password.trim() === '') {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "LLENA LOS CAMPOS",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Validar correo
  if (!validarCorreo(correo)) {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "INTRODUCE UN CORREO VÁLIDO",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Validar contraseña
  if (!validarPassword(password)) {
      Swal.fire({
          icon: "error",
          title: "ERROR",
          html: "CONTRASEÑA INVÁLIDA <br>[Mayúscula, minúscula, números y mín 8 caracteres]",
          footer: 'ELECTROLUZ'
      });
      return;
  }

  // Enviar datos al servidor
  const datos = new FormData();
  datos.append("correo", correo);
  datos.append("password", password);

  try {
      var respuesta = await fetch("php/usuario/loginUsuario.php", {
          method: 'POST',
          body: datos
      });

      var resultado = await respuesta.json();

      if (resultado.success === true) {
          Swal.fire({
              icon: "success",
              title: "ÉXITO!",
              text: resultado.mensaje,
              footer: 'ELECTROLUZ'
          });
          document.querySelector("#formIniciar").reset();
          localStorage.setItem("nombre", resultado.nombre);
          setTimeout(() => {
              window.location.href = "inicio.html";
          }, 2000);
      } else {
          Swal.fire({
              icon: "error",
              title: "ERROR",
              text: resultado.mensaje,
              footer: 'ELECTROLUZ'
          });
      }
  } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
      Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Hubo un problema con la solicitud. Inténtalo de nuevo más tarde.",
          footer: 'ELECTROLUZ'
      });
  }
}

