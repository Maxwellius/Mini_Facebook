var express = require("express");
var router = express.Router();
var MessageController = require("../controllers/message_controller")
var Utilisateur = require("../models/Utilisateur")

router.get('/', function(req, res){
  if(req.session.user === undefined || req.session.user.id === -1){
    res.redirect('/account/login')
  } else {
    Utilisateur.getUtilisateurById(req.session.user.id, function(callbackObject){
      if (callbackObject.exists){
        callbackObject.user.getAllPublications(function(arrayResponse){
          if(arrayResponse){
            res.render('dashboard/index.ejs', {idpage: 'dashboard', user: callbackObject.user, arrayPublication: arrayResponse})
          }
        })
      } else {
        console.log("Erreur, utilisateur non défini")
      }
    })
  }
})

router.post('/getpartial', function(req, res){
  var partial_index = req.body.partial_index;
  console.log('route get partial, partial index :' + partial_index);


  if(partial_index === 0){
    //display partial Publications
    Utilisateur.getUtilisateurById(req.session.user.id, function(callbackObject){
      if (callbackObject.exists){
        res.render('partials/_publications_partial.ejs', {user: callbackObject.user})
      } else {
        console.log("Erreur, utilisateur non défini")
      }
    })
  } else if(partial_index === 1){
    //display partial Amis
    res.render('partials/_amis_partial')
  } else if(partial_index === 2){
    //display partial A propos
    res.render('partials/_description_partial')
  } else if(partial_index === 10){
    //display partial Nouvelle Publication
    res.render('partials/_new_publication_partial')
  } else {
    //error : unknown index
    res.status(500).send("Invalid partial index")
  }
  
})

router.post('/new_publication', function(req, res){
  var message_controller = new MessageController(req, res);
  message_controller.ajoutmessage(req.body.title, req.body.content, "LeLienDeLimage", req.session.user.id); //TODO : ajouter la gestion des images
  res.redirect('/')
})

module.exports = router;