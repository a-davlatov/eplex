'use strict'

const headerWrapper = document.querySelector('.header__wrapper')
const burger = document.querySelector('.burger')

// Before/After images effect
function beforeAfter() {
    document.getElementById('kobavenusab').style.width = document.getElementById('pedsumid').value + "%"
}

// Tabs
function tab() {
    let tabNav = document.querySelectorAll('.tabs-nav__item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    })

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('is-active')
        })
        this.classList.add('is-active')
        tabName = this.getAttribute('data-tab-name')
        selectTabContent(tabName)
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active')
        })
    }

}

tab()

// Burger menu
burger.addEventListener('click', (evt) => {
    const logo = document.querySelector('#logo-main')
    if (logo) {
        let changeLogoSrc = logo.src.indexOf('light')
        changeLogoSrc != -1 ? logo.setAttribute('src', 'assets/images/logo-dark.png') : logo.setAttribute('src', 'assets/images/logo-light.png')
    }

    evt.target.classList.toggle('clicked')
    headerWrapper.classList.toggle('show')
})

// Make some content slider on mobile devices
function makeSlider() {
    if (window.innerWidth < 767) {
        document.querySelectorAll('.run-on-mobile').forEach((el) => {
            ItcSlider.getOrCreateInstance(el, {
                loop: true,
                autoplay: true
            })
        })
    }
}

window.addEventListener('load', makeSlider)
window.addEventListener('resize', makeSlider)