'user strict';
var sql = require('./db.js');

/**
 * 
 * @param {*} newId optionnal int
 * @param {*} newDemandeur optionnal string
 * @param {*} newAccepteur optionnal string
 * @param {*} newEtat optionnal string
 */
var LienAmis = function (newId, newDemandeur, newAccepteur, newEtat) {
    this.id = -1;
    this.demandeur = "";
    this.accepteur = "";
    this.etat = "";


    if (!newId === undefined) {
        this.id = newId
    }
    if (!newDemandeur === undefined) {
        this.demandeur = newDemandeur;
    }

    if (!newAccepteur === undefined) {
        this.accepteur = newAccepteur;
    }

    if (!newEtat) this.etat = newEtat) {
    this.etat = newEtat;
}

/**
 * @description sauvegarde le lien d'amitié dans la base. Retourne true si il n'y a pas      
 * d'erreur, false sinon.
 */
this.save = function () {
    console.log(this)
    // if (this.id != -1) {
    //     const checkResult = LienAmis.checkIfExists(this.demandeur,this.accepteur, function (checkResult) {
    //         //Si (le demandeur du lien existe ET ) OU (le demandeur de l'utilisateur n'existe pas encore) ALORS on peut modifier
    //         if ((checkResult.exists && checkResult.lienamis.id === this.id) || !checkResult.exists) {
    //             //L'utilisateur existe dans la base, on le modifie.
    //             sql.query("UPDATE utilisateur SET demandeur = ?, accepteur = ?, etat = ?, prenom = ?, avatar = ? WHERE id = ?", [this.demandeur, this.accepteur, this.etat, this.prenom, this.avatar, this.id], function (err, res) {
    //                 if (err) {
    //                     console.log("Erreur SQL : " + err)
    //                     return false;
    //                 } else {
    //                     console.log("Sauvegarde Réussie")
    //                     return true;
    //                 }
    //             })
    //         } else {
    //             //Un autre utilisateur a déjà le demandeur
    //             return false
    //         }
    //     })
    // } else {
    const editlien = this
    const checkResult = LienAmis.checkIfExists(this.id, function (checkResult) {
        if (checkResult.exists) {
            //Le lien existe déjà
            return false
        } else {
            //Le lien n'existe pas dans la base, on l'insère.
            sql.query("INSERT INTO lien_amis SET demandeur = ?, accepteur = ?, etat = ?" [editlien.demandeur, editlien.accepteur, editlien.etat, editlien.prenom, editlien.avatar], function (err, res) {
                if (err) {
                    console.log(err)
                    return false;
                } else {
                    console.log("Sauvegarde Réussie");
                    editlien.id = res.insertId;
                    return true;
                }
            })
        }
    })
    // }
}


/**
 * @description Recupère l'utilisateur par demandeur mot de passe
 * @param demandeur string
 * @param accepteur string
 * @param callback fonction qui prends en parametre le nouvel objet user. Elle sera executée
 * de manière synchronisée
 * @returns Objet {exists: bool, user: Utilisateur} exists est vrai si l'utilisateur a été récupéré
 * faux sinon. user représente l'utilisateur rempli si il a été trouvé.
 */
Utilisateur.getLienAmisByDemandeurAccepteur = function (demandeur, accepteur, callback) {
    sql.query("Select * FROM lien_amis WHERE utilisateur1 = ? AND utilisateur2 = ?", [demandeur, accepteur], function (err, res) {
        if (err) {
            //Erreur de la requête
            throw err;
        } else {
            if (res.length === 1) {
                const newLien = new LienAmis();
                newLien.id = res[0].id;
                newLien.demandeur = res[0].demandeur;
                newLien.accepteur = res[0].accepteur;
                newLien.etat = res[0].etat;
                newLien.prenom = res[0].prenom
                var returnObject = {
                    exists: true,
                    lienamis: newLien
                }
                callback(returnObject)
            } else {
                var returnObject = {
                    exists: false,
                    user: null
                }
                callback(returnObject)
            }
        }
    });
}

/**
 * @description Vérifie si le demandeur est déjà présent dans la base
 * @param demandeur string
 * @param accepteur string
 * @returns Objet {exists: bool, lienamis: LienAmis} exists : vrai si il existe déjà, faux sinon.
 * lienamis: le lien qui existe déjà
 */
LienAmis.checkIfExists = function (demandeur, accepteur, callback) {
    sql.query("SELECT * FROM lien_amis WHERE utilisateur1 = ? and utilisateur2 = ?", [lienamis.demandeur, lienamis.accepteur], function (err, res) {
        if (err) {
            throw err;
        } else {
            if (res.length > 0) {
                oldLiens = new LienAmis(res);
                oldLiens.id = res[0].id;
                oldLiens.demandeur = res[0].demandeur;
                oldLiens.accepteur = res[0].accepteur;
                oldLiens.etat = res[0].etat;
                callback({
                    exists: true,
                    lienamis: oldLiens
                })
            } else {
                callback({
                    exists: false,
                    lienamis: null
                })
            }
        }

    })
}


LienAmis.getLienAmisById = function (idLien, result) {
    sql.query("Select * from lien_amis where id = ? ", idLien, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};


LienAmis.getAllLienAmis = function (result) {
    sql.query("Select * from lien_amis", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

LienAmis.remove = function (id, result) {
    sql.query("DELETE FROM lien_amis WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};
module.exports = LienAmis;