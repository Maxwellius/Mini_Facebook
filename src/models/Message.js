var sql = require('./db.js')

var Message = function (newId, newTitre, newContenu, newImage, newIdAuteur) {
  this.id = -1
  this.titre = ""
  this.contenu = ""
  this.date = ""
  this.image = ""
  this.idAuteur = ""

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
  if (!newIdAuteur === undefined) {
    this.idAuteur = newIdAuteur
  }
  this.date = "date"

  this.save = function () {
    const query = sql.query("INSERT INTO message(titre, contenu, dateEcrit, image, idAuteur) SET (?, ?, ?, ?, ?)", [this.titre, this.contenu, this.date, this.image, this.idAuteur], function (err, res) {
      if (err) {
        console.log(err)
        return false;
      } else {
        console.log("Sauvegarde Réussie");
        this.id = res.insertId;
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