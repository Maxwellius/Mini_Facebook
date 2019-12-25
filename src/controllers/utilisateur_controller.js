var Utilisateur = require('../models/Utilisateur');

class UtilisateurController{

  constructor(_req, _res){
    this.req = _req;
    this.res = _res;
  }

  login(login, mdp){
    Utilisateur.getUtilisateurByLogin(login).then( 
      (value) => {
        const user = value
        if(!user){
          this.res.redirect('/account/login/?valid=false')
        } else if(!user.mdp === mdp) {
          this.res.redirect('/account/login/?valid=false')
        } else {
          this.req.session.user = user
          this.res.redirect('/')
        }
      }, (reason) => {
        console.log('UtilisateurController.login(), Error')
      }
    ).catch((err) => console.log("Erreur : "+err));
  }

  async inscription(login, mdp, nom, prenom){
	  var errorString = "";
	  const user = new Utilisateur();
	  //Vérification des données envoyées côté serveur
	  if(login.length > 14 || login.length < 6){
			errorString = "Erreur : Pseudo invalide. (Entre 6 et 14 caractères)"
			console.log(errorString)
			this.res.redirect('/account/inscription')
	  } else if (mdp.length > 14 || mdp.length < 6){
			errorString = "Erreur : Mot de passe invalide (Entre 6 et 14 caractères)"
			console.log(errorString)
			this.res.redirect('/account/inscription')
	  } else if (nom.length > 14 || nom.length < 2){
			errorString = "Erreur : Nom invalide (Entre 2 et 14 caractères)"
			console.log(errorString)
			this.res.redirect('/account/inscription')
	  } else if (prenom.length > 14 || prenom.length < 2){
			errorString = "Erreur : Prénom invalide (Entre 2 et 14 caractères)" 
			console.log(errorString)
			this.res.redirect('/account/inscription')
	  } else {
			//Vérification que le login n'existe pas déjà
			var oldUser = await Utilisateur.getUtilisateurByLogin(login)
			if(oldUser){
				errorString = "Erreur : Le login existe déjà";
			} else {
				user.login = login
				user.mdp = mdp
				user.nom = nom
				user.prenom = prenom
				var success = await user.save()
				if(success.success){
					this.req.session.user = user //Enregistrement dans la session
					console.log("Succes : " + errorString)
					this.res.redirect('/')
				} else {
					console.log(success.error)
				}
			}
	  }
  }
}

module.exports = UtilisateurController;


