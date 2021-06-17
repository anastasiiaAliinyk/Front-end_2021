const PLANS_SLIDER_SELECTOR = '.plans-slider';
const PROBLEMS_SLIDER_SELECTOR = '.problems-slider';
const VENTURES_SLIDER_SELECTOR = '.ventures-slider';
const VENTURES_SMALL_SLIDER_SELECTOR = '.ventures-slider-small';

const burgerBtn = document.querySelector('.header-burger');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  menu.classList.toggle('active');
});

window.addEventListener('resize', function () {
  if (document.querySelector(PLANS_SLIDER_SELECTOR).classList.contains('slick-initialized')) {
    if (!window.matchMedia('(max-width: 1330px)').matches) {
      unSlickPlansSlider();
    }
  } else {
    if (window.matchMedia('(max-width: 1330px)').matches) {
      slickPlansSlider();
    }
  }
});

//Change menu color when scrolling
window.addEventListener('scroll', function (e) {
  const headerHeight = document.querySelector('.heading').clientHeight;

  const top = window.scrollY;

  if (top >= headerHeight) {
    header.classList.add('scroll-styles');
    menu.classList.add('scroll-styles');
  } else {
    header.classList.remove('scroll-styles');
    menu.classList.remove('scroll-styles');
  }
});

jQuery(function () {
  $(VENTURES_SLIDER_SELECTOR).slick({
    speed: 300,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    infinite: true,
    fade: true,
    asNavFor: VENTURES_SMALL_SLIDER_SELECTOR
  });

  $(VENTURES_SMALL_SLIDER_SELECTOR).slick({
    infinite: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    asNavFor: VENTURES_SLIDER_SELECTOR
  });

  $(PROBLEMS_SLIDER_SELECTOR).slick({
    arrows: false,
    dots: true,
    speed: 300,
    infinite: true,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 1500
  });

  if (window.matchMedia('(max-width: 1330px)').matches) {
    slickPlansSlider();
  }
});

function slickPlansSlider () {
  $(PLANS_SLIDER_SELECTOR).slick({
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    variableWidth: true,
  });
}

function unSlickPlansSlider () {
  $(PLANS_SLIDER_SELECTOR).slick('unslick');
}
