var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BananaTube :)' });
});

/* GET REGISTRO page. */
router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Registro' });
});

/* GET LOGIN page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET LOGOUT page. */
router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Logout' });
});

/* GET PERFIL page. */
router.get('/perfil/:id', function(req, res, next) {
  res.render('perfil', { title: 'Logout' });
});


module.exports = router;
