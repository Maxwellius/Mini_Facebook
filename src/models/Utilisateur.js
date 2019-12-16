'user strict';
var sql = require('./db.js');

/**
 * 
 * @param {*} newId optionnal int
 * @param {*} newLogin optionnal string
 * @param {*} newMdp optionnal string
 * @param {*} newNom optionnal string
 * @param {*} newPrenom optionnal string
 * @param {*} newAvatar optionnal string
 */
var Utilisateur = function (newId, newLogin, newMdp, newNom, newPrenom, newAvatar) {
    this.id = -1;
    this.login = "";
    this.mdp = "";
    this.nom = "";
    this.prenom = "";
    this.avatar = "";

    if (!newId === undefined) {
        this.id = newId
    }
    if (!newLogin === undefined) {
        this.login = newLogin;
    }

    if (!newMdp === undefined) {
        this.mdp = newMdp;
    }

    if (!newNom === undefined) {
        this.nom = newNom;
    }

    if (!newPrenom === undefined) {
        this.prenom = newPrenom;
    }

    if (!newAvatar === undefined) {
        this.avatar = newAvatar
    }

    /**
     * @description sauvegarde l'utilisateur dans la base. Retourne true si il n'y a pas      
     * d'erreur, false sinon.
     */
    this.save = function () {
        if (this.id != -1) {
            const checkResult = Utilisateur.checkIfExists(this.login, function(checkResult){
                //Si (le login de l'utilisateur existe ET l'id est celui de l'utilisateur) OU (le login de l'utilisateur n'existe pas encore) ALORS on peut modifier
                if ((checkResult.exists && checkResult.user.id === this.id) || !checkResult.exists) {
                    //L'utilisateur existe dans la base, on le modifie.
                    sql.query("UPDATE utilisateur SET login = ?, mdp = ?, nom = ?, prenom = ?, avatar = ? WHERE id = ?", [this.login, this.mdp, this.nom, this.prenom, this.avatar, this.id], function (err, res) {
                        if (err) {
                            console.log("Erreur SQL : " + err)
                            return false;
                        } else {
                            console.log("Sauvegarde Réussie")
                            return true;
                        }
                    })
                } else {
                    //Un autre utilisateur a déjà le login
                    return false
                }
            })
        } else {
            const editUser = this
            const checkResult = Utilisateur.checkIfExists(this.login, function(checkResult){
                if(checkResult.exists){
                    //Le login existe déjà
                    return false
                } else {
                    //L'utilisateur n'existe pas dans la base, on l'insère.
                    sql.query("INSERT INTO utilisateur SET login = ?, mdp = ?, nom = ?, prenom = ?, avatar = ?", [editUser.login, editUser.mdp, editUser.nom, editUser.prenom, editUser.avatar], function (err, res) {
                        if (err) {
                            console.log(err)
                            return false;
                        } else {
                            console.log("Sauvegarde Réussie");
                            editUser.id = res.insertId;
                            return true;
                        }
                    })
                }
            })
        }    
    }     
}

/**
 * @description Recupère l'utilisateur par login mot de passe
 * @param login string
 * @param mdp string
 * @param callback fonction qui prends en parametre le nouvel objet user. Elle sera executée
 * de manière synchronisée
 * @returns Objet {exists: bool, user: Utilisateur} exists est vrai si l'utilisateur a été récupéré
 * faux sinon. user représente l'utilisateur rempli si il a été trouvé.
 */
Utilisateur.getUtilisateurByLoginPassword = function (login, mdp, callback) {
    sql.query("Select * FROM utilisateur WHERE login = ? AND mdp = ?", [login, mdp], function (err, res) {
        if (err) {
            //Erreur de la requête
            throw err;
        }
        else {
            if (res.length === 1) {
                const newUser = new Utilisateur();
                newUser.id = res[0].id;
                newUser.login = res[0].login;
                newUser.mdp = res[0].mdp;
                newUser.nom = res[0].nom;
                newUser.prenom = res[0].prenom
                var returnObject = { exists: true, user: newUser }
                callback(returnObject)
            } else {
                var returnObject = { exists: false, user: null }
                callback(returnObject)
            }
        }
    });
}

/**
 * @description Vérifie si le login est déjà présent dans la base
 * @param login string
 * @returns Objet {exists: bool, user: Utilisateur} exists : vrai si il existe déjà, faux sinon.
 * user: l'utilisateur qui existe déjà
 */
Utilisateur.checkIfExists = function (login, callback) {
    sql.query("SELECT * FROM Utilisateur WHERE login = ?", login, function (err, res) {
        if (err) {
            throw err;
        } else {
            if (res.length > 0) {
                oldUser = new Utilisateur(res);
                oldUser.id = res[0].id;
                oldUser.login = res[0].login;
                oldUser.mdp = res[0].mdp;
                oldUser.nom = res[0].nom;
                oldUser.prenom = res[0].prenom;
                callback({ exists: true, user: oldUser })
            } else {
                callback({ exists: false, user: null })
            }
        }

    })
}


Utilisateur.getUtilisateurById = function (utilisateurId, result) {
    sql.query("Select * from utilisateur where id = ? ", utilisateurId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};


Utilisateur.getAllUtilisateur = function (result) {
    sql.query("Select * from utilisateur", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Utilisateur.updateById = function (id, utilisateur, mdp, result) {
    sql.query("UPDATE utilisateur SET login = ?, mdp = ? WHERE id = ?", [utilisateur.login, utilisateur.mdp, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Utilisateur.remove = function (id, result) {
    sql.query("DELETE FROM utilisateur WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

Utilisateur.updateAvatarById = function (id, newavatar, result) {
    sql.query("UPDATE utilisateur SET avatar = ? WHERE id = ?", [utilisateur.avatar, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



module.exports = Utilisateur;