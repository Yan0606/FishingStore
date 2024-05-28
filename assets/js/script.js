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

function limitarCaracteres(titulo, limite) {
    if (titulo.length > limite) {
        return titulo.substring(0, limite) + "...";
    } else {
        return titulo;
    }
}

$.ajax({
    method: "GET",
    url: url_initial + "products/getall",
    dataType: "JSON",
}).done(async function (response) {
    if (response.length > 0) {
        let imprimir = "";
        await $.each(response, function (i) {
            // Limita o número de caracteres no título e adiciona três pontos no final
            let tituloLimitado = limitarCaracteres(response[i].name, 25);
            let tituloLimitado2 = limitarCaracteres(response[i].description, 45); // Aqui você pode definir o limite de caracteres desejado
            imprimir += ` 
            <div class="card" >
                <div class="card-img">
                    <img src="${response[i].img_path}" alt="${tituloLimitado}">
                </div>
                <div class="card-title" title="${response[i].name}">
                    ${tituloLimitado}
                </div>
                <div class="card-subtitle">
                ${tituloLimitado2}
                </div>
            <hr class="card-divider">
            <div class="card-footer">
                <div class="card-price"><span>R$</span> ${response[i].value}</div>
                    <button class="card-btn">
                        <img src="assets/img/icons/carrinho-carrinho.png">
                    </button>
                </div>
            </div>
            </div>`;

        });
        products_div.innerHTML = imprimir;
        // localStorage.setItem("token", "uuid-ccrgkj31423rm-34wt,bi3bjk")
        ready();
    }
    else {
        products_div.innerHTML = "não há produtos!";
    }
}).fail(function (erro) {
    console.log(erro)
});

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
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');


    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/icons/menu-aberto.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/icons/x.png";
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



function ready() {
    var removeCar = document.querySelectorAll(".remove-trash");
    removeCar.forEach(function (button) {
        button.addEventListener("click", removeCarItem);
    });

    var quantityInputs = document.querySelectorAll(".car-quantity");
    quantityInputs.forEach(function (input) {
        input.addEventListener("change", quantityChanged);
    });

    // add to Car
    const addCard = document.querySelectorAll(".card-btn");
    for (let i = 0; i < addCard.length; i++) {
        addCard[i].addEventListener("click", () => {
            addCartClicked(addCard[i])
        })
    }
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonCLicked);
}

//buy button
function buyButtonCLicked() {
    var total = parseFloat(document.querySelector(".total-price").innerText.replace("R$ ", "").replace(",", "."));

    // Verifica se o total é 0
    if (total === 0) {
        alert('Seu carrinho está vazio!');
        return; // Sai da função se o carrinho estiver vazio
    }
    else {
        alert('Seu pedido foi enviado!')
        var cartCotent = document.getElementsByClassName('car-content')[0]
        while (cartCotent.hasChildNodes()) {
            cartCotent.removeChild(cartCotent.firstChild);
        }
    }
    updateTotal();
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

//add to cart
function addCartClicked(event) {
    let price = event.parentNode.getElementsByClassName("card-price")[0].textContent;
    let title = event.parentNode.parentNode.getElementsByClassName("card-title")[0].textContent;
    let productImg = event.parentNode.parentNode.getElementsByClassName("card-img")[0].querySelector("img").src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

// buy button word



function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('car-box')
    var cartItems = document.getElementsByClassName('car-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('car-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert("Você já tem esse item no carrinho!")
            return;
        }
    }

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="car-img">
        <div class="detail-box">
            <div class="car-product-title">${title}</div>
            <div class="car-product-price">${price}</div>
            <input type="number" value="1" class="car-quantity">
        </div>
        <!-- fecha a aba do carrinho --> 
        <p><img src="assets/img/icons/trash.png" class="remove-trash"></p>
`
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('remove-trash')[0].addEventListener('click', removeCarItem)
    cartShopBox.getElementsByClassName('car-quantity')[0].addEventListener('change', quantityChanged)
}



// atualizar
function updateTotal() {
    var carContent = document.querySelector(".car-content");
    var carBoxes = carContent.querySelectorAll(".car-box");
    var total = 0;

    carBoxes.forEach(function (carBox) {
        var priceElement = carBox.querySelector(".car-product-price");
        var quantityElement = carBox.querySelector(".car-quantity");

        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("R$ ", "").replace(",", "."));
            var quantity = parseInt(quantityElement.value);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    });

    // arredondar total para 2 casas decimais
    total = Math.round(total * 100) / 100;

    var totalPriceElement = document.querySelector(".total-price");
    if (totalPriceElement) {
        totalPriceElement.innerText = "R$ " + total.toFixed(2);
    }
}


//FIM CARRINHO DE COMPRA


//FIM DO MOBILE MENU