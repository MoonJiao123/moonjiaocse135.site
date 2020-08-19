#!/usr/bin/env python3
import cgitb
import cgi
import sys

cgitb.enable()
import os

print("Content-type: text/html\n\n")
print ("<h1 align=\"center\">Moon was here - General Request Echo</h1>")

print ("<p>HTTP Protocol: " + os.environ["SERVER_PROTOCOL"])
print ("<p>HTTP Method:"+ os.environ["REQUEST_METHOD"])
print ("<p>Query String: "+ os.environ["QUERY_STRING"])
print ("<p>Message Body: "+ sys.stdin.read())
