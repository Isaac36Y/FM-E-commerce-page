const navMenu = document.querySelector('#mobile-nav');
const menuBtn = document.querySelector('#menu-btn')
const overlay = document.querySelector('.dim-bg');

menuBtn.addEventListener('click', () => {
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
    
    
})