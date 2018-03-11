var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET usuario especifico. */
router.get('/:id', function(req, res, next) {
  var session = req.session;
  usuario = session.usuario;
  console.log(usuario);
  
  
  res.render("users",{user: usuario.username});
});

module.exports = router;
