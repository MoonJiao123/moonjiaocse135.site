<?php
echo "<h1 align=\"center\">Moon Jiao tried this - Get Request Echo</h1>";
echo "query results:<br>";
while (list($var,$value) = each ($_GET)) {

    echo "$var : $value <br />";
 }
?>