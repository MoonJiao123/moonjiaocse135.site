

<?php

 session_start();
 if(!isset($_SESSION['username'])){
    $_SESSION['username'] = $_POST['username'];

 }

print "<h1>Moon tried this - PHP Sessions Page 1</h1>";
$name =$_SESSION['username'];

if ($name){
	print("<p><b>Name:$name</b></p>");
}else{
	print "<p><b>Name:</b> You do not have a name set</p>";
}

print "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a><br/>";
print "<a href=\"/php-form.html\">PHP CGI Form</a><br />";
print "<a href=\"/cgi-bin/php-destroy-session.php\">Destroy Session</a><br />";

?>