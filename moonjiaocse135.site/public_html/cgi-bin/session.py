#!/usr/bin/env python
import cgitb
import cgi
cgitb.enable()
import hashlib
import time
import os
import shelve
import Cookie

# This is the message that contains the cookie
# and will be sent in the HTTP header to the client
print ('Set-Cookie: lastvisit=' + str(time.time()))

# To save one line of code
# we replaced the print command with a '\n'
print ('Content-Type: text/html\n')
# End of HTTP header

print ('<html><body>')
print ('Server time is', time.asctime(time.localtime()))
print ('</body></html>')
# cookie = Cookie.SimpleCookie()
# string_cookie = os.environ.get('HTTP_COOKIE')

# if not string_cookie:
#     sid = hashlib.sha224(repr(time.ctime())).hexdigest()
#     cookie['sid'] = sid
#     message = 'New session' 
# else:
#     cookie.load(string_cookie)
#     sid = cookie['sid'].value
# cookie['sid']['expires'] = 12 * 30 * 24 * 60 * 60

# # The shelve module will persist the session data
# # and expose it as a dictionary
# session_dir = os.environ['DOCUMENT_ROOT'] + '/cgi-bin'
# session = shelve.open('%s/sess_%s' % (session_dir, sid), writeback=True)

# # Retrieve last visit time from the session
# lastvisit = session.get('lastvisit')
# if lastvisit:
#     message = 'Welcome back. Your last visit was at ' + \
#       time.asctime(time.gmtime(float(lastvisit)))
# # Save the current time in the session
# session['lastvisit'] = repr(time.ctime())


# print(message+"<br>")

# print("</body></html>")




# print ('Content-Type: text/html\n')
# print ('<html><body>')

# sid = cgi.FieldStorage().getfirst('sid')

# if sid: # If session exists
#     message = 'Already existent session'+sid
# else: # New session
#     # The sid will be a hash of the server time
#     sid = hashlib.sha224(repr(time.ctime())).hexdigest()
#     message = 'New session'+sid+time.ctime()

# qs = 'sid=' + sid


# print("<input type=\"hidden\" name=sid value=\"%s\">")

# print('<input type="submit" value="Submit">')
# print(message+"<br>")

# print("</body></html>")

