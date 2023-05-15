import { gsap } from 'gsap';
//import { modalOverlay } from '../utils/nodesHelper';

export class Modal {
  constructor( modal, options = {} ) {
    this.isBodyLocked = options.isBodyLocked ? true : false,
    this.modal = modal;
    this.id = this.modal.getAttribute('id');
    this.openers = document.querySelectorAll('[data-modal-anchor="' + this.id + '"]');
    this.isInited = false;
    this.overlay = document.querySelector('.modal__overlay');
    this.underlay = null;
    this.content = this.modal.querySelector('.modal__content');
    this.close = this.modal.querySelector('.modal-closer');
    this.focusableElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this.init();
    //this.tl = gsap.timeline();
  }

  bodyLocker = (bool) => {
    let body = document.querySelector('body');
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

    if(bool) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = paddingOffset;
    } else {
      body.style.overflow = 'auto';
      body.style.paddingRight = '0px';
    }
  }

  focusTrap = () => {
    const firstFocusableElement = this.modal.querySelectorAll(this.focusableElements)[0];
    const focusableContent = this.modal.querySelectorAll(this.focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if(focusableContent.length) {
      const onBtnClickHandler = (evt) => {
          const isTabPressed = evt.key === 'Tab' || evt.key === 9;

          if(evt.key === 'Escape') {
              document.removeEventListener('keydown', onBtnClickHandler);
          }

          if (!isTabPressed) {
              return;
          }

          if (evt.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                  lastFocusableElement.focus();
                  evt.preventDefault();
              }
          } else {
              if (document.activeElement === lastFocusableElement) {
                  firstFocusableElement.focus();
                  evt.preventDefault();
              }
          }
      }

      document.addEventListener('keydown', onBtnClickHandler);

      firstFocusableElement.focus();
    }
  }

  addListeners = () => {
    if(this.openers) {
      this.openers.forEach(opener => {
          opener.removeEventListener('click', this.openModal);
      });
    }

    document.addEventListener('click', this.closeByOverlayClick);
    document.addEventListener('keydown', this.closeByEscBtn);

    if(this.close) {
      this.close.addEventListener('click', this.closeByBtnClick);
    }
  }

  refresh = () => {
    document.removeEventListener('click', this.closeByOverlayClick);
    document.removeEventListener('keydown', this.closeByEscBtn);

    if(this.close) {
      this.close.removeEventListener('click', this.closeByBtnClick);
    }

    gsap.fromTo(this.modal, {display: 'flex'}, {
      opacity: 0,
      duration: 1,
      ease: 'ease-in',
      onComplete: () => {
        this.modal.style.display = 'none';
      }
    });

    this.bodyLocker(false);

    if(this.openers) {
      this.openers.forEach(opener => {
          opener.addEventListener('click', this.openModal);
      });
    }

    //если в модалке есть форма, при закрытии обнуляю поля
    this.modal.querySelectorAll('form').forEach(f=>f.reset());
  }

  closeByOverlayClick = (evt) => {
    if(evt.target === this.overlay || evt.target === this.underlay ) {
      this.refresh();
    }

    if(evt.target === this.underlay) {
      this.bodyLocker(true);
    }
  }

  closeByEscBtn = (evt) => {
    if (evt.key === "Escape") {
        this.refresh();
    }
  }

  closeByBtnClick = () => {
    this.refresh();
  }

  openModal = (evt) => {
    evt.preventDefault();

    gsap.fromTo(this.modal, {display: 'none', opacity: 0}, {
      display: 'flex',
      opacity: 1,
      duration: 1,
      ease: 'ease-in'
    })

    this.addListeners();
    this.focusTrap();
    this.bodyLocker(true);
  }

  show = () => {

    gsap.fromTo(this.modal, {display: 'none', opacity: 0}, {
      display: 'flex',
      opacity: 1,
      duration: 1,
      ease: 'ease-in'
    });

    this.underlay = this.modal.querySelector('.modal__overlay');

    this.addListeners();
    this.focusTrap();
    this.bodyLocker(true);
  }

  init() {
      if(this.openers) {
          this.isInited = true;

          this.openers.forEach(opener => {
              opener.addEventListener('click', this.openModal, this.modal, this.overlay);
          })
      } else {
          console.error('Не добавлена кнопка открытия модального окна, либо в ней не прописан аттр-т: data-modal-anchor={modal-id} ')
      }
  };
}
