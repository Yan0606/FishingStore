const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

function carregarProdutos() {
    $.ajax({
        method: "GET",
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
            alert("Erro ao carregar produtos: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

function editarProduto(id) {
    window.location.href = `editarProduto.html?id=${id}`;
}

function excluirProduto(id) {
    if (confirm('Deseja realmente excluir o produto com ID: ' + id + '?')) {
        alert('Produto com ID ' + id + ' excluído');
        // futuro código de exclusão    
    }
}

window.onload = carregarProdutos;