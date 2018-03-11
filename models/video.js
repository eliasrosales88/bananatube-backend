var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');




var VideoSchema = new mongoose.Schema({
    titulo: {type: String, required: [true, "can't be blank"]},
    descripcion: {type: String, required: [true, "can't be blank"]},
    url: String,
    autor: String,
    activo: Boolean
    
}, {timestamps: true,collection:"video"});

var video = mongoose.model("Video", VideoSchema);


module.exports = video;