// Função para carregar o cliente com base no ID
// Função para carregar o cliente com base no ID
function carregarCliente(id) {
    console.log(`Carregando cliente com ID: ${id}`);
    $.ajax({
        method: "GET",
        url: `http://localhost/E-commerceAPI-PHPpure/users/getall`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function (clientes) {
            console.log("Lista de clientes recebida:", clientes);

            if (Array.isArray(clientes)) {
                const cliente = clientes.find(c => c.id == id);

                if (cliente) {
                    $('#cliente-id').val(cliente.id); // Atualiza o ID do cliente corretamente
                    $('#nome').val(cliente.name);
                    $('#email').val(cliente.email);

                    // Se os campos created_at e updated_at forem necessários
                    $('#password').val(cliente.password); 
                    $('#created_at').val(cliente.created_at);
                    $('#updated_at').val(cliente.updated_at);

                    console.log("Cliente encontrado:", cliente);
                } else {
                    alert("Cliente não encontrado.");
                }
            } else {
                alert("Nenhum cliente encontrado ou resposta inválida.");
            }
        },
        error: function (error) {
            console.error("Erro ao carregar os clientes:", error);
            alert("Erro ao carregar os clientes: " + (error.responseJSON?.message || error.statusText));
        }
    });
}


// Função para enviar as alterações do cliente para a API
// Função para enviar as alterações do cliente para a API
function editarCliente() {
    const id = $('#cliente-id').val(); // Corrigido para 'cliente-id'
    const nome = $('#nome').val();
    const email = $('#email').val();
    const password = $('#password').val(); 
    const created_at = $('#created_at').val();
    const updated_at = $('#updated_at').val();

    const clienteAtualizado = {
        id: id,
        name: nome,
        email: email,
        password: password,
        created_at: created_at,
        updated_at: updated_at
    };

    console.log("Dados enviados para a API:", JSON.stringify(clienteAtualizado));

    $.ajax({
        method: "PUT",
        url: `http://localhost/E-commerceAPI-PHPpure/users/update/${id}`, // Corrigido para passar o ID
        contentType: "application/json",
        data: JSON.stringify(clienteAtualizado),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function (response) {
            console.log("Cliente atualizado com sucesso:", response);
            alert("Cliente atualizado com sucesso!");
        },
        error: function (error) {
            console.error("Erro ao atualizar o cliente:", error);
            alert("Erro ao atualizar o cliente: " + (error.responseJSON?.message || error.statusText));
        }
    });
}


// Adiciona um listener para o envio do formulário
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');
    if (clienteId) {
        carregarCliente(clienteId);
    }

    // Listener para o evento de envio do formulário de edição
    $('#form-editar-cliente').on('submit', function (e) {
        e.preventDefault(); 
        editarCliente(); 
    });
});
