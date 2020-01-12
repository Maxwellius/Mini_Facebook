const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message_controller")
const UtilisateurController = require("../controllers/utilisateur_controller.js")
const InvitationController = require("../controllers/invitation_controller.js")
const Utilisateur = require("../models/Utilisateur")
const Invitation = require("../models/Invitation")

router.get('/', async function(req, res){
  	if(req.session.user === undefined || req.session.user.id === -1){
		res.redirect('/account/login') //Utilisateur non défini
  	} else {
		var user = await Utilisateur.getUtilisateurById(req.session.user.id); //Utilisateur défini
      var displayedUser = await Utilisateur.getUtilisateurById(req.session.displayedUser.id)
		var arrayPublications = await displayedUser.getAllPublications() 
      var estAmi = await user.estAmi(displayedUser.id)
      var arrayAmis = await UtilisateurController.getAllAmis(user.id)
      var estDejaInvite = await InvitationController.isAlreadyInvited(req.session.user.id, displayedUser.id)
		if(arrayPublications){
			res.render('dashboard/index.ejs', {
            idpage: 'dashboard',
            user: req.session.user,
            displayedUser: req.session.displayedUser,
            arrayPublications: arrayPublications,
            estAmi: estAmi,
            arrayAmis: arrayAmis,
            estDejaInvite: estDejaInvite
         })
		}
	}
})

router.post('/getpartial', async function(req, res){
  var partial_index = req.body.partial_index;
  console.log('route get partial, partial index :' + partial_index);


  if(partial_index === 0){
    //display partial Publications
      const user = await Utilisateur.getUtilisateurById(req.session.user.id) 
      const displayedUser = await Utilisateur.getUtilisateurById(req.session.displayedUser.id)
		const arrayPublications = await displayedUser.getAllPublications() 
      res.render('partials/_publications_partial.ejs', {
         user: user,
         displayedUser: req.session.displayedUser,
         arrayPublications: arrayPublications
      })
  } else if(partial_index === 1){
    //display partial Amis
      const user = await Utilisateur.getUtilisateurById(req.session.user.id);
      const displayedUser = await Utilisateur.getUtilisateurById(req.session.displayedUser.id)
      const estAmi = await user.estAmi(displayedUser.id)
      const arrayAmis = await UtilisateurController.getAllAmis(displayedUser.id, user.id)
      
     res.render('partials/_amis_partial', {
        user: req.session.user,
        displayedUser: req.session.displayedUser,
        estAmi: estAmi,
        arrayAmis: arrayAmis
     })
  } else if(partial_index === 2){
    //display partial A propos
    res.render('partials/_description_partial')
  } else if(partial_index === 10){
    //display partial Nouvelle Publication
    res.render('partials/_new_publication_partial')
     
  } else if(partial_index == 3){
      const user = await Utilisateur.getUtilisateurById(req.session.user.id) 
      const sentInvitationList = await InvitationController.getAllSentInvitations(req.session.user)
      var receivedInvitationList = await InvitationController.getAllReceivedInvitations(req.session.user) 
     if(receivedInvitationList){
      if(receivedInvitationList.filter(function(e){return e.status === 0}).length === 0){
         receivedInvitationList = false;
      } else {
         receivedInvitationList = receivedInvitationList.filter(function(e){return e.status === 0})
      }
   }
     res.render('partials/_invitations_partial.ejs', {
        user: user,
        displayedUser: req.session.displayedUser,
        receivedInvitationList: receivedInvitationList,
        sentInvitationList: sentInvitationList
     })
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

router.get('/changeDisplayedUser', function(req, res){
   Utilisateur.getUtilisateurById(req.query.id).then( 
      (value ) => {
         const displayedUser = value
         req.session.displayedUser = displayedUser;
         res.redirect('/')
      },
      ( error ) => {
         console.log("Promise Failed")
      })
})

router.post('/inviteUser', function(req, res){
   const newInvitation = new Invitation(-1, req.body.sender, req.body.recipient, 0)
   newInvitation.create().then(
      res.json({'success':true})
   )
})

router.post('/answerInvitation', async function(req, res){
   const user = await Utilisateur.getUtilisateurById(req.session.user.id)
   await InvitationController.repondreInvitation(req.body.invitationid, req.body.reponse)
   const sentInvitationList = await InvitationController.getAllSentInvitations(req.session.user)
   var receivedInvitationList = await InvitationController.getAllReceivedInvitations(req.session.user)
   res.render('partials/_invitations_partial.ejs', {
      user: user,
      displayedUser: req.session.displayedUser,
      receivedInvitationList: receivedInvitationList,
      sentInvitationList: sentInvitationList
   })
})
module.exports = router;
