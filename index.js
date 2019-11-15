// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");


/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */



/**
 * Routes Definitions
 */

var login = require('./src/routes/login.js');
app.use('/login', login);

app.get("/", (req, res) => {
  res.status(200).send("<h1>WHATABYTE: Food For J'ajoute du</h1>");
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});