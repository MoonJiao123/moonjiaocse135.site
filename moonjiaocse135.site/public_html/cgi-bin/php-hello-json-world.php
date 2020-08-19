<?php
$date = date("D M j G:i:s Y");
$address = $_SERVER['REMOTE_ADDR'];

$myjson = array('title' => 'Hello, PHP!', 'heading' => 'Hello, PHP!', 'message' => 'Moon Jiao trid this - This page was generated with the PHP programming language', 'time' => $date, 'IP' => $address);

echo json_encode($myjson);

?>