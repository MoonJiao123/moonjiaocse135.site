<?php
//start the session
session_start();

print "<h1>Moon tried this - PHP Sessions Page 2</h1>";
$name =$_SESSION['username'];

if ($name){
	print("<p><b>Name:$name</b></p>");
}else{
	print "<p><b>Name:</b> You do not have a name set</p>";
}

print "<a href=\"/cgi-bin/php-sessions-1.php\">Session Page 1</a><br/>";
print "<a href=\"/php-form.html\">PHP CGI Form</a><br />";
print "<a href=\"/cgi-bin/php-destroy-session.php\">Destroy Session</a><br />";

?>