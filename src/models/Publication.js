var sql = require('./db.js')

class Publication {
  
  constructor(newId, newTitre, newContenu, newImage, newIdAuteur) {
    this.id = (!newId != undefined ? newId : -1);
    this.titre = (!newTitre != undefined ? newTitre : "");
    this.contenu = (!newContenu != undefined ? newContenu : "");
    this.image = (!newImage != undefined ? newImage : "");
    this.idAuteur = (!newIdAuteur != undefined ? newImage : "");
  }

  async save(){
    this.date = new Date();
    this.date = this.date.toISOString().split('T')[0] + ' ' + this.date.toTimeString().split(' ')[0];
    try {
      const result = await sql.query("INSERT INTO message SET titre = ?, contenu = ?, dateEcrit = ?, image = ?, idAuteur = ?, idAmi=2", [this.titre, this.contenu, this.date, this.image, this.idAuteur]);
      console.log(result)
    } catch(err) {
      console.log("Publication.save() : " + err);
    } 
  }

}
module.exports = Publication;
