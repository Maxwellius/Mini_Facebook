const Utilisateur = require('../models/Utilisateur.js')
const Invitation = require('../models/Invitation.js')
const sql = require ('../models/db.js')

class InvitationController{

   constructor(req, res){
      this.req = req
      this.res = res
   }

   static async getAllReceivedInvitations(user){
      const result = await sql.query("SELECT * FROM Invitation WHERE recipient = ?", [user.id])
      if (result.length > 0){
         const arrayInvitations = []
         for(const element of result){
            var newInvitation = new Invitation(element.id, element.sender, element.recipient, element.status)
            newInvitation.sender = await Utilisateur.getUtilisateurById(newInvitation.idSender)
            newInvitation.recipient = await Utilisateur.getUtilisateurById(newInvitation.idRecipient)
            arrayInvitations.push(newInvitation)
         }
         return arrayInvitations
      } else {
         return false;
      }
   }

   static async getAllSentInvitations(user){
      const result = await sql.query("SELECT * FROM Invitation WHERE sender = ?", [user.id])
      if (result.length > 0){
         const arrayInvitations = []
         for(const element of result){
            var newInvitation = new Invitation(element.id, element.sender, element.recipient, element.status)
            newInvitation.sender = await Utilisateur.getUtilisateurById(newInvitation.idSender)
            newInvitation.recipient = await Utilisateur.getUtilisateurById(newInvitation.idRecipient)
            arrayInvitations.push(newInvitation)
         }

         return arrayInvitations
      } else {
         return false;
      }
   }
}

module.exports = InvitationController
