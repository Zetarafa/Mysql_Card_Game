<?php
header("Content-Type: application/json");

$host = 'localhost';
$user = 'root';
$password = ''; 
$dbname = 'card-game';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$sql = "SELECT id, name, artwork FROM gegner_cards";
$result = $conn->query($sql);

$cards = [];

while ($row = $result->fetch_assoc()) {
    $cards[] = $row;
}

echo json_encode($cards);
$conn->close();
?>
