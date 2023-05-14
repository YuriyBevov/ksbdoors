const opener = document.querySelector('.burger');

if(opener) {
  const nav = document.querySelector('.header__nav');
  const closer = document.querySelector('.nav-closer');

  const openNavHandler = () => {
    nav.classList.add('active');
    opener.removeEventListener('click', openNavHandler);
    closer.addEventListener('click', closeNavHandler);
    nav.addEventListener('click', onOverlayClickHandler);
    document.addEventListener('keydown', onEscClickHandler);
  }

  const closeNavHandler = () => {
    nav.classList.remove('active');
    opener.addEventListener('click', openNavHandler);
    closer.removeEventListener('click', closeNavHandler);
    nav.removeEventListener('click', onOverlayClickHandler);
    document.removeEventListener('keydown', onEscClickHandler);
  }

  const onOverlayClickHandler = (evt) => {
    if(evt.target === nav) {
      closeNavHandler();
    }
  }

  const onEscClickHandler = (evt) => {
    if(evt.key === 'Escape') {
      closeNavHandler();
    }
  }

  opener.addEventListener('click', openNavHandler);
}
