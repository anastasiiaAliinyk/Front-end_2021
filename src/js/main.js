const burgerBtn = document.querySelector(".header-burger");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

//Change menu color when scrolling
window.addEventListener("scroll", function(e) {
  const headerHeight = document.querySelector('.heading').clientHeight;

  const top = window.scrollY;

  if (top >= headerHeight) {
    header.classList.add("scroll-styles");
    menu.classList.add("scroll-styles");
  } else {
    header.classList.remove("scroll-styles");
    menu.classList.remove("scroll-styles");
  }
});

jQuery(function() {
  $(".ventures-slider").slick({
    speed: 300,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    infinite: true,
    fade: true,
    asNavFor: ".ventures-slider-small"
  });

  $(".ventures-slider-small").slick({
    infinite: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    asNavFor: '.ventures-slider',
  });


  if (window.matchMedia("(max-width: 1150px)").matches) {
    $(".plans-slider").slick({
      infinite: true,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      variableWidth: true,
    });
  }
});


//LOGIC FOR SLIDER
//   $('.slider-item').click(function(e) {
//     clickedIndex = $(this).data("slick-index");

//     $('.slider-big').slick('slickGoTo', clickedIndex, true);
//   });
// });
