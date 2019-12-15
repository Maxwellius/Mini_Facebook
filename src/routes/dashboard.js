var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
  if(req.session.user === undefined || req.session.user.id === -1){
    res.redirect('/account/login')
  } else {
    res.render('dashboard/index.ejs', {idpage: 'dashboard'})
  }
})

router.post('/getpartial', function(req, res){
  var partial_index = req.body.partial_index;
  console.log('route get partial, partial index :' + partial_index);


  if(partial_index === 0){
    //display partial Publications
    res.render('partials/_publications_partial')
  } else if(partial_index === 1){
    //display partial Amis
    res.render('partials/_amis_partial')
  } else if(partial_index === 2){
    //display partial A propos
    res.render('partials/_description_partial')
  } else if(partial_index === 10){
    //display partial Nouvelle Publication
    res.render('partials/_new_publication_partial')
  } else {
    //error : unknown index
    res.status(500).send("Invalid partial index")
  }
  
})
module.exports = router;