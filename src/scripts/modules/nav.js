import { gsap } from "gsap";
import { bodyLocker } from "../utils/bodyLocker";
import { focusTrap } from "../utils/focusTrap";

const opener = document.querySelector('.burger');

if(opener) {
  const nav = document.querySelector('.header__nav');
  const closer = document.querySelector('.nav-closer');
  const tl = gsap.timeline().pause();

  tl
    .fromTo(nav, {
      display: 'none',
      opacity: 0
    },{
      classList: 'header__nav active',
      display: 'flex',
      opacity: 1,
      duration: .4,
      ease: 'ease-in',
      onComplete: () => {
        focusTrap(nav);
      }
    }).fromTo('.header .nav', {
      x: '100vw'
    }, {
      x: 0,
      duration: .3,
      ease: 'ease-in',
      onComplete: () => {
        bodyLocker(true);
      }
    }, "-=0.3");

  const openNavHandler = () => {
    tl.play();

    setTimeout(() => {
      opener.removeEventListener('click', openNavHandler);
      closer.addEventListener('click', closeNavHandler);
      nav.addEventListener('click', onOverlayClickHandler);
      document.addEventListener('keydown', onEscClickHandler);
    }, 650);
  }

  const closeNavHandler = () => {
    tl.reverse();

    setTimeout(() => {
      opener.addEventListener('click', openNavHandler);
      closer.removeEventListener('click', closeNavHandler);
      nav.removeEventListener('click', onOverlayClickHandler);
      document.removeEventListener('keydown', onEscClickHandler);
      bodyLocker(false);
    }, 650);
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

  window.addEventListener('resize', closeNavHandler);
}
