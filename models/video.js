var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');




var VideoSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    url: String,
    autor: String,
    activo: Boolean
    
}, {timestamps: true,collection:"video"});

var video = mongoose.model("Video", VideoSchema);


module.exports = video;