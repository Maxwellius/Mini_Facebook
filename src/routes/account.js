var express = require('express');
var AccountController = require('../controllers/account_controller');
var router = express.Router();

router.get('/login', function (req, res) {
   console.log("GET Login page");
<<<<<<< HEAD
   res.render('account/login.ejs', { root: process.cwd(), query: req.query });
});

router.get('/inscription', function (req, res) {
   console.log("GET Inscription page");
   res.render('account/inscription.ejs', { root: process.cwd() });
});

router.get('/update', function (req, res) {
   console.log("GET Modification page");
   res.render('account/update.ejs', { root: process.cwd() });
});

router.post('/update', function (req, res) {
   var account_controller = new AccountController(req, res);
   // account_controller.update(...);
});


router.post('/login', function (req, res) {
   var account_controller = new AccountController(req, res);
   account_controller.login(req.body.login, req.body.mdp);
});
=======
   if (req.session.user_id === -1 || req.session.user_id === undefined) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/login.ejs', { root: process.cwd(), query: req.query });
   } else {
      //L'utilisateur est connecté
      res.redirect('/')
   }
});

router.post('/login', function (req, res) {
   var account_controller = new AccountController(req, res);
   account_controller.login(req.body.login, req.body.mdp);
});

router.get('/inscription', function (req, res) {
   console.log("GET Inscription page");
   if (req.session.user_id === -1 || req.session.user_id === undefined) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/inscription.ejs', { root: process.cwd() });
   } else {
      //L'utilisateur est connecté
      res.redirect('/')
   }
});

router.post('/inscription', function(req, res){
   console.log("POST Inscription");
   var account_controller = new AccountController(req, res);
   var errorString = "";
   console.log(req.body.login + ' ' + req.body.mdp)
   account_controller.inscription(req.body.login, req.body.mdp, req.body.nom, req.body.prenom);
})

router.get('/modif_compte', function (req, res) {
   console.log("GET Modification page");
   res.render('login/modif_compte.ejs', { root: process.cwd() });
});



>>>>>>> bd95ee651027db6e6133a89b09a04db754ae46b4

//export this router to use in our index.js
module.exports = router;