<?php
echo "<h1>Moon Jiao tried this - Hello, PHP!</h1>";
echo "<p>This page was generated with the PHP programming langauge</p>";

$date = date("D M j G:i:s Y");
echo "<p>Current Time: $date</p>";

# IP Address is an environment variable when using CGI
$address = $_SERVER['REMOTE_ADDR'];
echo "<p>Your IP Address: $address</p>";
?>