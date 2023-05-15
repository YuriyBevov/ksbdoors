import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const anchors = document.querySelectorAll('.anchor-link');

if(anchors) {
  const onClickScrollToAnchor = (evt) => {
    evt.preventDefault();
    const anchor = evt.currentTarget.getAttribute('href');
    const headerOffset = document.querySelector('.header').getBoundingClientRect().height;
    const target = document.querySelector(anchor);
    const offset = target.offsetTop - headerOffset;

    gsap.to(window, {duration: 1, scrollTo: {y: offset, autoKill: true}, ease: 'ease-in'});
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', onClickScrollToAnchor);
  });
}


