import {Swiper, Navigation, Pagination } from 'swiper';

const sliders = document.querySelectorAll('.main-slider');

if(sliders) {
  sliders.forEach(slider => {
    const btnNext = slider.closest('section').querySelector('.main-slider-button-next');
    const btnPrev = slider.closest('section').querySelector('.main-slider-button-prev');

    new Swiper(slider, {
      modules: [Navigation, Pagination],

      slidesPerView: 'auto',
      spaceBetween: 15,
      preloadImages: true,

      navigation: {
        nextEl: btnNext ? btnNext : null,
        prevEl: btnPrev ? btnPrev : null,
      },

      pagination: {
        el: ".main-slider-pagination",
        type: "fraction",
      },

      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },

        668: {
          slidesPerView: 3,
          spaceBetween: 30,
        },

        960: {
          slidesPerView: 4,
          spaceBetween: 40,
        }
      }
    });
  });
};



