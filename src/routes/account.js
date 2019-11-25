var express = require('express');
var AccountController = require('../controllers/account_controller');
var router = express.Router();

router.get('/login', function(req, res){
   console.log("GET Login page");
   res.render('account/login.ejs', {root: process.cwd(), query: req.query});
});

router.get('/inscription', function(req, res){
   console.log("GET Inscription page");
   res.render('account/inscription.ejs', {root: process.cwd()});
});

router.get('/modif_compte', function(req, res){
   console.log("GET Modification page");
   res.render('login/modif_compte.ejs', {root: process.cwd()});
});


router.post('/login', function(req, res){
   var account_controller = new AccountController(req, res);
   account_controller.login(req.body.login, req.body.mdp);
});

//export this router to use in our index.js
module.exports = router;