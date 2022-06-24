const hamburgerBtn = document.querySelector(".hamburger__menu");
const navList = document.querySelector(".nav__list");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navList.classList.toggle("active");
});

document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    navList.classList.remove("active");
  });
});
