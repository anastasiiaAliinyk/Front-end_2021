//Change top menu styles when scrolling
const topMenu = document.querySelector('#menu');
const topMenuContainer = document.querySelector('.header-top');
const tabsMenu = document.querySelector('.tabs-menu');

window.addEventListener('scroll', function(e) {
  const headerHeight = document.querySelector('.header').clientHeight;
  const isActiveTopMenu = document.querySelectorAll('.header__top-nav.active').length;

  const top = window.scrollY;

  if (top >= headerHeight && !isActiveTopMenu) {
    topMenu.classList.add('scroll-styles');
    topMenuContainer.style.background = 'white';

  } else {
    topMenu.classList.remove('scroll-styles');
    topMenuContainer.style.background = 'none';
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

//SLIDER

$(document).ready(function() {
  $('.slider').slick({
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 1,
    slidesPerRow: 1,
    rows: 5,
    focusOnSelect: true,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1015,
        settings: {
          rows: 9,
        }
      },
    ]
  });

  $('.slider-big').slick({
    arrows: false,
    fade: true,
  });

  $('.slider-item').click(function(e) {
    // clickedIndex = $('.slick-current').attr('data-slick-index');
   
    // clickedIndex = $('.slider-item .slick-active');

    clickedIndex = $(this).data("slick-index");

    console.log(clickedIndex)

    // $('.slider-item').addClass('active');

    $('.slider-big').slick('slickGoTo', clickedIndex, true);


    // console.log(clickedIndex)
  });

});
