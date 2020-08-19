<?php

echo "<h1 align=\"center\">Moon Jiao's Environment Variables</h1>";
$all_env = getenv("/var/www/moonjiaocse135.site/cgi-bin");

// foreach (getallheaders() as $name => $value) {
//     echo "$name: $value<br />";
// }

while (list($var,$value) = each ($_SERVER)) {
    if($var=="PHP_AUTH_USER"){continue;}
    if($var == "PHP_AUTH_PW"){continue;}
    echo "$var => $value <br />";
 }

?>