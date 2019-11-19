var express = require('express');
var login = require('../controllers/login_controller');
var router = express.Router();

router.get('/', function(req, res){
   console.log("GET Login page");
   res.render('login/index.ejs', {root: process.cwd()});
});


router.post('/', function(req, res){
   var loginObject = new login();
   console.log(loginObject.login("test","test"));
});

//export this router to use in our index.js
module.exports = router;