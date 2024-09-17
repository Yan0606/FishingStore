// Função para carregar o produto com base no ID
function carregarProduto(id) {
    console.log(`Carregando produto com ID: ${id}`);
    $.ajax({
        method: "POST",
        url: `http://localhost/E-commerceAPI-PHPpure/products/getall`,
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function (produtos) {
            console.log("Lista de produtos recebida:", produtos);

            if (Array.isArray(produtos)) {
                const produto = produtos.find(p => p.id == id);

                if (produto) {
                    $('#produto-id').val(produto.id);
                    $('#nome').val(produto.name);
                    $('#descricao').val(produto.description);
                    $('#preco').val(produto.value);
                    $('#quantidade').val(produto.amount);

                    // Campos ocultos para img_path, created_at e updated_at
                    $('#img_path').val(produto.img_path); // Armazena o img_path
                    $('#created_at').val(produto.created_at); // Armazena created_at
                    $('#updated_at').val(produto.updated_at); // Armazena updated_at

                    console.log("Produto encontrado:", produto);
                } else {
                    alert("Produto não encontrado.");
                }
            } else {
                alert("Nenhum produto encontrado ou resposta inválida.");
            }
        },
        error: function (error) {
            console.error("Erro ao carregar os produtos:", error);
            alert("Erro ao carregar os produtos: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

// Função para enviar as alterações do produto para a API
function editarProduto() {
    const id = $('#produto-id').val();
    const nome = $('#nome').val();
    const descricao = $('#descricao').val();
    const preco = $('#preco').val();
    const quantidade = $('#quantidade').val();

    // Captura os campos ocultos
    const img_path = $('#img_path').val();
    const created_at = $('#created_at').val();
    const updated_at = $('#updated_at').val();

    // Cria um objeto com os dados atualizados do produto
    const produtoAtualizado = {
        id: id,
        name: nome,
        description: descricao,
        value: parseFloat(preco), // Converte o preço para número decimal
        amount: parseInt(quantidade),
        img_path: img_path, // Inclui img_path no envio
        created_at: created_at, // Inclui created_at no envio
        updated_at: updated_at // Inclui updated_at no envio
    };

    // Exibe os dados enviados para a API para depuração
    console.log("Dados enviados para a API:", JSON.stringify(produtoAtualizado));

    // Faz a requisição para atualizar o produto na API
    $.ajax({
        method: "PUT", // Método PUT para atualização
        url: `http://localhost/E-commerceAPI-PHPpure/products/update/${id}`, // Rota de atualização
        contentType: "application/json", // Envia os dados como JSON
        data: JSON.stringify(produtoAtualizado), // Converte o objeto em string JSON
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function (response) {
            console.log("Produto atualizado com sucesso:", response);
            alert("Produto atualizado com sucesso!");
        },
        error: function (error) {
            console.error("Erro ao atualizar o produto:", error);
            alert("Erro ao atualizar o produto: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

// Função para excluir o produto
function deletarProduto(id) {
    if (!id) {
        alert("ID do produto não fornecido.");
        return;
    }

    if (confirm("Tem certeza de que deseja excluir este produto?")) {
        $.ajax({
            method: "DELETE", // Método DELETE para exclusão
            url: `http://localhost/E-commerceAPI-PHPpure/products/delete/${id}`, // Endpoint da API para exclusão
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Cabeçalho com o token de autenticação
            },
            success: function (response) {
                console.log("Produto excluído com sucesso:", response);
                alert("Produto excluído com sucesso!");
                window.location.href = '/lista-de-produtos'; // Altere para a página de listagem de produtos
            },
            error: function (error) {
                console.error("Erro ao excluir o produto:", error);
                alert("Erro ao excluir o produto: " + (error.responseJSON?.message || error.statusText));
            }
        });
    }
}

// Adiciona um listener para o envio do formulário
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
    if (produtoId) {
        carregarProduto(produtoId);
    }

    // Listener para o evento de envio do formulário de edição
    $('#form-editar-produto').on('submit', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        editarProduto(); // Chama a função para editar o produto
    });

    // Listener para o botão de excluir produto
    $('#btn-excluir-produto').on('click', function () {
        const produtoId = $('#produto-id').val();
        deletarProduto(produtoId); // Chama a função para deletar o produto
    });
});
