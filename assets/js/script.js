// ====REQUISIÇÃO DA API ====

let url_initial = "http://localhost:8080/";
const products_div = document.getElementById("products");
// const form = document.getElementById("form");


// function CadastrarUsuario()
// {
//     let nome = document.getElementById("name");
//     let senha = document.getElementById("password");
//     let email = document.getElementById("email");

//     console.log("name = "+nome.value)
//     console.log("senha = "+senha.value)
//     console.log("email = "+email.value)


//     $.ajax({
//         method:"POST",
//         url: url_initial + "users/insert",
//         dataType: "JSON",
//         data:{
//             name: nome.value,
//             email: email.value,
//             password: senha.value
//         }
//     }).done(function (response) {
//         console.log(response);
//     }).fail(function(erro){
//         console.log(erro)
//     })
// }


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
                    <img src="${response[i].img_path}" alt="${response[i].name}">
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
   
//MOBILE-MENU
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

//CARRINHO DE COMPRA

let carIcon = document.querySelector('#car-icon'); 
let car = document.querySelector('.car');
let closeCar = document.querySelector('#close-car');

carIcon.onclick = () => {
    car.classList.add("active")
};

closeCar.onclick = () => {
    car.classList.remove("active")
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCar = document.querySelectorAll(".remove-trash");
    removeCar.forEach(function(button) {
        button.addEventListener("click", removeCarItem);
    });

    var quantityInputs = document.querySelectorAll(".car-quantity");
    quantityInputs.forEach(function(input) {
        input.addEventListener("change", quantityChanged);
    });
}

// remover items do carrinho
function removeCarItem(event) {
    var buttonClicked = event.target;
    var carBox = buttonClicked.closest(".car-box");
    carBox.remove(); // removendo elemento pai
    updateTotal();
}

// quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// atualizar
function updateTotal() {
    var carContent = document.querySelector(".car-content");
    var carBoxes = carContent.querySelectorAll(".car-box");
    var total = 0;

    carBoxes.forEach(function(carBox) {
        var priceElement = carBox.querySelector(".car-product-price");
        var quantityElement = carBox.querySelector(".car-quantity");
        
        if(priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("R$ ", "").replace(",", "."));
            var quantity = parseInt(quantityElement.value);

            if(!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    });

    // arredondar total para 2 casas decimais
    total = Math.round(total * 100) / 100;

    var totalPriceElement = document.querySelector(".total-price");
    if(totalPriceElement) {
        totalPriceElement.innerText = "R$ " + total.toFixed(2);
    }
}


//FIM CARRINHO DE COMPRA


//FIM DO MOBILE MENU