const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

// Função para carregar os produtos na tabela
function carregarProdutos() {
    $.ajax({
        method: "POST",
        url: url_initial + "products/getall",
        dataType: "json",
        success: function (response) {
            const produtos = response;
            const tabelaBody = document.querySelector("#tabela-produtos tbody");
            tabelaBody.innerHTML = "";

            produtos.forEach(produto => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.name}</td>
                    <td>${produto.description}</td>
                    <td>R$ ${produto.value.toFixed(2)}</td>
                    <td>${produto.amount}</td>
                    <td><img src="${produto.img_path}" alt="${produto.name}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button class="btn btn-edit" onclick="editarProduto(${produto.id})">Editar</button>
                        <button class="btn btn-delete" onclick="excluirProduto(${produto.id})">Excluir</button>
                    </td>
                `;

                tabelaBody.appendChild(row);
            });
        },
        error: function (error) {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao carregar produtos: ' + (error.responseJSON?.message || error.statusText),
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    });
}

function editarProduto(id) {
    window.location.href = `editarProduto.html?id=${id}`;
}

function excluirProduto(id) {
    // Usar SweetAlert2 para confirmar a exclusão
    Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja realmente excluir o produto com ID: ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmar, faz a requisição DELETE
            $.ajax({
                method: "DELETE", 
                url: url_initial + "products/delete/" + id, 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                success: function (response) {
                    Swal.fire({
                        title: 'Excluído!',
                        text: 'Produto excluído com sucesso!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    });
                    carregarProdutos(); // Recarregar a lista de produtos após a exclusão
                },
                error: function (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao excluir o produto: ' + (error.responseJSON?.message || error.statusText),
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            });
        }
    });
}

window.onload = carregarProdutos;
