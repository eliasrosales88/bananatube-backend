function veALogin(){
    window.location.href = "/login";
}

function veAPerfil(){
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck.usuario);

        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }else{
            $.get(`/api/perfil/${loginCheck.usuario._id}`, function(usuario){
                console.log(usuario);
            });
            //window.location.href = `/perfil/${loginCheck.usuario._id}`;
            //console.log(loginCheck);
        }
    })
}
function registro(evento){
    evento.preventDefault();
    var datosRegistro = {};
    var username = $("#username").val();
    var email = $("#email").val();
    var pass = $("#pass").val();
    datosRegistro.username = username;
    datosRegistro.email = email;
    datosRegistro.pass = pass;
    console.log(datosRegistro);

    $.post("/api/registro",datosRegistro,veALogin)
}

function login(evento){
    evento.preventDefault();
    var datosLogin = {};
    var username = $("#username").val();
    var pass = $("#pass").val();
    datosLogin.username = username;
    datosLogin.pass = pass;
    console.log("Datos login", datosLogin);

    $.post("/api/login",datosLogin,veAPerfil)
}

function subirVideo(evento){
    evento.preventDefault();
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck);
        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }
        else{
            var video = {};
             video.titulo = $("#tituloVideo").val();
             console.log(video.titulo);
             video.descripcion = $("#descripcion").val();
             video.url = $("#url").val();
             video.autor = loginCheck.usuario._id;
             video.activo = $("#activo").val();
             console.log(video);

            $.post("/api/subirVideo",video, function(datosVideo){
                var datosVideo = datosVideo;
                console.log(datosVideo);
            })
        }
    })
}

function irAPerfil(){
    $.get("/api/loginCheck", function(log){
        var loginCheck = log;
        console.log(loginCheck);
        if (loginCheck.login === false) {
            window.location.href = `/login`;
        }
        else{
            window.location.href = `/users/${loginCheck.usuario._id}`;
        }
    })
}

function init(){
    console.log("DOM cargado");
    $("#botonRegistro").click(registro);
    $("#botonLogin").click(login);
    $("#perfil").click(irAPerfil);

    if (location.href.match(/http:|localhost.*:3000|videos/)) {
        $.get("/api/videos", function(videos){
            var allVideos = videos;
            console.log(allVideos)
            for (const video of allVideos) {
                $("#contenidoVideos").append(`
                <div>${video.titulo}</div>
                <div>${video.descripcion}</div>
                <div>${video.autor}</div>
                <div>${video.url}</div>
                <video width="320" height="240" controls>
                <source src="${video.url}" type="video/mp4">
                </video>
                </hr>
                `)
            } 
        })
    }

}

$(document).ready(init);