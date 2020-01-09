// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require('body-parser');


/**
 * App Variables
 */

const app = express();
const port = process.env.NODE_PORT || "8000";

/**
 *  App Configuration
 */
app.set('view engine', 'ejs'); // ejs setup
app.set('views', path.join(__dirname, '/src/views')) // session setup
app.use(session({secret: 'sssshhhhh'}))

app.use(express.static(path.join(__dirname, 'public')));//static public folder

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/**
 * Routes Definitions
 */

var account = require('./src/routes/account.js');
app.use('/account', account); // Route /account

var dashboard = require('./src/routes/dashboard.js');
app.use('/', dashboard); //Route / redirects to the /dashboard

var search = require('./src/routes/search.js');
app.use('/search', search); //Route / redirects to the /search

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
  if (process.send) {
    process.send({ event:'online', url:`http://localhost:${port}/`});
  }
});