function baixarRelatorioProdutos() {
    Swal.fire({
        title: 'Baixar Relatório',
        text: 'Escolha o formato do relatório que deseja baixar:',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'CSV',
        cancelButtonText: 'JSON',
        reverseButtons: true
    }).then((result) => {
        const formato = result.isConfirmed ? "csv" : "json";  
        $.ajax({
            method: "POST",
            url: url_initial + "products/getall",
            dataType: "json",
            data: JSON.stringify({ convert: formato }),
            success: function (produtos) {
                console.log(produtos.url);
                window.open(produtos.url, "_blank"); 
            },
            error: function (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: "Erro ao baixar relatório: " + (error.responseJSON?.message || error.statusText),
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });
}

// Adiciona o evento ao botão de download
document.getElementById("baixar").addEventListener("click", baixarRelatorioProdutos);

// Carregar os produtos na página ao inicializar
window.onload = carregarProdutos;
