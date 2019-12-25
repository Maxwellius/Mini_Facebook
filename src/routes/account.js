var express = require('express');
var UtilisateurController = require('../controllers/utilisateur_controller');
var router = express.Router();

router.get('/login', function (req, res) {
   console.log("GET Login page");
   if (req.session.user === undefined || req.session.user.id === -1) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/login.ejs', { root: process.cwd(), query: req.query, idpage: 'login'});
   } else {
      //L'utilisateur est connecté
      res.redirect('/')
   }
});

router.post('/login', function (req, res) {
   var utilisateur_controller = new UtilisateurController(req, res);
   utilisateur_controller.login(req.body.login, req.body.mdp);
});

router.get('/inscription', function(req, res){
	console.log("GET inscription page");
	if(req.session.user_id === -1 || req.session.user_id === undefined){
		//L'utilisateur n'est pas encore connecté
		res.render('account/inscription', {
			root: process.cwd(),
			idpage: 'inscription'
		})
	} else {
		res.redirect('/')
	}
})

router.post('/inscription', async function(req, res){
	console.log("POST inscription")
	var utilisateur_controller = new UtilisateurController(req, res);
	var errorString = "";
	await utilisateur_controller.inscription(req.body.login, req.body.mdp, req.body.nom, req.body.prenom)
})

/*
router.get('/inscription', function (req, res) {
   console.log("GET Inscription page");
   if (req.session.user_id === -1 || req.session.user_id === undefined) {
      //L'utilisateur n'est pas encore connecté
      res.render('account/inscription.ejs', { root: process.cwd(), idpage: 'inscription'});
   } else {
      //L'utilisateur est connecté
      res.redirect('/')
   }
});

router.post('/inscription', function (req, res) {
   console.log("POST Inscription");
   var account_controller = new AccountController(req, res);
   var errorString = "";
   console.log(req.body.login + ' ' + req.body.mdp)
   account_controller.inscription(req.body.login, req.body.mdp, req.body.nom, req.body.prenom);
})

router.get('/update', function (req, res) {
   console.log("GET Modification page");
   res.render('login/modif_compte.ejs', { root: process.cwd(), idpage: 'modif_compte'});
});

router.post('/update', function (req, res) {
   console.log("POST Modification page");
});
*/


//export this router to use in our index.js
module.exports = router;
