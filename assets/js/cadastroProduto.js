let url_initial = "http://localhost/E-commerceAPI-PHPpure/";

function CadastrarProduto() {
    let name1 = document.getElementById("name1").value;
    let description = document.getElementById("description").value;
    let value = document.getElementById("value").value;
    let amount = document.getElementById("amount").value;
    let img_path = document.getElementById("img_path").value;

    let data = {
        name: name1,
        description: description,
        value: value,
        amount: amount,
        img_path: img_path,
    };

    $.ajax({
        method: "POST",
        url: url_initial + "products/insert",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')  // Corrigido para Authorization e getItem
        }
    }).done(async function (response) {
        alert(response.message);
        document.getElementById("name1").value = "";
        document.getElementById("description").value = "";
        document.getElementById("value").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("img_path").value = "";
    }).fail(function (error) {
        alert(error.responseJSON.message);
    });
}
