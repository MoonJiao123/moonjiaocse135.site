<?php
echo "<h1 align=\"center\">Moon Jiao tried this - POST Request Echo</h1>";
echo "message body:<br>";
while (list($var,$value) = each ($_POST)) {

    echo "$var : $value <br />";
 }
        
?>