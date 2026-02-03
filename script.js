const navMenu = document.querySelector('#mobile-nav');
const menuBtn = document.querySelector('#menu-btn')
const overlay = document.querySelector('.dim-bg');

const dialog = document.querySelector('#shopping-cart')
const cartBtn = document.querySelector('#cart-button');
const cartProducts = document.querySelector('#cart-product-container');
const checkoutBtn = document.querySelector('#checkout-button');
<<<<<<< HEAD
const prodCost = document.querySelector('#current-price');
const emptyMsg = document.querySelector('.header__cart-empty');
=======
>>>>>>> refs/remotes/origin/main

const slides = document.querySelectorAll('.main__gallery-img');

const quantity = document.querySelector('.main__quantity');
const minusQuantityBtn = document.querySelector('.main__quantity-minus');
const plusQuantityBtn = document.querySelector('.main__quantity-plus');
const addToCartBtn = document.querySelector('#add-to-cart');


<<<<<<< HEAD
let cartLength = 0;
let deleteBtns = [];
let index = 0;
let quant = +quantity.innerText;

=======




let deleteBtns;
let index = 0;
let quant = +quantity.innerText;
let prodCost = document.querySelector('#current-price')
>>>>>>> refs/remotes/origin/main

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

<<<<<<< HEAD
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

const deletesProductFromCart = () => {
    deleteBtns = document.querySelectorAll('#delete-button')
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('div').remove()
            cartLength--
            updateCartUI()
        })
    })
}

const addsProductToCart = () => {
    let cost = +prodCost.innerText
    cartLength++
=======
const addsProductToCart = () => {
    let cost = +prodCost.innerText
    const emptyMsg = document.querySelector('.header__cart-empty');
    let empty = !emptyMsg.hasAttribute('hidden');
    if (empty) {
        emptyMsg.setAttribute('hidden', '');
        checkoutBtn.removeAttribute('hidden')
        cartProducts.style.display = 'flex'
    };

>>>>>>> refs/remotes/origin/main
    cartProducts.innerHTML += 
    `<div class="entry">
        <img src="./images/image-product-1-thumbnail.jpg" alt="" class="header__cart-img">
        <div class="header__cart-labels">
        <p>Fall Limited Edition Sneakers</p>
<<<<<<< HEAD
        <p><span>$${cost}.00</span> x <span class="header__cart-quantity">${quant}</span><span class="header__cart-total tp3">$${(cost * quant)}.00</span></p>
        </div>
        <button class="header__cart-delete" id="delete-button"><img src="./images/icon-delete.svg" alt=""></button>
    </div>`

    deletesProductFromCart()
    updateCartUI()
}


=======
        <p><span>${cost}</span> x <span class="header__cart-quantity">${quant}</span><span class="header__cart-total tp3">$${(cost * quant)}</span></p>
        </div>
        <button class="header__cart-delete" id="delete-button"><img src="./images/icon-delete.svg" alt=""></button>
    </div>`
}




/* const deletesProductFromCart = (btn) => {
    btn.closest(document.querySelector('.entry')).innerHTML = ``;
} */



>>>>>>> refs/remotes/origin/main
plusQuantityBtn.addEventListener('click', () => changeQuantity(1))
minusQuantityBtn.addEventListener('click', () => changeQuantity(-1))

menuBtn.addEventListener('click', () => {
    openMenu()
})

addToCartBtn.addEventListener('click', () => {
    addsProductToCart()
})

cartBtn.addEventListener('click', () => {
<<<<<<< HEAD
    dialog.hasAttribute('open') ? dialog.removeAttribute('open') : dialog.setAttribute('open', '')
=======
    dialog.style.display = dialog.style.display === 'none' ? 'flex' : 'none'
>>>>>>> refs/remotes/origin/main
})