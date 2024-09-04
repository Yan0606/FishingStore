const accessToken = "token"; // Substituir por um token válido

function carregarProduto(id) {
    console.log(`Carregando produto com ID: ${id}`);
    $.ajax({
        method: "GET",
        url: `${url_initial}products/get/${id}`,
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${accessToken}` 
        },
        success: function (produto) {
            console.log("Dados do produto recebidos:", produto);
            if (produto && produto.id) {
                $('#produto-id').val(produto.id);
                $('#nome').val(produto.name);
                $('#descricao').val(produto.description);
                $('#preco').val(produto.value);
                $('#quantidade').val(produto.amount);
            } else {
                alert("Produto não encontrado ou dados inválidos.");
            }
        },
        error: function (error) {
            console.error("Erro ao carregar o produto:", error);
            alert("Erro ao carregar o produto: " + (error.responseJSON?.message || error.statusText));
        }
    });
}
