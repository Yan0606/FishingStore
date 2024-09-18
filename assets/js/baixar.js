function baixarRelatorioProdutos() {
    const escolhaCSV = confirm("Deseja baixar o relatório em CSV? Se escolher 'Cancelar', o download será em JSON.");
    const formato = escolhaCSV ? "csv" : "json";

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
            alert("Erro ao baixar relatório: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

document.getElementById("baixar").addEventListener("click", baixarRelatorioProdutos);

window.onload = carregarProdutos;
