var Utilisateur = require('../models/Utilisateur');

AccountController = function (req, res) {
// Le controlleur récupère la requete et le resultat.

    this.login = function (pseudo, mdp) {
        var connexionAcceptee = false;
        const user = new Utilisateur();

        Utilisateur.getUtilisateurByLogin(pseudo, mdp, function (result) {
            if (result.length === 0) {
                //L'utilisateur n'est pas reconnu : Redirection
                connexionAcceptee = false;
                res.redirect('/account/login/?valid=false')
            } else {
                //L'utilisateur est reconnu : Creation de session et redirection
                connexionAcceptee = true;
                req.session.user_id = result[0].id
                res.redirect('/')
            }
        })
    }
};

module.exports = AccountController;