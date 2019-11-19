var Utilisateur = require('../models/Utilisateur');

// function login(pseudo, mdp){
//     const user = new Utilisateur;

//     if(user.getUtilisateurByLogin(pseudo,mdp)){
//         console.log("Vrai");
//     } else {
//         console.log("FAUX");
//     }    
// }


module.exports = function(){
    this.login = function (pseudo, mdp){
        const user = new Utilisateur();
        
        if(Utilisateur.getUtilisateurByLogin(pseudo,mdp,function(err,result){
           if(err){
               console.log(err);
           } else {
               console.log("result" + result);
           }           
        }))
        console.log(""); 
    }
};