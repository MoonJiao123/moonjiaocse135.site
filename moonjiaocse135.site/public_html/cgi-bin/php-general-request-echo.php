<?php


$echoprotocol = $_SERVER['SERVER_PROTOCOL'];
$echomethod= $_SERVER['REQUEST_METHOD'];
$echoquery= $_SERVER["QUERY_STRING"];
$echomessage = file_get_contents("php://input");
echo "<h1 align=\"center\">Moon was here - General Request Echo</h1>";
print "<p><b>HTTP Protocol:</b> $echoprotocol</p>";
print "<p><b>HTTP Method:</b> $echomethod</p>";
print "<p><b>Query String:</b> $echoquery</p>";
print "<p><b>Message Body:</b> $echomessage</p>";
?>