const burgerBtn = document.querySelector(".header-burger");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");

burgerBtn.addEventListener("click", () => {
  console.log(burgerBtn)
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

//Change menu color when scrolling
window.addEventListener('scroll', function(e) {
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

// if (window.matchMedia("(min-width: 400px)").matches) {
  /* the viewport is at least 400 pixels wide */
// } else {
  /* the viewport is less than 400 pixels wide */
// }

jQuery(function() {
  $(".ventures-slider").slick({
    speed: 300,
    // autoplay: true,
    // autoplaySpeed: 1500,
    arrows: false,
    infinite: true,
    fade: true,
    asNavFor: '.ventures-slider-small'
  });

  $(".ventures-slider-small").slick({
    infinite: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    asNavFor: '.ventures-slider',
  });


  jQuery(window).on('resize', function() {
   


  const viewportWidth = jQuery(window).width();

  if (viewportWidth >= 1150) {
    $('.plans-slider').slick('unslick');
  } else {
    $(".plans-slider").slick({
      infinite: false,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      // centerMode: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1150,
          settings: {
            
          }
        }
      ]
    });  
  }

});

});


//LOGIC FOR SLIDER
//   $('.slider-item').click(function(e) {
//     clickedIndex = $(this).data("slick-index");

//     $('.slider-big').slick('slickGoTo', clickedIndex, true);
//   });
// });
