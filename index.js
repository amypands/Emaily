const express = require ('express'); // require is a common js module (sharing code between different files)
const app = express(); //generates a new application that represetns a running express app 
// app object is used to set up configuration that will listen for incoming requests that are routed to the express side of the app from the node side, then route those requests onto different route handlers

app.get ('/', (req,res)=> {
    res.send ({hi: 'there'});
});

const PORT = process.env.PORT || 5000; // enivronmental variables set in underlying runtime (see if Heroku has declared a port for us to use)
app.listen(PORT); // instructs Express to tell Node that it wants to listen to incoming traffic on port:5000