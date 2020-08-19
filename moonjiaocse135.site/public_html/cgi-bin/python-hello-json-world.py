#!/usr/bin/env python3
import cgitb
cgitb.enable()
import time
import cgi
import os
import json
# Required header that tells the browser how to render the text.
print("Content-type: text/html\n\n")

# Print a simple message to the display window.
response = {'title' : 'Hello, Python!', 'heading' : 'Hello, Python!', 'message' : 'Moon Jiao trid this - This page was generated with the Python programming language', 'time' : time.ctime(), 'IP' : cgi.escape(os.environ["REMOTE_ADDR"])}
print(json.JSONEncoder().encode(response))


