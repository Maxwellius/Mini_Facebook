var sql = require('./db.js')

class Invitation{
   
   /** @param recipient : int (-1 pas encore crée, 0 = envoye, 1 = accepte, 2 = refuse) **/
   constructor(_id, _sender, _recipient, _status){
      this.id = (_id != undefined ? _id : -1)
      this.sender = (_sender != undefined ? _sender : -1)
      this.recipient = (_recipient != undefined ? _recipient : -1)
      this.status = (_status != undefined ? _status : -1)
   }

   async create(){
      try {
         const res = await sql.query("INSERT INTO Invitation(sender, recipient, status) VALUES( ?,?,?)", [this.sender, this.recipient, this.status]);
         
      } catch(err) {
         console.log("Error : Invitation.create()" + err);
      }
   }

   async save(){
      try {
         const res = await sql.query("UPDATE Invitation SET sender = ?, recipient = ?, status = ?WHERE id = ?", [this.sender, this.recipient, this.status, this.id])
      } catch(err) {
         console.log("Error : Invitation.save()" + err)
      }
   }
   /** @description : Recupère une invitation correspondant
    * @param : id (int)
    * @returns : bool : false si non trouve, Invitation si trouve
    */
   static async getInvitationById(id){
      const res = await sql.query("SELECT * FROM Invitation WHERE id = ?", id);
      if (res.length > 0){
         return new Invitation(res[0].id, res[0].sender, res[0].recipient, res[0].status)
      } else {
         return false
      }
   }
}

module.exports = Invitation
