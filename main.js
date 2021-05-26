const btnMenu = document.querySelector('.btn-menu');
const burgerMenu = document.querySelector('.l-burger-menu_nav');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});

const buttonsSelectPlus = document.querySelectorAll('.item__select');

buttonsSelectPlus.forEach(buttonSelectPlus => {
  buttonSelectPlus.addEventListener('click', () => {
    buttonSelectPlus.classList.toggle('active');
  });
});
