// ====REQUISIÇÃO DA API ====

let url_initial = "http://localhost/E-commerceAPI-PHPpure/";
const products_div = document.getElementById("products");
let shopping_cart = [];

function limitarCaracteres(titulo, limite) {
    if (titulo.length > limite) {
        return titulo.substring(0, limite) + "...";
    } else {
        return titulo;
    }
}

function aplicarDesconto() {
    const couponInput = document.querySelector(".coupon");
    const totalPriceElement = document.querySelector(".total-price");

    // Pega o valor total atual
    let totalPrice = parseFloat(totalPriceElement.textContent);

    if (couponInput.value.toUpperCase() === "CORINTHANS") {
        // Calcula o desconto
        const desconto = (totalPrice * 0.5).toFixed(2);
        const discountedPrice = (totalPrice - desconto).toFixed(2);

        // Atualiza o texto com o desconto e o novo valor
        totalPriceElement.textContent = `${discountedPrice} (Desconto: R$ ${desconto})`;

        alert("Cupom aplicado! Você ganhou 50% de desconto!");
    } else {
        alert("Cupom inválido.");
    }

    couponInput.value = "";
}

// Adiciona o evento de clique ao botão de compra
document.querySelector(".btn-buy").addEventListener("click", aplicarDesconto);

$.ajax({
    method: "POST",
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
                <input type='hidden' name='id' value='${response[i].id}'>
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
                <div class="card-price" title="${response[i].value}"><span>R$</span> ${response[i].value}</div>
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
        let full_card = addCard[i].parentNode.parentNode;
        addCard[i].addEventListener("click", () => {
            let id = full_card.querySelector("[name='id']").value;
            addCartClicked(addCard[i], id);
            let name = full_card.querySelector(".card-title").getAttribute("title");
            let price = full_card.querySelector(".card-price").getAttribute("title");

        })
    }
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonCLicked);
}

//buy button
function buyButtonCLicked() {
    var total = parseFloat(document.querySelector(".total-price").innerText.replace("R$ ", "").replace(",", "."));


    function finalizarVenda(id)
    {
        let payment = [
            "Pix",
            "Débito",
            "Crédito",
            "Boleto Bancário",
            "Cheque"
        ];

        console.log("funcionou venda")
        const random_index = Math.floor(Math.random() * payment.length);

        let data = {
            sales_id: id,
            payment: payment[random_index]
        }
        $.ajax({
            method: "POST",
            url: url_initial + "sales/end",
            data: JSON.stringify(data),
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')  // Corrigido para Authorization e getItem
            }
        })
        .done((resp) => {
            console.log(resp.message)
            if(resp.status == 400)
            {
                alert("sem token!")
            }
        })
        .fail((e) => {
            console.log(e)
            alert(e.responseJSON.message);
        })
    }

    // Verifica se o total é 0
    if (total === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    else {
        let data = {
            user_id: localStorage.getItem("id")
        };
        $.ajax({
            method: "POST",
            url: url_initial + "sales/init",
            data: JSON.stringify(data),
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')  // Corrigido para Authorization e getItem
            }
        }).done(async function (response) {
            let sales_id = response.id;
            console.log("id da venda = " + sales_id);
            alert('Seu pedido foi enviado!');
            let cart = document.querySelectorAll(".car-box");

            for (let i = 0; i < cart.length; i++) {
                let id = cart[i].querySelector("[name='id']").getAttribute("data-id");
                let quantity = cart[i].querySelector("[name='qtd']").value;
                let sales_item = {
                    sales_id,
                    product_id: id,
                    amount: quantity
                }
                await $.ajax({
                    url: url_initial + "salesproducts/insert",
                    method: "POST",
                    data: JSON.stringify(sales_item),
                    dataType: "JSON",
                    contentType: "application/json; charset=utf-8",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')  // Corrigido para Authorization e getItem
                    }
                }).done(async function (response) {
                    console.log("INSERIU ITEM DE VENDA, N- DA VEZ = " + i);
                }).fail(async function (err) {
                    alert("ERRO = " + err);
                })
            }

            await finalizarVenda(sales_id);

        }).fail(function (error) {
            alert(error.responseJSON.message);
        })
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
function addCartClicked(event, id) {
    let price = event.parentNode.getElementsByClassName("card-price")[0].textContent;
    let title = event.parentNode.parentNode.getElementsByClassName("card-title")[0].textContent;
    let productImg = event.parentNode.parentNode.getElementsByClassName("card-img")[0].querySelector("img").src;

    addProductToCart(title, price, productImg, id);
    updateTotal();
}

// buy button word



function addProductToCart(title, price, productImg, id) {
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
            <input type='hidden' name='id' data-id='${id}'>
            <div class="car-product-title">${title}</div>
            <div class="car-product-price">${price}</div>
            <input type="number" value="1" name="qtd" class="car-quantity">
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
var template1 = document.getElementById('slider1');
var template2 = document.getElementById('slider2');
var template3 = document.getElementById('slider3');
var auxi = 1;

function nextSlider() {
    if (auxi == 1) {

        template2.classList.remove('sairE');
        template2.classList.remove('sairD');
        template2.classList.add('puxarD');
        template2.style.left = '0%';

        template1.classList.add('sairE');
        template1.style.left = '-100%';
        template3.style.left = '100%';

        auxi = 2;
    }
    else if (auxi == 2) {

        template3.classList.remove('sairE');
        template3.classList.remove('sairD');
        template3.classList.add('puxarD');
        template3.style.left = '0%';

        template2.classList.remove('puxarD');
        template2.classList.add('sairE');

        template2.style.left = '-100%';
        template1.style.left = '100%'

        auxi = 3;
    }
    else if (auxi == 3) {
        template3.classList.remove('puxarE')
        template3.classList.remove('puxarD');
        template3.classList.add('sairE');
        template3.style.left = '-100%';

        template1.classList.remove('sairD');
        template1.classList.remove('sairE');
        template1.classList.add('puxarD');
        template1.style.left = '0%';

        template2.style.left = '100%';

        auxi = 1;
    }

    // console.log('workNext');
}

var autoNext = setInterval(nextSlider, 5500);

// const click = document.querySelector('#next');

// click.addEventListener('click', function(){
//     fundo.style.backgroundColor= 'white';
//     clearInterval(autoNext);
//     setTimeout(function(){

//     setTimeout(function(){
//         var autoNext2 = setInterval(nextSlider, 1000);
//     }, 2000);

// });


function backSlider() {

    if (auxi == 1) {

        template3.classList.remove('sairD');
        template3.classList.remove('sairE');
        template3.classList.remove('puxarD');
        template3.classList.add('puxarE');
        template3.style.left = '0%';

        template1.classList.remove('puxarD');
        template1.classList.remove('puxarE');
        template1.classList.remove('sairE');
        template1.classList.add('sairD');
        template1.style.left = '100%';

        template2.style.left = '-100%';

        auxi = 3;
    }
    else if (auxi == 2) {
        template1.classList.remove('sairE');
        template1.classList.remove('sairD');
        template1.classList.remove('puxarD');
        template1.classList.add('puxarE');
        template1.style.left = '0%';

        template2.classList.remove('puxarE');
        template2.classList.remove('sairE');
        template2.classList.remove('puxarD');
        template2.classList.add('sairD');
        template2.style.left = '100%';

        template3.style.left = '-100%';
        auxi = 1;
    }
    else if (auxi == 3) {
        template2.classList.remove('sairE');
        template2.classList.remove('puxarD');
        template2.classList.remove('sairD');
        template2.classList.add('puxarE');
        template2.style.left = '0%';

        template3.classList.remove('puxarE');
        template3.classList.remove('puxarD');
        template3.classList.add('sairD');
        template3.style.left = '100%';

        template1.style.left = '-100%';

        auxi = 2;
    }
}

const fundo = document.querySelector('#apresentacao');