var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
  console.log(req.session.user_id);
  if(req.session.user === undefined || req.session.user.id === -1){
    res.redirect('/account/login')
  } else {
    res.render('dashboard/index.ejs')
  }
})

module.exports = router;