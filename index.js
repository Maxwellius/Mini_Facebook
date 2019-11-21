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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'))
/**
 * Routes Definitions
 */

var account = require('./src/routes/account.js');
app.use('/account', account);



app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.status(200).send("<h1>WHATABYTE: Food For him</h1>");
});


/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
  if (process.send) {
    process.send({ event:'online', url:'http://localhost:8000/' });
  }
});