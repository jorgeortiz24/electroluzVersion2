<?php

// Incluir el archivo de configuración para establecer la conexión a la base de datos
require_once("../config.php");

// Array para almacenar la respuesta JSON
$valido = array(
    'success' => false,
    'mensaje' => '',
    'nombre' => ''
);

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y limpiar los datos recibidos del formulario (sería ideal usar funciones de limpieza o parámetros preparados para mayor seguridad)
    $correo = isset($_POST['correo']) ? $_POST['correo'] : '';
    $password = isset($_POST['password']) ? md5($_POST['password']) : '';

    // Consulta SQL para verificar el usuario con el correo y la contraseña proporcionados
    $sql = "SELECT * FROM usuario WHERE correo='$correo' AND password='$password'";
    $resultado = $cx->query($sql);

    // Verificar el número de filas devueltas por la consulta
    $n = $resultado->num_rows;
    
    if ($n > 0) {
        // Si se encontró un usuario, obtener sus datos
        $row = $resultado->fetch_array();

        // Configurar la respuesta JSON para indicar éxito y enviar el nombre del usuario
        $valido["success"] = true;
        $valido["mensaje"] = "Bienvenido " . strtoupper($row["nombre"]);
        $valido["nombre"] = strtoupper($row["nombre"]);
    } else {
        // Si no se encontró ningún usuario con los datos proporcionados
        $valido["success"] = false;
        $valido["mensaje"] = "Credenciales incorrectas";
    }
} else {
    // Si no se recibió una solicitud POST válida
    $valido["success"] = false;
    $valido["mensaje"] = "Error: Método de solicitud incorrecto";
}

// Devolver la respuesta JSON al cliente
echo json_encode($valido);

?>
