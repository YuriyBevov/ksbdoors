const triggers =  document.querySelectorAll('.js-callback-modal-opener');

if(triggers) {
  const overlay = document.querySelector('.modal__overlay');
  const modal = document.querySelector('.callback-modal');
  const closer = modal.querySelector('.modal-closer');

  const openModalHandler = () => {
    modal.classList.add('active');
    addListeners();
  };

  const closeModalHandler = () => {
    modal.classList.remove('active');
    removeAllListeners();
  };

  const onOverlayClickHandler = (evt) => {
    if(evt.target === overlay) {
      closeModalHandler();
    }
  };

  const onEscClickHandler = (evt) => {
    if(evt.key === 'Escape') {
      closeModalHandler();
    }
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', openModalHandler);
  });

  const addListeners = () => {
    closer.addEventListener('click', closeModalHandler);
    overlay.addEventListener('mousedown', onOverlayClickHandler);
    document.addEventListener('keydown', onEscClickHandler);
  };

  const removeAllListeners = () => {
    closer.removeEventListener('click', closeModalHandler);
    overlay.removeEventListener('mousedown', onOverlayClickHandler);
    document.removeEventListener('keydown', onEscClickHandler);
  };
}
