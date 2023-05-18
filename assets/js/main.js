'use strict'

let lastScroll = 0;
const header = document.querySelector('.header');
const headerWrapper = document.querySelector('.header__wrapper')
const burger = document.querySelector('.burger')
const defaultOffset = header.clientHeight

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

// Fixed header
window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('hide')
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        header.classList.remove('hide')
        header.classList.add('fixed')
    } else if (scrollPosition() < defaultOffset) {
        header.classList.remove('fixed')
    }

    lastScroll = scrollPosition()
})

// Show modal
const modalEls = document.querySelectorAll('.modal');
const modalCloseEls = document.querySelectorAll('.modal__close');
const modalLinks = document.querySelectorAll('[data-modal]');
modalLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();

        const elementId = el.dataset.modal;
        const modalEl = document.getElementById(elementId);
        modalEl.classList.add('show');
        document.body.classList.add('no-scroll');
    })
});

modalCloseEls.forEach((el) => {
    el.addEventListener('click', (evt) => {
        el.closest('.modal').classList.remove('show');
        document.body.classList.remove('no-scroll');
    });
});

modalEls.forEach((el) => {
    el.addEventListener('click', (evt) => {
        el.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });
});

document.querySelectorAll('.modal__dialog').forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.stopPropagation();
    });
});

// Before/After images effect
function beforeAfter() {
    document.getElementById('kobavenusab').style.width = document.getElementById('pedsumid').value + "%"
}

// Tabs
function tab() {
    let tabNav = document.querySelectorAll('.tabs-nav__item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName

    tabNav.forEach(item => item.addEventListener('click', selectTabNav))

    function selectTabNav() {
        tabNav.forEach(item => item.classList.remove('is-active'))
        this.classList.add('is-active')
        tabName = this.getAttribute('data-tab-name')
        selectTabContent(tabName)
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active'))
    }
}

tab()

// Nav toggle
burger.addEventListener('click', (evt) => {
    document.body.classList.toggle('no-scroll')
    evt.target.classList.toggle('clicked')
    headerWrapper.classList.toggle('show')
})

// Make some content slider on mobile devices
document.addEventListener('DOMContentLoaded', () => {
  new ResizeObserver(() => {
    if (window.matchMedia('screen and (max-width: 767px)').matches) {
      document.querySelectorAll('.run-on-mobile').forEach((el) => {
        el.querySelectorAll('.itc-slider-btn').forEach((el) => {
          el.style.removeProperty('display');
        });
        ItcSlider.getOrCreateInstance(el, {
          loop: true,
          autoplay: true
        });
      });
    } else {
      document.querySelectorAll('.run-on-mobile').forEach((el) => {
        const slider = ItcSlider.getOrCreateInstance(el);
        slider.dispose();
        el.querySelectorAll('.itc-slider-btn').forEach((el) => {
          el.style.display = 'none';
        });
      });
    }
  }).observe(document.body);
});

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
