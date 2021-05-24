const btnMenu = document.querySelector('.btn-menu');
const burgerMenu = document.querySelector('.l-burger-menu_nav');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');
})
