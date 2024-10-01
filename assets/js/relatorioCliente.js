const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

function carregarUsuarios() {
    console.log("Iniciando a requisição...");
    $.ajax({
        method: "GET",
        url: url_initial + "users/getall",
        dataType: "json",
        success: function (response) {
            console.log("Resposta recebida:", response);
            const usuarios = response;
            const tabelaBody = document.querySelector("#tabela-usuarios tbody");
            tabelaBody.innerHTML = "";

            usuarios.forEach(usuario => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.name}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.password}</td>
                    <td>
                        <button class="btn btn-edit" onclick="editarusuario(${usuario.id})">Editar</button>
                        <button class="btn btn-delete" onclick="excluirusuario(${usuario.id})">Excluir</button>
                    </td>
                `;

                tabelaBody.appendChild(row);
            });
        },
        error: function (error) {
            console.error("Erro ao carregar usuarios:", error);
            alert("Erro ao carregar usuarios: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

window.onload = carregarUsuarios;