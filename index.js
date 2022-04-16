// const express = require("express"); // require is a common js module (sharing code between different files)
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("./config/keys.js");
// const app = express(); //generates a new application that represetns a running express app
// // app object is used to set up configuration that will listen for incoming requests that are routed to the express side of the app from the node side, then route those requests onto different route handlers

// passport.use(
//   new GoogleStrategy( //google strategy has an internal identifier of 'google' string
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback", //route the user is sent to after they grant permission
//     },
//     (accessToken) => {
//       console.log(accessToken);
//     }
//   )
// ); //i want to be able to authenticate my users with google(new instance of google passport strategy)

// app.get(
//   "/auth/google", //whenever a user comes to this route, we want to kick them into our flow managed by pasport (authenticate the user coming to this route)
//   passport.authenticate("google", { //google is the strategy
//     scope: ["profile", "email"], // specifies to google the access we want to have to the users profile
//   })
// );

// const PORT = process.env.PORT || 5000; // enivronmental variables set in underlying runtime (see if Heroku has declared a port for us to use)
// app.listen(PORT); // instructs Express to tell Node that it wants to listen to incoming traffic on port:5000

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require ('cookie-session');
const passport = require ('passport');
const keys = require('./config/keys');
require('./models/User');
require("./services/passport");


//takes the app object and adds the 2 routes to it

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //takes the app object and adds the 2 routes to it // returns a function, immediately call function with app object

const PORT = process.env.PORT || 5000;
app.listen(PORT);
