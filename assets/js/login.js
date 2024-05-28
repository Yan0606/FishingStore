let url_initial = "http://localhost:8080/";

function enviarFormulario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Fazer verificação dos campos
    const data = {
        email: email,
        password: password
    };

    $.ajax({
        method: "POST",
        url: url_initial + "users/signin",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
    }).done(async function (response) {
        alert(response.message);
        localStorage.setItem("token", response.token); // adiciona token ao banco de dados do navegador
        const token = localStorage.getItem("token"); //pega o token do banco de dados do navegador
        console.log("TOKEN NO LOCAL STORAGE =>"+token); //exibe o token no console, só pra conferir :)
        window.location.href = "../index.html";
    }).fail(function (error) {
        alert(error.responseJSON.message);
    })


}