//Change top menu styles when scrolling
const topMenu = document.querySelector('#menu');
const topMenuContainer = document.querySelector('.header-top');
const tabsMenu = document.querySelector('.tabs-menu');

let prevActive = document.querySelector('.slider-link');
prevActive.classList.add('active');

document.querySelector('.slider').addEventListener('click', (e) => {
  if (e.target.classList.contains('slider-link')) {
    prevActive.classList.remove('active');
    e.target.classList.add('active');
    prevActive = e.target;
  }
});

window.addEventListener('scroll', function(e) {
  const headerHeight = document.querySelector('.header').clientHeight;

  const top = window.scrollY;
  const width = window.screen.width; 

  if (top >= headerHeight && width > 1120) {
    topMenu.classList.add('scroll-styles');
    topMenuContainer.style.background = 'white';

  } else {
    topMenu.classList.remove('scroll-styles');
    topMenuContainer.style.background = 'none';
  }

  if (top >= headerHeight && width < 1120) {
    topMenuContainer.style.background = 'linear-gradient(to left, #00f473 15%, #22c6d4 80%, #17c3e1)';
  }

  if(top >= (headerHeight - topMenu.clientHeight + 10)) {
    tabsMenu.classList.add('active');
  } else {
    tabsMenu.classList.remove('active');
  }
});

const btnMenu = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('active');
  topMenu.classList.toggle('active');
  menu.classList.toggle('active');
});

//SLIDER PROPERTIES
$(document).ready(function() {
  $('.slider').slick({
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 0,
    slidesPerRow: 1,
    rows: 5,
    focusOnSelect: true,
    mobileFirst: true,
    fade: true,

    responsive: [
      {
        breakpoint: 1120,
        settings: {
          rows: 10,
        }
      },
    ]
  });

  $('.slider-big').slick({
    arrows: false,
    fade: true,
  });


//LOGIC FOR SLIDER
  $('.slider-item').click(function(e) {
    clickedIndex = $(this).data("slick-index");

    $('.slider-big').slick('slickGoTo', clickedIndex, true);
  });

  $('.slider-link').click(function(e) {
    e.preventDefault();
  });
});
