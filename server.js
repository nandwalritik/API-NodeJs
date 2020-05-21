//importing package
const http = require('http');         // imported http in constant variable named http 
const app = require('./app.js');      // importing app.js

const port = process.env.PORT || 2020 // port at which our project shold run
                                      // we can get this port through environment variable or hardcode it here
                                      // process.env simply accesses nodejs environment variable
                                      // if not set we will use 3000 as default port
const server = http.createServer(app);// http.createServer() method turns your computer into an HTTP server.
                                      //http.createServer() method creates an HTTP Server object.
                                      //The HTTP Server object can listen to ports on your computer and execute a function, a requestListener, each time a request is made.
                                      //http.createServer(requestListener);
server.listen(port);                  //starts listening on port and starts executing whichever function we passes to createServer as argument


