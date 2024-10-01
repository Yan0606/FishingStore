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
                        <button class="btn btn-edit" onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button class="btn btn-delete" onclick="excluirUsuario(${usuario.id})">Excluir</button>
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

function editarUsuario(id) {
    window.location.href = `editarUsuario.html?id=${id}`;
}

function excluirUsuario(id) {
    if (confirm('Deseja realmente excluir o usuario com ID: ' + id + '?')) {
        $.ajax({
            method: "DELETE", 
            url: url_initial + "users/delete/" + id, 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            success: function (response) {
                alert('Usuário excluído com sucesso!');
                carregarUsuarios(); // Recarregar a lista de usuários após a exclusão
            },
            error: function (error) {
                console.error("Erro ao excluir o usuário:", error);
                alert("Erro ao excluir o usuario: " + (error.responseJSON?.message || error.statusText));
            }
        });
    }
}

window.onload = carregarUsuarios;