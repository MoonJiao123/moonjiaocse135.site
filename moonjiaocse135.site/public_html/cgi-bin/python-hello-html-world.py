#!/usr/bin/env python3
import cgitb
cgitb.enable()
import time
import cgi
import os
# Required header that tells the browser how to render the text.
print("Content-type: text/html\n\n")

print("<html><body>") 
# Print a simple message to the display window.
print ("<h1>Moon Jiao tried this - Hello, Python!</h1>")
print ("<p>This page was generated with the python programming langauge</p>")


print ("<p>Current Time:" , time.ctime())
print ("<p>Your IP Address:" , cgi.escape(os.environ["REMOTE_ADDR"]) )

print("</body></html>")

