const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

function CadastrarUsuario(){
    let name1 = document.getElementById("name1").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let  data= {
        name: name1,
        email: email,
        password: password
    }; 

    if(!name1 || name1.length < 5){
        alert("campo não existe ou é pequeno demais");
        return;
    }


    $.ajax({
        method: "POST",
        url: url_initial + "users/add",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
    }).done(async function (response) {
        alert(response.message);
        document.getElementById("name1").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }).fail(function (error) {
        alert(error.responseJSON.message);
    })
}