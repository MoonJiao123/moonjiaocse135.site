#!/usr/bin/env python3
import cgitb
import cgi
cgitb.enable()

import os
import requests
import shelve
from os import environ
from http import cookies


#header

print ('Content-Type: text/html\n')

print ('<html><body>')


cookie = cookies.SimpleCookie()
string_cookie = os.environ.get('HTTP_COOKIE')
form = cgi.FieldStorage()
if(form and string_cookie):
    del os.environ["HTTP_COOKIE"]

global user 
if not string_cookie:
    if(form):
        user = form["username"].value
        cookie['user'] = form["username"].value
        cookie['user']['expires'] = 60*60
        message = 'name is: '+form["username"].value
    else:
        message= "name does not exist"
else:
    cookie.load(string_cookie)
    cookie['user']['expires'] = 60*60
    user = cookie['user'].value

# The shelve module will persist the session data
# and expose it as a dictionary
session_dir = os.environ['DOCUMENT_ROOT'] + '/cgi-bin'
session = shelve.open('%s/sess_%s' % (session_dir, user), writeback=True)

# Retrieve last visit time from the session
lastvisit = session.get('lastvisit')
if lastvisit:
    message = "name is: "+ lastvisit
# Save the current time in the session
session['lastvisit'] = repr(user)



print("<h1>Moon tried this - Python Sessions Page 1</h1>")
print(message)
print("</body></html>")






