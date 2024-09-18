function deletarProduto(id) {
    if (!id) {
        alert("ID do produto não fornecido.");
        return;
    }

    if (confirm("Tem certeza de que deseja excluir este produto?")) {
        $.ajax({
            method: "DELETE", 
            url: `http://localhost/E-commerceAPI-PHPpure/products/delete/${id}`, 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            success: function (response) {
                console.log("Produto excluído com sucesso:", response);
                alert("Produto excluído com sucesso!");
            },
            error: function (error) {
                console.error("Erro ao excluir o produto:", error);
                alert("Erro ao excluir o produto: " + (error.responseJSON?.message || error.statusText));
            }
        });
    }
}

// Listener para o botão de excluir produto
$(document).ready(function () {
    $('#btn-excluir-produto').on('click', function () {
        const produtoId = $('#produto-id').val();
        deletarProduto(produtoId); // Chama a função para deletar o produto
    });
});
