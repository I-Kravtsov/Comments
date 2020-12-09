<?php
  ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
header('Content-type: text/html; charset=utf-8');  

  require_once('db.php');
  
  $name = $_POST['name'];
  $text = $_POST['text'];
  $time = date('H:i');
  $date = date('d.m.Y');
  
  $name = htmlspecialchars(trim($name));
  $text = htmlspecialchars(trim($text));
  
  if(empty($name) || empty($text)) {
    exit('Не все поля заполнены');
  }
  
  $result = $mysqli -> query("INSERT INTO `comments`(`name`, `time`, `date`, `text`) VALUES ('$name','$time','$date','$text')");
  if($result) {
    exit('1');
  }
  else {
    exit('error');
  }
  
?>