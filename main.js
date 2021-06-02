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

//Accordion logic
const buttonsSelectPlus = document.querySelectorAll('.item__select');

buttonsSelectPlus.forEach(btn => {
  btn.addEventListener('click', (e) => {
    btn.classList.toggle('active');

    const hiddenContent = e.target.previousElementSibling;
    const itemNumber = hiddenContent.previousElementSibling;

      if (hiddenContent.style.display === 'block') {
        hiddenContent.style.display = 'none';
        itemNumber.style.display = 'flex';
      } else {
        hiddenContent.style.display = 'block';
        itemNumber.style.display = 'none';
      }
  });
});
