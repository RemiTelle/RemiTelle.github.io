const burger = document.querySelector('.hamburger');
const links  = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');  // animates the icon
    links.classList.toggle('open');     // slides the menu
});
