var LienAmis = require('../models/LienAmis');

LienAmisController = function (req, res) {
    // Le controlleur récupère la requete et le resultat.


    this.demandeami = function (demandeur, accepteur, etat) {
        var errorString = "";
        const liensamis = new LienAmis();
        //Vérification des données envoyées côté serveur
        // if(login.length > 14 || login.length < 6){
        //     errorString = "Erreur : Pseudo invalide. (Entre 6 et 14 caractères)"
        //     console.log(errorString)
        //     res.redirect('/account/inscription')
        // } else if (mdp.length > 14 || mdp.length < 6){
        //     errorString = "Erreur : Mot de passe invalide (Entre 6 et 14 caractères)"
        //     console.log(errorString)
        //     res.redirect('/account/inscription')
        // } else if (nom.length > 14 || nom.length < 2){
        //     errorString = "Erreur : Nom invalide (Entre 2 et 14 caractères)"
        //     console.log(errorString)
        //     res.redirect('/account/inscription')
        // } else if (prenom.length > 14 || prenom.length < 2){
        //     errorString = "Erreur : Prénom invalide (Entre 2 et 14 caractères)" 
        //     console.log(errorString)
        //     res.redirect('/account/inscription')
        // } else {
        //     Vérification que le login n'existe pas déjà
        Utilisateur.checkIfExists(login, function (result) {
            if (result.exists) {
                errorString = "Erreur : Le Lien existe déjà."
            } else {
                // Tous les parametres ont été vérifiés, on crée le lien
                liensamis.login = login
                liensamis.mdp = mdp
                liensamis.nom = nom
                liensamis.prenom = prenom
                success = liensamis.save()
                // req.session.liensamis = liensamis //Enregistrement dans la session

                if (success) {
                    console.log("Succes : " + errorString)
                    res.redirect('/')
                }
            }
            console.log(errorString)
            res.redirect('/account/inscription')
        })
        // }

    }

};

module.exports = AccountController;