#!/usr/bin/env python3
import cgitb
import cgi

cgitb.enable()
import os
print("Content-type: text/html\n\n")
print ("<h1 align=\"center\">Moon Jiao's Environment Variables</h1>")

for param in os.environ.keys():
   print (param, os.environ[param]+"<br>")

