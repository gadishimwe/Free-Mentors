const menuSlide = () => {
  const burger = document.querySelector('.menu');
  const sideMenu = document.querySelector('.side-menu');


  burger.addEventListener('click', () => {
    burger.classList.toggle('cross');
    sideMenu.classList.toggle('slide');
  });
};
menuSlide();
