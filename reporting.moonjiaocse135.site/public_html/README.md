# https://reporting.moonjiaocse135.site
##### username for basic auth: moon or grader
##### password for basic auth: Jy459616 or 123456
##### username admin level to login to report page: moon
##### password admin level to login to report page: moon
##### username basic level user to login to report page: user
##### password basic level user to login to report page: user
### note ** when add a user do not put id in it will auto generate id **
### to run (npm i if necessary)
1. go to reporting.moonjiaocse135.site/public_html
2. run node with server node.js or using pm2, pm2 start server.js
3. in another terminal run redis, redis-cli -h 165.227.193.69 -p 6379

## Authentication
## I wrote my own authentication for login the api call and used redis locally to manage sessions to enable multiple users. 
the default page is the login.html page  
when the user first log in the user shall input the info and click the submit button, the form  
will go to '/login' to check  

1. if the input fields are empty if either is empty server will return error message
2. if the password is wrong server will return error message
3. if the user cannot be found server will return error message
4. otherwise the user will be directed to report page accroidng its type in the database

if the user go back to login.html or refresh the report page, the frontend will still showing  
the reporting page  
if the user log out in the report page, the session will end and direct user to logout.html  
if the user type url without log in first server will redirect user to login page  

I user redis to be able to have mutiple users using at the same time. Also it is fast so good for performance.  
I implementaed autication myself to see what I can do on my own

## Dashboard

for the report I have 3 plots, one grid, and two charts. The first chart is a grid about some basic info of the user I think it is important for the user to have some basic info  
I used grid becasueI just want to show a bunch of info, not any relatonships.  

The secod chart is a line graph of navitation time, I included because it is a overall indication of page speed, which is my guide question. I used like chart because I want to show how navigation changed each time, we can see there are up and downs.


The last chart is a data summarization of lcp, fid and cls, which are also page speed guides. I also used line chart becasue I want to show there are ups and downs of these data.   

## Report

I choose to show some details on the lcp, fid, and cls on the dashboard page. I choose this beacuse I want to show the users how these factors are related to page speed, thus affecting the user experience. 

I have two graphs here, one is a grid and one is a line chart. I used the grid to show the overall resutls of all the factors, specifically their vitalsScore. I show all the vitasScore of the data. This can give the user a overview of what are good or poor for these facors.  

for the line graph, I showed the clsFinal data, because that is the only part we have poor scores on. I showed the user where are the standards, (poor above 0.25 and good below 0.1), and the results indicate that we need lots of imporovments on cls to improve the page speed thus improving the user experience overall. 
