var Message = require('../models/Message');

MessageController = function (req, res) {

    this.ajoutmessage = function (titre, contenu, image, idAuteur) {
        var errorString = "";
        const mess = new Message();
        //Vérification des données envoyées côté serveur
        if (titre.length > 40 || titre.length < 1) {
            errorString = "Erreur : le titre est invalide."
            console.log(errorString)
        } else if (contenu.length > 1000 || contenu.length < 1) {
            errorString = "Erreur : Message Invalide, il doit être compris entre 1 et 1000 caractères."
            console.log(errorString)
        } else {
            mess.titre = titre
            mess.contenu = contenu
            mess.image = image
            mess.idAuteur = idAuteur
            success = mess.save()

            if (success) {
                console.log("Succes : " + errorString)
            }
            console.log(errorString)
        }

    }

    this.suppmessage = function (id, titre) {
        var errorString = ""
        const mess = new Message();
        Message.checkIfExists(mess, function (result) {
            if (result.exists) {
                mess.remove(id)
                if (success) {
                    console.log("Succes : " + errorString)
                    res.redirect('/')
                } else {
                    console.log("Le message n'existe pas.")
                }
            }
            console.log(errorString)
            res.redirect('/')
        })

    }
};

module.exports = MessageController;