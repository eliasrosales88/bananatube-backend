var express = require('express');
var router = express.Router();

//CONEXION A BBDD MONGODB USANDO MONGOOSE npm install 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/banana');
var db = mongoose.connection;
var conectado = false;
var User = require("../models/user");// CON MONGOOSE ES REQUERIO SIEMPRE TENER UNA COLECCION PARA CREAR LA BASE DE DATOS
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;
});

/* GET api page. */
router.get('/', function(req, res, next) {
  res.send("hola api");
});

/* GET home page. */
router.post('/registro', function (req, res, next) {
  if (conectado) {
      console.log(req.body);
      var usuario = new User({
          username: req.body.nombre,
          hash: req.body.pass
      });
      usuario.save(function (err, userdevuelto) {
          if (err) {
              return console.error(err);
          } else {
              console.log("usuario guardado");
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(userdevuelto));
          }
      });
  } else {
      res.render('errorDB', {
          title: 'Mongo No arrancado'
      });
  }
  
  /*if (req.body.nombre === "admin" && req.body.password === "admin") {
      var resultado = {result: true};
      res.send(resultado);
  }else{
      var resultado = {result: false};
      res.send(resultado);
  }*/


});

module.exports = router;
