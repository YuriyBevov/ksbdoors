const slct = document.querySelectorAll('.offer-form .custom-select-option');

if(slct) {
  const control = document.querySelector("#offer-form-door-type");
  const onClickSetValue = (evt) => {
    control.value = evt.target.innerText;
  }

  slct.forEach(option => {
    option.addEventListener('click', onClickSetValue);
  });
}
