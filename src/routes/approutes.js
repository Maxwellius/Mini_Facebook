'use strict';
module.exports = function(app){
	var utilisateur = require('../controllers/utilisateurController');

	//Routes Utilisateur
	app.route('/connect')
		.get(utilisateurController.getAllUtilisateur)
		.post(utilisateur.createUtilisateur);

	app.route
}