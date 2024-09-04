const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

// Função para carregar os produtos do banco de dados
function carregarProdutos() {
    $.ajax({
        method: "GET",
        url: url_initial + "products/getall", // Endpoint para obter todos os produtos
        dataType: "json",
        success: function (response) {
            const produtos = response; // Supondo que a resposta seja um array de produtos
            const tabelaBody = document.querySelector("#tabela-produtos tbody");

            // Limpa o conteúdo anterior da tabela
            tabelaBody.innerHTML = "";

            // Popula a tabela com os produtos
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
            alert("Erro ao carregar produtos: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

// Funções de exemplo para editar e excluir produto
function editarProduto(id) {
    alert('Editar produto com ID: ' + id);
    // Aqui você pode adicionar o código para editar o produto
}

function excluirProduto(id) {
    if (confirm('Deseja realmente excluir o produto com ID: ' + id + '?')) {
        alert('Produto com ID ' + id + ' excluído');
        // Aqui você pode adicionar o código para excluir o produto
    }
}

window.onload = carregarProdutos;