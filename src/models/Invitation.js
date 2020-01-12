var sql = require('./db.js')
class Invitation{
   
   /** @param recipient : int (-1 pas encore crée, 0 = envoye, 1 = accepte, 2 = refuse) **/
   constructor(_id, _idSender, _idRecipient, _status){
      this.id = (_id != undefined ? _id : -1)
      this.idSender = (_idSender != undefined ? _idSender : -1)
      this.idRecipient = (_idRecipient != undefined ? _idRecipient : -1)
      this.status = (_status != undefined ? _status : -1)
   }

   async create(){
      try {
         const check = await sql.query("SELECT * FROM Invitation WHERE (sender = ? AND recipient= ? AND status = 2) OR (sender = ? AND recipient = ? AND status = 2)", [this.idSender, this.idRecipient, this.idRecipient, this.idSender])
         if(check.length > 0){
            return false
         } else {
            const res = await sql.query("INSERT INTO Invitation(sender, recipient, status) VALUES( ?,?,?)", [this.idSender, this.idRecipient, this.status]);
            return true
         }
      } catch(err) {
         console.log("Error : Invitation.create()" + err);
      }
   }

   async save(){
      try {
         const res = await sql.query("UPDATE Invitation SET sender = ?, recipient = ?, status = ?WHERE id = ?", [this.idSender, this.idRecipient, this.status, this.id])
      } catch(err) {
         console.log("Error : Invitation.save()" + err)
      }
   }
   /** @description : Recupère une invitation correspondant
    * @param : id (int)
    * @returns : bool : false si non trouve, Invitation si trouve
    */
   static async getInvitationById(id){
      console.log(id)
      const res = await sql.query("SELECT * FROM Invitation WHERE id = ?", id);
      if (res.length > 0){
         return new Invitation(res[0].id, res[0].sender, res[0].recipient, res[0].status) 
      } else {
         return false
      }
   }
}

module.exports = Invitation
