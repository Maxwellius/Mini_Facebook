var sql = require('./db.js.js')

var Message = function (newId, newTitre, newContenu, newImage) {
  this.id = -1
  this.titre = ""
  this.contenu = ""
  this.date = ""
  this.image = ""

  if (!newId === undefined) {
    this.id = newId
  }
  if (!newTitre === undefined) {
    this.titre = newTitre
  }
  if (!newContenu === undefined) {
    this.contenu = newContenu
  }
  if (!newImage === undefined) {
    this.image = newImage
  }
  date = Date.prototype.getDate + '/' + Date.prototype.getMonth + '/' + Date.prototype.getFullYear;

  this.create = function () {
    console.log(this)
    // if (this.id != -1) {
    //Pas besoin de vérifier s'il le message existe car il peut y avoir plusieurs fois le meme message!!!
    // const checkResult = Message.checkIfExists(this.titre, function(checkResult){
    //     //Si (le login de l'utilisateur existe ET l'id est celui de l'utilisateur) OU (le login de l'utilisateur n'existe pas encore) ALORS on peut modifier
    //     if ((checkResult.exists && checkResult.mess.id === this.id) || !checkResult.exists) {
    //         //L'utilisateur existe dans la base, on le modifie.
    //         sql.query("UPDATE message SET titre = ?, contenu = ?, image = ? WHERE id = ?", [this.titre, this.contenu, this.image, this.date, this.id], function (err, res) {
    //             if (err) {
    //                 console.log("Erreur SQL : " + err)
    //                 return false;
    //             } else {
    //                 console.log("Sauvegarde Réussie")
    //                 return true;
    //             }
    //         })
    //     } else {
    //         //Un autre utilisateur a déjà le login
    //         return false
    //     }
    // })
    // } else {
    const editMessage = this

    sql.query("INSERT INTO message SET titre = ?, contenu = ?, dateEcrit = ?, image = ?" [editMessage.titre, editMessage.contenu, editMessage.date, editMessage.image], function (err, res) {
      if (err) {
        console.log(err)
        return false;
      } else {
        console.log("Sauvegarde Réussie");
        editMessage.id = res.insertId;
        return true;
      }
    })
  }
}








Message.getMessageById = function (messageId, result) {
  sql.query("select titre, contenu, dateEcrit, image from Message where id = ? ", messageId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res)
    }
  })
}

Message.getAllMessages = function (result) {
  sql.query("Select * from Messages", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log('messages : ', res)
      result(res, null)
    }
  })
}

Message.updateById = function (id, contenu, result) {
  sql.query("UPDATE tasks SET task = ? WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res)
    }
  })
}

Message.remove = function (id, result) {
  sql.query("DELETE FROM Message WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(null, err);
    } else {
      result(null, err);
    }
  })
}
module.exports = Message;