<?php
session_start();
// remove all session variables
session_unset();

// destroy the session
session_destroy();
print "<h1>Moon tried this - Session Destroyed</h1>";
print "<a href=\"/php-form.html\">Back to the PHP CGI Form</a><br />";
print "<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a><br />";
print "<a href=\"/cgi-bin/php-sessions-2.php\">Back to Page 2</a>";
?>