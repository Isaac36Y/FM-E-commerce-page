const navMenu = document.querySelector('#mobile-nav');
const menuBtn = document.querySelector('#menu-btn')
const overlay = document.querySelector('.dim-bg');

const dialog = document.querySelector('#shopping-cart')
const cartBtn = document.querySelector('#cart-button');
const cartProducts = document.querySelector('#cart-product-container');
const checkoutBtn = document.querySelector('#checkout-button');

const slides = document.querySelectorAll('.main__gallery-img');

const quantity = document.querySelector('.main__quantity');
const minusQuantityBtn = document.querySelector('.main__quantity-minus');
const plusQuantityBtn = document.querySelector('.main__quantity-plus');
const addToCartBtn = document.querySelector('#add-to-cart');






let deleteBtns;
let index = 0;
let quant = +quantity.innerText;
let prodCost = document.querySelector('#current-price')

const openMenu = () => {
    let open = navMenu.classList.contains('open');
    navMenu.classList.toggle('open');
    if (!open) {
        navMenu.style.visibility = 'visible';
        menuBtn.setAttribute('aria-expanded', 'true');
          overlay.removeAttribute('hidden')  
    }else {
        setTimeout(() => {
            navMenu.style.visibility = 'hidden';
        }, 300)
        menuBtn.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('hidden', '')
    }
}

const showSlide = (n) => {
    slides.forEach((slide, i) => {
        slide.style.display = i === n ? 'block' : 'none'
    })
}
showSlide(index)

const changeSlides = (n) => {
    index += n;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    showSlide(index);
}

const disableMinusBtn = (n) => {
    if (n === 0) {
        minusQuantityBtn.setAttribute('disabled', '');
        minusQuantityBtn.setAttribute('aria-disabled', 'true');
        minusQuantityBtn.classList.add('disabled');
    }else {
        minusQuantityBtn.removeAttribute('disabled');
        minusQuantityBtn.setAttribute('aria-disabled', 'false');
        minusQuantityBtn.classList.remove('disabled');
    }
}

const changeQuantity = (n) => {
    quant += n;
    quantity.innerText = quant;
    disableMinusBtn(quant);
}

const addsProductToCart = () => {
    let cost = +prodCost.innerText
    const emptyMsg = document.querySelector('.header__cart-empty');
    let empty = !emptyMsg.hasAttribute('hidden');
    if (empty) {
        emptyMsg.setAttribute('hidden', '');
        checkoutBtn.removeAttribute('hidden')
        cartProducts.style.display = 'flex'
    };

    cartProducts.innerHTML += 
    `<div class="entry">
        <img src="./images/image-product-1-thumbnail.jpg" alt="" class="header__cart-img">
        <div class="header__cart-labels">
        <p>Fall Limited Edition Sneakers</p>
        <p><span>${cost}</span> x <span class="header__cart-quantity">${quant}</span><span class="header__cart-total tp3">$${(cost * quant)}</span></p>
        </div>
        <button class="header__cart-delete" id="delete-button"><img src="./images/icon-delete.svg" alt=""></button>
    </div>`
}




/* const deletesProductFromCart = (btn) => {
    btn.closest(document.querySelector('.entry')).innerHTML = ``;
} */



plusQuantityBtn.addEventListener('click', () => changeQuantity(1))
minusQuantityBtn.addEventListener('click', () => changeQuantity(-1))

menuBtn.addEventListener('click', () => {
    openMenu()
})

addToCartBtn.addEventListener('click', () => {
    addsProductToCart()
})

cartBtn.addEventListener('click', () => {
    dialog.style.display = dialog.style.display === 'none' ? 'flex' : 'none'
})