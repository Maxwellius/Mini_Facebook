var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
  console.log(req.session.user_id);
  if(req.session.user_id === -1 || req.session.user_id === undefined){
    res.redirect('/account/login')
  } else {
    res.render('dashboard/index.ejs')
  }
})

module.exports = router;