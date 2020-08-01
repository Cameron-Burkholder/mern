// IMPORT PACKAGES
const express = require("express");           // For use in routing and middleware
const mongoose = require("mongoose");         // For use in database connections
const bodyParser = require("body-parser");    // For use in parsing incoming requests
const passport = require("passport");         // For use in authentication
const path = require("path");                 // For use in directory management

// IMPORT ROUTES
const users = require("./routes/users");

// IMPORT UTILITY FUNCTIONS
const { log } = require("./config/utilities");

// SETUP EXPRESS
const app = express();
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SETUP DATABASE
const URI = require("./config/keys").MONGODB_URI;
// Handle error in establishing connection
try {
  mongoose.connect(URI, { useNewUrlParser: true});
  log("CONNECTION TO DATABASE ESTABLISHED.");
} catch(error) {
  log("ERROR WHILE CONNECTING TO DATABASE: " + error);
}
// Handle error after connection has been established
mongoose.connection.on("error", (error) => {
  log("DATABASE ERROR: " + error);
});

// IMPLEMENT PASSPORT
app.use(passport.initialize());
require("./config/passport")(passport);

// IMPLEMENT ROUTES
app.use("/api/users", users);

// DEFINE PORT AND DEPLOY SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log("DEPLOY SERVER: Server running on port " + port);
});
