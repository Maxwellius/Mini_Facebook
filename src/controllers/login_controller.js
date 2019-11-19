var Utilisateur = require('../models/Utilisateur');

module.exports = function () {
    this.login = function (pseudo, mdp) {
        const user = new Utilisateur();

        if (Utilisateur.getUtilisateurByLogin(pseudo, mdp, function (err, result) {
            if (err) {
                console.log("Error" + err);
            } else {
                if (result.length = 0) {
                    console.log("Login " + pseudo + ", Password " + mdp + ", utilisateur non reconnu");
                } else {
                    console.log("Utilisateur reconnu");
                }
            }
        }))
            console.log("");
    }
};