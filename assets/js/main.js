'use strict'

const headerWrapper = document.querySelector('.header__wrapper')
const burger = document.querySelector('.burger')

burger.addEventListener('click', (evt) => {
    const logo = document.querySelector('#logo-main')
    if (logo) {
        let changeLogoSrc = logo.src.indexOf('light')
        changeLogoSrc != -1 ? logo.setAttribute('src', 'assets/images/logo-dark.png') : logo.setAttribute('src', 'assets/images/logo-light.png')
    }

    evt.target.classList.toggle('clicked')
    headerWrapper.classList.toggle('show')
})