
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