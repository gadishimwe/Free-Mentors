const changedToMentor = () => {
  const hideThis = document.querySelectorAll('.to-be-hidden');
  const showThis = document.querySelectorAll('.to-be-shown');

  hideThis.forEach((hideOne, index) => {
    hideOne.addEventListener('click', () => {
      showThis[index].classList.add('show');
      hideThis[index].classList.add('hide');
    });
  });
};
changedToMentor();
