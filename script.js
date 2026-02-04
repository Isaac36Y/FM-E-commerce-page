const navMenu = document.querySelector('#mobile-nav');
const menuBtn = document.querySelector('#menu-btn')
const menuOverlay = document.querySelector('.dim-bg-menu');

const dialog = document.querySelector('#shopping-cart')
const cartBtn = document.querySelector('#cart-button');
const cartProducts = document.querySelector('#cart-product-container');
const checkoutBtn = document.querySelector('#checkout-button');
const prodCost = document.querySelector('#current-price');
const emptyMsg = document.querySelector('.header__cart-empty');
const cartQuantity = document.querySelector('.header__cart-button-quantity')

const slides = document.querySelectorAll('.main__gallery-img');
const lightboxOverlay = document.querySelector('.dim-bg-lightbox');
const gallery = document.querySelector('.main__gallery');

const pickedQuantity = document.querySelector('.main__quantity');
const minusQuantityBtn = document.querySelector('.main__quantity-minus');
const plusQuantityBtn = document.querySelector('.main__quantity-plus');
const addToCartBtn = document.querySelector('#add-to-cart');

let cartItems = []
let index = 0;
let quant = +pickedQuantity.innerText;


const toggleMenu = () => {
    const open = navMenu.classList.contains('open');
    navMenu.classList.toggle('open');
    if (!open) {
        navMenu.style.visibility = 'visible';
        menuBtn.setAttribute('aria-expanded', 'true');
        menuOverlay.removeAttribute('hidden')  
    }else {
        setTimeout(() => {
            navMenu.style.visibility = 'hidden';
        }, 300)
        menuBtn.setAttribute('aria-expanded', 'false');
        menuOverlay.setAttribute('hidden', '')
    }
}

const lightSelectedImage = (n) => {
    let thumbnails = document.querySelectorAll('.main__gallery-thumbnail')
    let thumbnail = document.querySelector(`#thumbnail-${n + 1}`)
    thumbnails.forEach(img => {
        if (img.classList.contains('selected-img')) {
            img.classList.remove('selected-img')
            img.setAttribute('aria-expanded', 'false')
        }
    })
    thumbnail.classList.add('selected-img')
    thumbnail.setAttribute('aria-expanded', 'true')
}

const showSlide = (n) => {
    slides.forEach((slide, i) => {
        slide.style.display = i === n ? 'block' : 'none'
    })
    lightSelectedImage(n)
}
showSlide(index)

const changeSlides = (n) => {
    index += n;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    showSlide(index);
}

const showLightbox = () => {
    const mediaSize = window.matchMedia('(min-width: 1130px)');
    
    if (!mediaSize.matches) {
        return 
    }else { 
        gallery.classList.add('lightbox');
        lightboxOverlay.removeAttribute('hidden');
    }
}

const closeLightbox = (e) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation()
     
    gallery.classList.remove('lightbox');
    lightboxOverlay.setAttribute('hidden', '');
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
    quant = Math.max(0, quant + n);
    quantity.innerText = quant;
    disableMinusBtn(quant);
}

const showError = () => {
    const errPop = document.querySelector('.main__error-container');
    const errMsg = document.querySelector('.main__error-message');

    errPop.classList.add('open');
    errPop.setAttribute('aria-hidden', 'false')
    errMsg.textContent = ""
    setTimeout(() => {
        errMsg.textContent = "Quantity must be over 0 to add item to cart"
    }, 50)
    setTimeout(() => {
        errPop.classList.remove('open');
        errPop.setAttribute('aria-hidden', 'true')
    }, 4000)
        
}

const showCartQuantity = () => {
    let totalQuant =+ cartItems.map(item => item.quantity).reduce((acc, currValue) => {return acc + currValue}, 0)

    if (totalQuant > 0) {
        cartQuantity.style.display = 'flex'
        cartQuantity.textContent = totalQuant 
    }else {
        cartQuantity.style.display = 'none'
        cartQuantity.textContent = totalQuant 
    }
}

const updateCartUI = () => {
    if (cartItems.length > 0) {
        emptyMsg.setAttribute('hidden', '');
        checkoutBtn.removeAttribute('hidden')
        cartProducts.style.display = 'flex'
    }else {
        emptyMsg.removeAttribute('hidden');
        checkoutBtn.setAttribute('hidden', '')
        cartProducts.style.display = 'none'
    }
    showCartQuantity()
}

const deletesProductFromCart = (btn) => {
    let productDiv = btn.closest('.entry');
    let id = Number(productDiv.getAttribute('product-id'))

    cartItems = cartItems.filter(item => item.id !== id)
    productDiv.remove()

    updateCartUI()
}

const addsProductToCart = () => {
    let cost = +prodCost.innerText

    if (quant === 0) {
        showError()
        return
    }else {
        cartProducts.innerHTML += 
        `<div class="entry" product-id="${cartItems.length + 1}">
            <img src="./images/image-product-1-thumbnail.jpg" alt="" class="header__cart-img">
            <div class="header__cart-labels">
            <p>Fall Limited Edition Sneakers</p>
            <p><span>$${cost}.00</span> x <span class="header__cart-quantity">${quant}</span><span class="header__cart-total tp3">$${(cost * quant)}.00</span></p>
            </div>
            <button class="header__cart-delete" onclick="deletesProductFromCart(this)"><img src="./images/icon-delete.svg" alt=""></button>
        </div>`
    }

    cartItems.push({ id: cartItems.length + 1, quantity: quant })

    updateCartUI()
}

menuBtn.addEventListener('click', () => {
    toggleMenu()
})

addToCartBtn.addEventListener('click', () => {
    addsProductToCart()
})


