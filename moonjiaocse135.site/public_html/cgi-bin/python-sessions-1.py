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



if not string_cookie:
    if(form):

        # cookie.clear()
        user = form["username"].value
        cookie['user'] = form["username"].value
        cookie['user']['expires'] =  24 * 60 * 60
        print ("Set-Cookie:name = XYZ;\r\n")
        message = 'name is: '+form["username"].value

        # The shelve module will persist the session data
        # and expose it as a dictionary
        session_dir = os.environ['DOCUMENT_ROOT'] + '/cgi-bin'
        session = shelve.open('%s/sess_%s' % (session_dir, user), writeback=True)

        # store to session
        session['user'] = user
    
    else:

        message= "name does not exist"
else:
    # cookie['user']['expires'] =  24 * 60 * 60
    # print ("Set-Cookie: name="+user)
    cookie.load(string_cookie)
    user = cookie['user'].value
    # cookie.clear()
    
    # and expose it as a dictionary
    session_dir = os.environ['DOCUMENT_ROOT'] + '/cgi-bin'
    session = shelve.open('%s/sess_%s' % (session_dir, user), writeback=True)

    # Save the current time in the session
    message = "retrieve user is: "+session['user']



print("<h1>Moon tried this - Python Sessions Page 1</h1>")
# print("<input type=\"hidden\" name=sid value=\"%s\">")
print(message+"<br>")
print ("<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a><br/>")
print("</body></html>")






