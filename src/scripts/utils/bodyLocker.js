export const bodyLocker = (bool) => {
  const body = document.querySelector('body');
  //const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

  if(bool) {
    body.style.overflow = 'hidden';
    //body.style.paddingRight = paddingOffset;
  } else {
    body.style.overflow = 'auto';
    //body.style.paddingRight = '0px';
  }
}
