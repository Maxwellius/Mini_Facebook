var Message = require('../models/Message');

MessageController = function (req, res) {


    this.ajoutmessage = function (titre, message, image) {
        var errorString = "";
        const mess = new Message();
        //Vérification des données envoyées côté serveur
        if (titre.length > 20 || titre.length < 1) {
            errorString = "Erreur : le titre est invalide."
            console.log(errorString)
            res.redirect('/')
        } else if (message > 1000 || message.length < 1) {
            errorString = "Erreur : Message Invalide, il doit être compris entre 1 et 1000 caractères."
            console.log(errorString)
            res.redirect('/')
        } else {
            mess.titre = titre
            mess.message = message
            mess.image = image
            success = mess.save()

            if (success) {
                console.log("Succes : " + errorString)
                res.redirect('/')
            }
            console.log(errorString)
            res.redirect('/')

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

module.exports = AccountController;