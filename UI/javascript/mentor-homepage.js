const enable = () => {
  const hideThis = document.querySelectorAll('.to-be-hidden');
  const showThis = document.querySelectorAll('.to-be-shown');

  hideThis.forEach((hideOne, index) => {
    hideOne.addEventListener('click', () => {
      let i = index;
      if (index % 2 !== 0) {
        i -= 1;
      }
      showThis[i / 2].classList.add('show');
      showThis[i / 2].innerHTML = hideOne.innerHTML;
      hideThis[index].parentNode.classList.add('hide');
    });
  });
};
enable();
