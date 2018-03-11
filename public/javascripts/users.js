function info(){
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck);
        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }
        else{
           $("#contenidoUsuario").html("");
           $("#contenidoUsuario").append(`
           <div>Usuario: ${loginCheck.usuario.username}</div>
           <div>Creado: ${loginCheck.usuario.createdAt}</div>
           <div>Actualizado: ${loginCheck.usuario.updatedAt}</div>
           <div>Id: ${loginCheck.usuario._id}</div>
           `);
        }
    })
}

/*function tusVideos(){
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck);
        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }
        else{
            $.get("/api/video")
           $("#contenidoUsuario").html("");
           $("#contenidoUsuario").append(`
           <div>Usuario: ${loginCheck.usuario.username}</div>
           <div>Creado: ${loginCheck.usuario.createdAt}</div>
           <div>Actualizado: ${loginCheck.usuario.updatedAt}</div>
           <div>Id: ${loginCheck.usuario._id}</div>
           `);
        }
    })
}*/

function init(){
    console.log("usuario");
    $("#info").click(info);
    $("#tusVideos").click(tusVideos);
}

$(document).ready(init);