function deletarUsuario(id) {
    if (!id) {
        alert("ID do usuário não fornecido.");
        return;
    }

    if (confirm("Tem certeza de que deseja excluir este usuário?")) {
        $.ajax({
            method: "DELETE", 
            url: `http://localhost/E-commerceAPI-PHPpure/users/delete/${id}`, 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            success: function (response) {
                console.log("Usuário excluído com sucesso:", response);
                alert("Usuário excluído com sucesso!");
            },
            error: function (error) {
                console.error("Erro ao excluir o usuário:", error);
                alert("Erro ao excluir o usuário: " + (error.responseJSON?.message || error.statusText));
            }
        });
    }
}

// Listener para o botão de excluir usuario
$(document).ready(function () {
    $('#btn-excluir-usuario').on('click', function () {
        const usuarioId = $('#usuario-id').val();
        deletarUsuario(usuarioId); // Chama a função para deletar o usuario
    });
});
