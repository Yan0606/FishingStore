const url_initial = "http://localhost/E-commerceAPI-PHPpure/";

// Função para carregar as vendas
function carregarVendas() {
    $.ajax({
        method: "POST",
        url: url_initial + "sales/getall",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: function (response) {
            const vendas = response;
            const tabelaBody = document.querySelector("#tabela-venda tbody");
            tabelaBody.innerHTML = "";

            vendas.forEach(venda => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${venda.id}</td>
                <td>${venda.user_id}</td>
                <td>${venda.payment}</td>
                <td>R$ ${venda.total_price}</td>
                <td>
                    <button class="btn btn-info" onclick="toggleDetalhes(${venda.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            
            
                tabelaBody.appendChild(row);

                // Adicionar a div para os detalhes dos produtos da venda
                const detalhesDiv = document.createElement("div");
                detalhesDiv.id = `detalhes-produtos-${venda.id}`;
                detalhesDiv.className = "collapse";

                tabelaBody.appendChild(detalhesDiv);
            });
        },
        error: function (error) {
            alert("Erro ao carregar vendas: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

// Função para carregar os detalhes de uma venda específica
function carregarDetalhesVenda(vendaId) {
    $.ajax({
        method: "POST",
        url: url_initial + "salesproducts/getall",
        dataType: "json",
        data: JSON.stringify({ sales_id: vendaId }),
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: function (response) {
            const produtos = response.filter(produto => produto.sales_id === vendaId);
            const detalhesDiv = document.querySelector(`#detalhes-produtos-${vendaId}`);

            if (!detalhesDiv) {
                console.error(`Div para os detalhes da venda ${vendaId} não encontrada.`);
                return;
            }

            if (produtos.length === 0) {
                detalhesDiv.innerHTML = "Nenhum produto encontrado para esta venda.";
                return;
            }

            let detalhesHTML = `<div class="detalhes-venda">`;
            produtos.forEach(produto => {
                detalhesHTML += `
                    <div class="detalhes-produto">
                        <h4>Produto: ${produto.product_name}</h4>
                        <p><strong>Descrição:</strong> ${produto.product_description}</p>
                        <p><strong>Quantidade:</strong> ${produto.amount}</p>
                        <p><strong>Preço Unitário:</strong> R$ ${produto.product_value.toFixed(2)}</p>
                        <p><strong>Valor Total:</strong> R$ ${produto.product_sum_of_values.toFixed(2)}</p>
                    </div>
                `;
            });
            detalhesHTML += `</div>`;
            detalhesDiv.innerHTML = detalhesHTML;
        },
        error: function (error) {
            console.error("Erro ao carregar detalhes da venda:", error);
            alert("Erro ao carregar detalhes da venda: " + (error.responseJSON?.message || error.statusText));
        }
    });
}

function toggleDetalhes(vendaId) {
    const detalhesDiv = document.querySelector(`#detalhes-produtos-${vendaId}`);
    if (detalhesDiv.classList.contains('collapse')) {
        carregarDetalhesVenda(vendaId);
        detalhesDiv.classList.remove('collapse');
    } else {
        detalhesDiv.classList.add('collapse');
        detalhesDiv.innerHTML = ""; // Opcional: limpa o conteúdo
    }
}


// Carregar as vendas ao carregar a página
window.onload = carregarVendas;
