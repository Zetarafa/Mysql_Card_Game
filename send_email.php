<?php
header("Content-Type: application/json"); // 🔹 Asegura la respuesta JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Obtener los datos del formulario
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$selectedData = $_POST['selectedData'] ?? '';

// Verificar si los campos obligatorios están vacíos
if (empty($name) || empty($email)) {
    echo json_encode(["success" => false, "error" => "Name und E-Mail sind erforderlich."]);
    exit;
}

// Configurar destinatario y asunto
$to = "zegarasa@wanadoo.es"; // 🔹 Cambia esto por tu email real
$subject = "Neue Projektanfrage";

// Crear el contenido del correo
$body = "Name: $name\n";
$body .= "E-Mail: $email\n";
$body .= "Nachricht:\n$message\n\n";
$body .= "Ausgewählte Karten:\n$selectedData\n";

// Intentar enviar el correo
if (@mail($to, $subject, $body, "From: $email")) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "E-Mail konnte nicht gesendet werden."]);
}
?>
