const burgerBtn = document.querySelector(".header-burger");
const menu = document.querySelector(".menu");

burgerBtn.addEventListener("click", () => {
  console.log(burgerBtn)
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});
