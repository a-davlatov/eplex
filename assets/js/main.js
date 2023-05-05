'use strict'

let lastScroll = 0;
const header = document.querySelector('.header');
const headerWrapper = document.querySelector('.header__wrapper')
const burger = document.querySelector('.burger')
// const defaultOffset = document.querySelector('.main').children[0].clientHeight

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

// Fixed header
window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > 200) {
        //scroll down
        header.classList.add('hide')
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        header.classList.remove('hide')
        header.classList.add('fixed')
    } else if (scrollPosition() < 200) {
        header.classList.remove('fixed')
    }

    lastScroll = scrollPosition()
})

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

// Nav toggle
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
const sliders = []
function makeSlider() {
    
    if (window.innerWidth < 767) {
        if (sliders.length === 0) {
            document.querySelectorAll('.run-on-mobile').forEach((el) => {
                const slider = ItcSlider.getOrCreateInstance(el, {
                    loop: true,
                    autoplay: true
                })
                sliders.push(slider)
            })
        }
        return
    }
    
    sliders.forEach((el) => {
        el.dispose()
    })
}

window.addEventListener('load', makeSlider)
window.addEventListener('resize', makeSlider)

// Accordion
class Accordion {
    constructor(target, config) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350
        }
        this._config = Object.assign(defaultConfig, config)
        this.addEventListener()
    }
    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header')
            if (!elHeader) {
                return
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector('.accordion__item_show')
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null
                }
            }
            this.toggle(elHeader.parentElement)
        })
    }
    show(el) {
        const elBody = el.querySelector('.accordion__body')
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return
        }
        elBody.style.display = 'block'
        const height = elBody.offsetHeight
        elBody.style.height = 0
        elBody.style.overflow = 'hidden'
        elBody.style.transition = `height ${this._config.duration}ms ease`
        elBody.classList.add('collapsing')
        el.classList.add('accordion__item_slidedown')
        elBody.offsetHeight
        elBody.style.height = `${height}px`
        window.setTimeout(() => {
            elBody.classList.remove('collapsing')
            el.classList.remove('accordion__item_slidedown')
            elBody.classList.add('collapse')
            el.classList.add('accordion__item_show')
            elBody.style.display = ''
            elBody.style.height = ''
            elBody.style.transition = ''
            elBody.style.overflow = ''
        }, this._config.duration)
    }
    hide(el) {
        const elBody = el.querySelector('.accordion__body')
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return
        }
        elBody.style.height = `${elBody.offsetHeight}px`
        elBody.offsetHeight
        elBody.style.display = 'block'
        elBody.style.height = 0
        elBody.style.overflow = 'hidden'
        elBody.style.transition = `height ${this._config.duration}ms ease`
        elBody.classList.remove('collapse')
        el.classList.remove('accordion__item_show')
        elBody.classList.add('collapsing')
        window.setTimeout(() => {
            elBody.classList.remove('collapsing')
            elBody.classList.add('collapse')
            elBody.style.display = ''
            elBody.style.height = ''
            elBody.style.transition = ''
            elBody.style.overflow = ''
        }, this._config.duration)
    }
    toggle(el) {
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el)
    }
}

(document.querySelector('#accordion-1') != undefined) ? new Accordion('#accordion-1') : null
