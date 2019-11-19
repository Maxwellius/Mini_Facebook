var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   console.log("GET Login page");
   res.render('login/index.ejs', {root: process.cwd()});
});
router.post('/', function(req, res){
   res.send('POST route on login.');
});

//export this router to use in our index.js
module.exports = router;