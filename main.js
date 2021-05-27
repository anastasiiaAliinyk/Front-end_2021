const btnMenu = document.querySelector('.btn-menu');
const burgerMenu = document.querySelector('.l-burger-menu_nav');

btnMenu.addEventListener('click', () => {
  btnMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});

const buttonsSelectPlus = document.querySelectorAll('.item__select');

buttonsSelectPlus.forEach(buttonSelectPlus => {
  buttonSelectPlus.addEventListener('click', (e) => {
    buttonSelectPlus.classList.toggle('active');

    let hiddenContent = e.target.previousElementSibling;
    let itemNumber = hiddenContent.previousElementSibling;

      if (hiddenContent.style.display === "block") {
        hiddenContent.style.display = "none";
        itemNumber.style.display = "flex";
      } else {
        hiddenContent.style.display = "block";
        itemNumber.style.display = "none";
      }
  });
});
