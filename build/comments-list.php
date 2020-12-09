<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
header('Content-type: text/html; charset=utf-8');


require_once('db.php');

$result = $mysqli->query("SELECT * FROM `comments` WHERE 1");

for($data = []; $row = $result->fetch_assoc(); $data[] = $row);
    exit(json_encode($data));


?>