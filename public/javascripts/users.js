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

function tusVideos(){
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck);
        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }
        else{
            $.get(`/api/user/videos/${loginCheck.usuario._id}`, function(videos){
                var videos = videos;
                console.log(videos);
                $("#contenidoUsuario").html("");
                for (const video of videos) {
                    $("#contenidoUsuario").append(`
                    <div>Id: ${video._id}</div>
                    <h4>Titulo ${video.titulo}</h4>
                    <div>Descripcion: ${video.descripcion}</div>
                    <div><a href='http://localhost:3000/${video.url}'>Ver video</a></div>
                    `)
                }
            })
        }
    })
}

function init(){
    console.log("usuario");
    $("#info").click(info);
    $("#tusVideos").click(tusVideos);
}

$(document).ready(init);