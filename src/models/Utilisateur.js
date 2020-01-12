var sql = require('./db.js');
var Publication = require('./Publication.js');
var Invitation = require('./Invitation.js')
class Utilisateur{

  constructor(_id, _login, _mdp, _nom, _prenom, _avatar) {
    this.id = (_id != undefined ? _id : -1);
    this.login = (_login != undefined ? _login : "");
    this.mdp = (_mdp != undefined ? _mdp : "");
    this.nom = (_nom != undefined ? _nom : "");
    this.prenom = (_prenom != undefined ? _prenom : "");
    this.avatar = (_avatar != undefined ? _avatar : "");
  }

  /**
   * @description Enregistre l'objet dans la base de données en vérifiant le contenu
   * @returns {object{success, error}} success: bool, error: string
   */
  async save(){
      try {
          const userById = await Utilisateur.getUtilisateurById(this.id);
          if (!userById){ 
            //L'utilisateur n'existe pas
            if(await Utilisateur.getUtilisateurByLogin(this.login)){
              //Si le login existe : Echec de l'enregistrement.
              return {success:false, error: "Erreur : Le login existe déjà"};
            } else {
              //Si le login n'existe pas : Nouvel utilisateur.
				  console.log("insertion nouvel utilisateur")
              const res = await sql.query("INSERT INTO utilisateur SET login = ?, mdp = ?, nom = ?, prenom = ?, avatar = ?", [this.login, this.mdp, this.nom, this.prenom, this.avatar]);
              return {success:true, error:null}
            }
          } else {
            //L'utilisateur existe déjà
            const oldUser = await Utilisateur.getUtilisateurByLogin(this.login)
            if((oldUser && oldUser.id === this.id) || (!oldUser)) {
              //Le login est celui de l'utilisateur courant ou n'existe pas: changement de login
              const res =  await sql.query("UPDATE utilisateur SET login = ?, mdp = ?, nom = ?, prenom = ?, avatar = ? WHERE id = ?", [this.login, this.mdp, this.nom, this.prenom, this.avatar, this.id]);
              return {success:true, error:null}
            } else {
              //Le login existe déjà et est celui de qqn d'autre : erreur
              return {success:false, error: "Erreur : Le login existe déjà"};
            }
          }
      } catch(err) {
        console.log('Utilisateur.save() ' + err);
      }
  }

		  async creerNouvelleAmitie(idNouvelAmi){
		  }
/*
 * @description : Retourne les publications de l'utilisateur
 * @returns array of Publication
 */
	async getAllPublications(){
		if(this.id === -1){
			console.log("Error : getAllPublications(), Utilisateur non défini")	
		} else {
			var result = await sql.query('Select * From Message Where idAuteur = ?', this.id)	
			var arrayPublications = []	
			result.forEach((elem)=>{
				arrayPublications.push(new Publication(elem.id, elem.titre, elem.contenu, elem.image, elem.idAuteur))
			})
			return arrayPublications;
		}
	}
  /**
   * @description : Retourne vrai si le login existe déjà, faux sinon;
   * @param {string} login 
   *
   */
  static async getUtilisateurByLogin(login){
    const res = await sql.query("SELECT * FROM Utilisateur WHERE login = ?", login);
    if(res.length > 0){
      return new Utilisateur(res[0].id, res[0].login, res[0].mdp, res[0].nom, res[0].prenom);
    } else {
      return false;
    }
  }

  /**
   * @description : Retourne l'utilisateur si l'id existe déjà, faux sinon
   * @param {int} id 
   */
  static async getUtilisateurById(id){
    const res = await sql.query("SELECT * FROM Utilisateur WHERE id = ?", id);
    if(res.length > 0){
      return new Utilisateur(res[0].id, res[0].login, res[0].mdp, res[0].nom, res[0].prenom);
    } else {
      return false;
    }
  }

   async estAmi(idUtilisateur){
      const res = await sql.query("SELECT * FROM Amitie WHERE (idUtilisateur1 = ? AND idUtilisateur2 = ?) OR (idUtilisateur2 = ? AND idUtilisateur1 = ?)", [this.id, idUtilisateur, this.id, idUtilisateur])
      return (res.length > 0)
   }

}
   

module.exports = Utilisateur;
