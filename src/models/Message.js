var sql = require('./db.js.js')

var Message = function(message){
  this.titre = message.titre
  this.contenu = message.contenu
  this.date = message.date
  this.image = message.image
}

Message.createMessage = function (newMessage, result){
  sql.query("INSERT INTO Message set ?", newMessage, function (err, res){
    if(err) {
      console.log("error : ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  })
}

Message.getMessageById = function (messageId, result) {
  sql.query("select titre, contenu, dateEcrit, image from Message where id = ? ", messageId, function(err, res){
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res)
    }
  })
}

Message.getAllMessages = function(result){
  sql.query("Select * from Messages", function(err, res){
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log('messages : ', res)
      result(res, null)
    }
  })
}

Message.updateById = function(id, message, result){
  sql.query("UPDATE tasks SET task = ? WHERE id = ?", [id], function (err, res){
    if(err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res)
    }
  })
}

Message.remove = function(id, result){
  sql.query("DELETE FROM Message WHERE id = ?", [id], function(err, res){
    if(err){
      console.log("error: ", err)
      result(null, err);
    } else {
      result(null, err);
    }
  })
}