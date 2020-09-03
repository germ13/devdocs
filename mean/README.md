# MEAN
Rapid prototyping
from: https://www.oreilly.com/learning/rapid-prototyping-web-applications-using-node-js-and-mongodb
Author: Jason Krol Jan72015
## Technologies Used

### NodeJS

### Express
currently version 4
### MongoDB
### Bootstrap

## Requirements
### Server
- Standard web server func. (cookies, sessions, logging, etc)
- Connect to MongoDB server
- Dynamic HTML page rendering
- Handle various endpoints GETs/POSTs


#### Installing

`npm init --yes`  

`npm install --save express express-session request express-handlebars mongodb morgan cookie-parser body-parser method-override underscore`  

`npm install`  

##### server.js

`touch server`

`server.js` see img01.jpg  
- Sets up server
- Configures server
- Starts up server
- Connects to DB

##### server/configure.js
img02 and img03 img04

- set up port
- set up view engine
- handlebars configure
  - good for fron and backend
- morgan
- body parser
- cookies
- session setup
- serve static
- configure routes (endpoints)

##### routes.js
img 05  
- configure routes
- login routes

##### controller.js
`img06`
separate some of the logic into this file.

here we also open up a one time connection to mongodb (instead of repeating it each time)

- Holds our main logic for endpoints

##### mongoclient.js
`img07`
local variable localdb
creates a connection
connection object always available
only called in `server.js`


### Wiring up HTML
`mkdir views`
`mkdir views\layouts`
`cd views`
`touch index.handlebars`
`touch login.handlebars`
`cd layouts`
`touch main.handlebars`

##### main.handlebars
see `img 08 and 09`

<<<<< LEFT OF AT MINUTE 30:40 >>>>>


#### Login/Registration Prompt
#### Feature title
#### Display list of previous movies
#### Half Descent
