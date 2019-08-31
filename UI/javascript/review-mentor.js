const enableReview = () => {
  const requestButton = document.querySelector('#request-button');
  const reviewOption = document.querySelector('.review');

  requestButton.addEventListener('click', () => {
    reviewOption.classList.add('show');
    requestButton.classList.add('hide');
  });
};
enableReview();
const rateMentor = () => {
  const stars = document.querySelectorAll('.rating-star');
  const rate = (index) => {
    stars.forEach((span) => {
      span.textContent = '☆';
      span.classList.remove('rated');
    });
    for (let i = 0; i <= index; i++) {
      stars[i].textContent = '★';
      stars[i].classList.add('rated');
    }
  };
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      rate(index);
    });
  });
};
rateMentor();
