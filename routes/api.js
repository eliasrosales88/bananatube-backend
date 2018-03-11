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
var fs = require('fs');

// ESTABLECE LA SESION DE USUARIO -------- NO USAR NO FUNCIONA
/*router.use(function(req,res,next){
    if(conectado){
        var session=req.session;
        next();
    }else{
        res.render('errorDB', {
            title: 'Mongo No arrancado',
            message: 'Mongo No arrancado',
            error:"No se ha podido conectar a la BBDD"
        });
    }
});
function cogeLogin(session){
    return session.usuario;
}*/
//------------------------------------------------------------



/* GET INICIO - DEVUELVE LA DOCUMENTACION DE LA API. */
router.get('/', function(req, res, next) {
  res.send("hola api");
});
//---------------------------------------------------------------


/* POST REGISTRO DE USUARIO - RECIBE LA INFO DEL FORMULARIO DE REGISTRO. */
router.post('/registro', function (req, res, next) {
  if (conectado) {
      console.log(req.body);
      var usuario = new User({
          username: req.body.username,
          email: req.body.email
      });
      usuario.setPassword(req.body.pass);//ENCRIPTACION DE CONTRASEÑA
      usuario.save(function (err, userdevuelto) {
          if (err) {
              return console.error(err);
          } else {
              console.log("usuario guardado");
              res.setHeader('Content-Type', 'application/json');
              userdevuelto.salt="";// LA salt SE GUARDA EN LA BBDD PERO SE PRESENTA VACIA EN LA API
              userdevuelto.hash="";// EL hash SE GUARDA EN LA BBDD PERO SE PRESENTA VACIA EN LA API
              res.send(JSON.stringify(userdevuelto));
          }
      });
  } else {
      res.render('errorDB', {
          title: 'Mongo No arrancado'
      });
  }

  /*ESTE CODIGO COMPARA CAMPOS DE FORMULARIO PUEDE USARSE PARA CONFIRMAR CONSTRASENA */
  /*if (req.body.nombre === "admin" && req.body.password === "admin") {
      var resultado = {result: true};
      res.send(resultado);
  }else{
      var resultado = {result: false};
      res.send(resultado);
  }*/


});
//---------------------------------------------------------------


/* POST LOGIN DE USUARIO - REALIZA EL LOGIN DEL USUARIO */
router.post('/login', function (req, res, next) {
    if (conectado) {
        //console.log(req.body);
        var usuario = new User({
            username: req.body.username,
            hash: req.body.pass
        });
        var objeto = {

        };
        objeto.username = usuario.username;
        User.findOne(
            objeto,
            function (err, user) {
                if (err) return console.error(err);
                //console.log(user);
                if(user!=null && user.validPassword(usuario.hash)){
                    //login correcto
                    res.setHeader('Content-Type', 'application/json');
                    //guardo el objeto en sesión
                    var session=req.session;
                    session.usuario=user;
                    //EVITAMOS QUE DEVUELVA LA CONTRASEÑA
                    user.hash="";
                    user.salt="";
                    console.log(user);
                    res.send(JSON.stringify(user));
                }else{
                    //login incorrecto
                    res.send("Login incorrecto");
                } 
            }
        );
        /*
        usuario.save(function (err, userdevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("usuario guardado");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userdevuelto));
            }
        });
        */
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
//---------------------------------------------------------------


/*GET LOGINCHECK - VALIDA SI EL USUARIO ESTA LOGUEADO */
router.get('/loginCheck', function (req, res, next) {
    if (conectado) {
        var session=req.session;
        res.setHeader('Content-Type', 'application/json');
        var objetoDevuelto={
            login:true,
            
        };
        if(session.usuario){
            objetoDevuelto.usuario=session.usuario;
            res.send(JSON.stringify(objetoDevuelto));
        }else{
            objetoDevuelto.login=false;
            res.send(JSON.stringify(objetoDevuelto));
        }
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
//---------------------------------------------------------------


/*GET  LOGOUT - CIERRA SESION */
router.get('/logout', function (req, res, next) {
    if (conectado) {
        var session=req.session;
        delete session.usuario;
        res.render("logout", {title: "Adios!"});
        
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }

});
//---------------------------------------------------------------


/* GET PERFIL - MUESTRA EL PERFIL DEL USUARIO CON SESION INICIADA. */
router.get('/perfil/:id', function(req, res, next) {
    var id = req.params.id;
    //res.send(usuario);
    User.findById(id, function (err, user) {
        console.log(user);
        user.salt = "";
        user.hash = "";
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user));
    });
});
//---------------------------------------------------------------


/* POST SUBIDA VIDEO - REGISTRA LOS DATOS INICIALES DEL VIDEO. */
router.post('/subirVideo', function (req, res, next) {
    if (conectado) {
        //console.log(req.body);
        var session = req.session;
        //console.log(session.usuario);
        var video = new Video({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            url: "",
            autor: session.usuario._id,
            activo: true,
        });
        video.save(function (err, videodevuelto) {
            if (err) {
                return console.error(err);
            } else {
                console.log("Video guardado");
                //res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify(videodevuelto));
                res.render("upload");
            }
        });
    } else {
        res.render('errorDB', {
            title: 'Mongo No arrancado'
        });
    }
  });
//---------------------------------------------------------------


/* POST SUBE EL ARCHIVO DE VIDEO - FORMULARIO SUBIDA VIDEO. */
router.post("/uploadFile",function(req,res){
    //console.log(req.files);
    if (!req.files){
        console.log(req.files);
        return res.status(400).send('No files were uploaded.');
    }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.mp4;
    //console.log(req.files);
    //console.log(sampleFile);
    var newpath = __dirname+'/../public/uploads/' + sampleFile.name;
    var rutaVideo = 'uploads/' + sampleFile.name;
    sampleFile.mv(newpath, function(err) {
        if (err){
          return res.status(500).send(err);
        }else{
            var session = req.session;
            var idUser = session.usuario._id;
            //console.log(session.usuario._id);
        
            Video.findOneAndUpdate({ autor: idUser }, { url :rutaVideo}, { sort: { createdAt : -1 } }, function(err, video) {
                console.log(video);
                
                res.send(video);
            });
            
        }
    });
});
//---------------------------------------------------------------


/*GET VIDEOS DEL USUARIO - MUESTRA VIDEOS PARTICULARES DEL USUARIO CON SESION INICIADA */
router.get("/user/videos/:id", function(req, res, next){
    var idUser = req.params.id;
    console.log(idUser);
    Video.find({ autor: idUser }, function(err, video) {
        console.log(video);
        
       res.send(video);
    });
});
//---------------------------------------------------------------



/*GET TODOS LOS VIDEOS */
router.get("/videos", function(req, res){
    Video.find({}, function(err, videos){
        res.send(videos);
    });
})
//---------------------------------------------------------------


/*GET VISTA DE VIDEO PARTICULAR */
router.get("/video/:id", function(req, res){
    Video.find({}, function(err, videos){
        res.render("video");
    });
})

module.exports = router;
