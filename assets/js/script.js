// ====REQUISIÇÃO DA API ====

let url_initial = "http://localhost:8080/";
const products_div = document.getElementById("products");

$.ajax({
    method: "GET",
    url: url_initial + "products/getall",
    dataType: "JSON",
}).done(function (response) {
    if(response.length > 0){
        let imprimir = "";
        $.each(response, function(i){
            imprimir += ` 
            <div class="card">
                <div class="card-img">
                    <img src="assets/img/carretilha.png">
                </div>
                <div class="card-title">
                    ${response[i].name}
                </div>
                <div class="card-subtitle">
                    ${response[i].description}
                </div>
            <hr class="card-divider">
            <div class="card-footer">
                <div class="card-price"><span>R$</span> ${response[i].value}</div>
                    <button class="card-btn">
                        <img src="assets/img/icons/carrinho-carrinho.png">
                    </button>
                </div>
            </div>`;
           
        });
        products_div.innerHTML = imprimir;
        // localStorage.setItem("token", "uuid-ccrgkj31423rm-34wt,bi3bjk")
    }
    else{
        products_div.innerHTML = "não há produtos!";
    }

  
}).fail(function (erro) {
    console.log(erro)
})

// ====FIM DA REQUISIÇÃO ====


// ====SEARCH BAR ====
var input = document.getElementById("searchInput");
input.addEventListener("input", filterCards);

function filterCards() {
    var filter, cards, card, title, i, txtValue;
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("card");

    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        title = card.querySelector(".card-title");
        txtValue = title.textContent || title.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}
// FIM DA SEARCH BAR

function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');


if (menuMobile.classList.contains('open')){
    menuMobile.classList.remove('open');
    document.querySelector('.icon').src = "assets/img/icons/menu-aberto.png";
}else{
    menuMobile.classList.add('open');
    document.querySelector('.icon').src= "assets/img/icons/x.png";
}

}