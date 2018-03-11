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
    var pass = $("#pass").val();
    datosRegistro.username = username;
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


function init(){
    console.log("DOM cargado");
    $("#botonRegistro").click(registro);
    $("#botonLogin").click(login);

}

$(document).ready(init);