'use strict'


//popup
const serviesMore = document.querySelector('.services__more');
const serviesBtn = document.querySelector('.services__button');
serviesBtn.addEventListener('click', function() {
    serviesMore.classList.toggle('_active');
})
document.body.addEventListener('click', function(event) {
    if (!serviesMore.contains(event.target) && event.target !== serviesBtn) {
        serviesMore.classList.remove('_active');
    }
}) 
document.querySelector('.services__close').addEventListener('click', function() {
    serviesMore.classList.remove('_active');
})
document.addEventListener('keydown', function(event) {
    if (event.code == 'Escape') {
        serviesMore.classList.remove('_active');
    }
})


//portfolio
const portfolioOptions = document.querySelectorAll('.portfolio__option');
const portfolioImg = document.querySelectorAll('.portfolio__img');
portfolioOptions.forEach(element => {
    element.addEventListener('click', function() {
        if (!element.classList.contains('_active')) {
            portfolioOptions.forEach(element => {
                if (element.classList.contains('_active')) {
                    element.classList.remove('_active');
                }
            })
            element.classList.add('_active');
            let category = element.classList[1];
            portfolioImg.forEach(element => {
                if (category == 'portfolio_all' || element.classList.contains(category)) {
                    element.classList.add('_active');
                } else {
                   if (element.classList.contains('_active')) {
                        element.classList.remove('_active');
                   }
               }
            });
        arrayScrollRefresh();
        }
    })
});


//team
const teamMember = document.querySelectorAll('.team__member');
teamMember.forEach(element => {
    element.addEventListener('click', function() {
        let memberNum = element.classList[2];
        teamMember.forEach(element => {
            if (element.classList[2] === memberNum) {
                element.classList.add('_selected');
            } else if (element.classList.contains('_selected')) {
                element.classList.remove('_selected');
            }            
        });
    })
});


//scroll
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link'); 
let scroll = [];

function arrayScrollRefresh() {
    scroll = [
        document.querySelector('.top').getBoundingClientRect().y + scrollY,
        document.querySelector('.feature').getBoundingClientRect().y + scrollY - 110,
        document.querySelector('.team').getBoundingClientRect().y + scrollY,
        document.querySelector('.contact').getBoundingClientRect().y -20 + scrollY,
    ]
}

window.addEventListener('load', arrayScrollRefresh)

function activeLink(linkNum) {
    menuLinks.forEach(element => {
        if (element.classList.contains('_active')) {
            element.classList.remove('_active');
        }
    });
    menuLinks[linkNum].classList.add('_active');
}

document.addEventListener('scroll', function() {
    let heightWindowPart = document.documentElement.clientHeight / 2;
    if (window.scrollY < scroll[1] - heightWindowPart) {
        activeLink(0);
        menu.classList.remove('_sticky');
    } else if (window.scrollY < scroll[2] - heightWindowPart) {
        activeLink(1)
        menu.classList.add('_sticky');
    } else if (window.scrollY < scroll[3] - heightWindowPart) {
        activeLink(2)
        menu.classList.add('_sticky');
    } else {
        activeLink(3)
        menu.classList.add('_sticky');
    }
})

function scrolling(where) {
    window.scrollTo({
        top: scroll[where],
        behavior: "smooth",
    })
    event.preventDefault();
}

menuLinks.forEach((element, i) => {
    element.addEventListener('click', () => scrolling(i));
});


//button from top
document.querySelector('.top__button').addEventListener('click', () => scrolling(3));

