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
            if(newInvitation.status === 0){
               newInvitation.statusDesc = "Envoyée"
            } else if(newInvitation.status === 1) {
               newInvitation.statusDesc = "Acceptée"
            } else if(newInvitation.status === 2) {
               newInvitation.statusDesc = "Refusée"
            }
            arrayInvitations.push(newInvitation)
         }
         return arrayInvitations
      } else {
         return false;
      }
   }
   
   static async repondreInvitation(invitationId, reponse){
      const invitation = await Invitation.getInvitationById(invitationId)
      invitation.status = reponse
      await invitation.save()

      //Creation de l'amitie
      try {
         const result = await sql.query("INSERT INTO Amitie(idUtilisateur1, idUtilisateur2, timestamp) VALUES (?,?,?)", [invitation.idSender, invitation.idRecipient, invitation.timestamp])
      } catch (err) {
         console.log("Error : repondreInvitation(invitationId, reponse)" + err)
      }
   }

   static async isAlreadyInvited(sender, recipient){
      const result = await sql.query("SELECT * FROM Invitation WHERE (sender = ? AND recipient = ?) OR (sender = ? AND recipient = ?)", [sender, recipient, recipient, sender])
      if(result.length > 0){
         return true
      } else {
         return false
      }
   }
}

module.exports = InvitationController
