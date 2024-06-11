<?php

$server = "localhost";
$user = "root";
$pass = "";
$db = "registro_1";

$cx = mysqli_connect($server, $user, $pass, $db);

// Verificar la conexión
if (!$cx) {
    die("Conexión fallida: " . mysqli_connect_error());
}

echo "Conexión exitosa";

?>

