'user strict';
var sql = require('./db.js');

//Constructeur Utilisateur
var Utilisateur = function(utilisateur){
    this.login = utilisateur.login;
    this.mdp = utilisateur.mdp;
    this.avatar = utilisateur.avatar;
};

Utilisateur.createUtilisateur = function (newUtilisateur, result) {    
        sql.query("INSERT INTO utilisateur set ?", newUtilisateur, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};

Utilisateur.getUtilisateurById = function (utilisateurId, result) {
        sql.query("Select utilisateur from utilisateur where id = ? ", utilisateurId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};


Utilisateur.getAllUtilisateur = function (result) {
        sql.query("Select * from utilisateur", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};

Utilisateur.updateById = function(id, utilisateur, mdp, result){
  sql.query("UPDATE utilisateur SET login = ?, mdp = ? WHERE id = ?", [utilisateur.login, utilisateur.mdp, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};

Utilisateur.remove = function(id, result){
     sql.query("DELETE FROM utilisateur WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};


Utilisateur.getUtilisateurByLogin = function(login,result){
	sql.query("Select utilisateur FROM utilisateur WHERE login = ?", login, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });
}

Utilisateur.updateAvatarById = function(id, newavatar, result){
  sql.query("UPDATE utilisateur SET avatar = ? WHERE id = ?", [utilisateur.avatar, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};



module.exports= Utilisateur;