let url_initial = "http://localhost/E-commerceAPI-PHPpure/";

function enviarFormulario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        localStorage.setItem("token", response.token); // adiciona token ao localStorage
        localStorage.setItem("id", response.id); // adiciona id ao localStorage
        const token = localStorage.getItem("token"); // pega o token do localStorage
        console.log("TOKEN NO LOCAL STORAGE =>" + token); // exibe o token no console, só pra conferir :)

        // Verifica se o login é do administrador
        if (email === "yanADM@gmail.com" && password === "12345678") {
            window.location.href = "../pages/admin.html"; // redireciona para a página de administrador
        } else {
            window.location.href = "../index.html"; // redireciona para a página normal
        }

    }).fail(function (error) {
        alert(error.responseJSON.message);
    });
}
