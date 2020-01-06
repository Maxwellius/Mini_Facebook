var express = require('express');
var UtilisateurController = require('../controllers/utilisateur_controller');
var router = express.Router();

router.get('/login', function (req, res) {
   console.log("GET Login page");
   if (req.session.user === undefined || req.session.user.id === -1) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/login.ejs', {
         root: process.cwd(),
         query: req.query,
         idpage: 'login'
      });
   } else {
      //L'utilisateur est connecté
      res.redirect('/')
   }
});

router.post('/login', function (req, res) {
   var utilisateur_controller = new UtilisateurController(req, res);
   utilisateur_controller.login(req.body.login, req.body.mdp);
});

router.get('/inscription', function (req, res) {
   console.log("GET inscription page");
   if (req.session.user_id === -1 || req.session.user_id === undefined) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/inscription', {
         root: process.cwd(),
         idpage: 'inscription'
      })
   } else {
      res.redirect('/')
   }
})

router.post('/inscription', async function (req, res) {
   console.log("POST inscription")
   var utilisateur_controller = new UtilisateurController(req, res);
   var errorString = "";
   await utilisateur_controller.inscription(req.body.login, req.body.mdp, req.body.nom, req.body.prenom)
})

router.get('/logout', function (req, res) {
   console.log("deconnexion")
   req.session.user = undefined
   res.redirect('/account/login')
})
//export this router to use in our index.js
module.exports = router;