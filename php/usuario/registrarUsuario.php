<?php

require_once("../config.php");

$valido = array('success' => false, 'mensaje' => "");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'];
    $password = md5($_POST['password']);  // Es recomendable usar un algoritmo más seguro como password_hash
    $nombre = $_POST['nombre'];

    // Verificar si el correo ya está en uso
    $sql = "SELECT * FROM usuario WHERE correo = ?";
    $stmt = $cx->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $n = $resultado->num_rows;
    
    if ($n == 0) {
        // Insertar nuevo usuario
        $sqlInsertar = "INSERT INTO usuario (correo, password, nombre) VALUES (?, ?, ?)";
        $stmtInsertar = $cx->prepare($sqlInsertar);
        $stmtInsertar->bind_param("sss", $correo, $password, $nombre);
        
        if ($stmtInsertar->execute()) {
            $valido["success"] = true;
            $valido["mensaje"] = "SE GUARDO CORRECTAMENTE";
        } else {
            $valido["success"] = false;
            $valido["mensaje"] = "ERROR: NO SE GUARDO";
        }
        
        $stmtInsertar->close();
    } else {
        $valido["success"] = false;
        $valido["mensaje"] = "EL CORREO YA ESTA EN USO";
    }
    
    $stmt->close();
} else {
    $valido["success"] = false;
    $valido["mensaje"] = "NO SE GUARDO";
}

echo json_encode($valido);

$cx->close();

?>

<div class=""></div>