const navMenu = document.querySelector('#mobile-nav');
const menuBtn = document.querySelector('#menu-btn')
const overlay = document.querySelector('.dim-bg');

const dialog = document.querySelector('#shopping-cart')
const cartBtn = document.querySelector('#cart-button');
const cartProducts = document.querySelector('#cart-product-container');
const checkoutBtn = document.querySelector('#checkout-button');
const prodCost = document.querySelector('#current-price');
const emptyMsg = document.querySelector('.header__cart-empty');

const slides = document.querySelectorAll('.main__gallery-img');

const quantity = document.querySelector('.main__quantity');
const minusQuantityBtn = document.querySelector('.main__quantity-minus');
const plusQuantityBtn = document.querySelector('.main__quantity-plus');
const addToCartBtn = document.querySelector('#add-to-cart');

let cartLength = 0
let deleteBtns;
let index = 0;
let quant = +quantity.innerText;


const toggleMenu = () => {
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

const updateCartUI = () => {
    if (cartLength > 0) {
        emptyMsg.setAttribute('hidden', '');
        checkoutBtn.removeAttribute('hidden')
        cartProducts.style.display = 'flex'
    }else {
        emptyMsg.removeAttribute('hidden');
        checkoutBtn.setAttribute('hidden', '')
        cartProducts.style.display = 'none'
    }
}

const deletesProductFromCart = (btn) => {
    btn.closest('.entry').remove()
    cartLength--
    updateCartUI()
}

const addsProductToCart = () => {
    let cost = +prodCost.innerText
    cartLength++

    cartProducts.innerHTML += 
    `<div class="entry">
        <img src="./images/image-product-1-thumbnail.jpg" alt="" class="header__cart-img">
        <div class="header__cart-labels">
        <p>Fall Limited Edition Sneakers</p>
        <p><span>$${cost}.00</span> x <span class="header__cart-quantity">${quant}</span><span class="header__cart-total tp3">$${(cost * quant)}.00</span></p>
        </div>
        <button class="header__cart-delete" onclick="deletesProductFromCart(this)"><img src="./images/icon-delete.svg" alt=""></button>
    </div>`


    updateCartUI()
}

menuBtn.addEventListener('click', () => {
    toggleMenu()
})

addToCartBtn.addEventListener('click', () => {
    addsProductToCart()
})
