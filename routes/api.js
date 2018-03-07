var express = require('express');
var router = express.Router();

//CONEXION A BBDD MONGODB USANDO MONGOOSE npm install 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/banana');
var db = mongoose.connection;
var conectado = false;
var User = require("../models/user");// CON MONGOOSE ES REQUERIO SIEMPRE TENER UNA COLECCION PARA CREAR LA BASE DE DATOS
var Video = require("../models/video");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conexion abierta");
    conectado = true;
});

/* GET api page. */
router.get('/', function(req, res, next) {
  res.send("hola api");
});

/* GET registro page. */
router.post('/registro', function (req, res, next) {
  if (conectado) {
      console.log(req.body);
      var usuario = new User({
          username: req.body.username,
          hash: req.body.hash
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

/* GET VIDEO page. */
router.post('/video/nuevo', function (req, res, next) {
    if (conectado) {
        console.log(req.body);
        var video = new Video({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            url: req.body.url,
            autor: req.body.autor,
            activo: req.body.activo,
        });
        video.save(function (err, videodevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(videodevuelto));
                
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }
  
  });

module.exports = router;
