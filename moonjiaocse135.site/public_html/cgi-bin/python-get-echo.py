#!/usr/bin/env python3
import cgitb
import cgi

cgitb.enable()
print("Content-type: text/html\n\n")
print("<h1 align=\"center\">Moon Jiao tried this - Get Request Echo</h1>")
form = cgi.FieldStorage()
print("query results:<br>")
for param in form.keys():
   print (param, form[param].value + "<br>")
