import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { setTags } from "./tags.js";

const layout = document.querySelector('.masonry');

if(layout) {
  const items = layout.querySelectorAll('.masonry-item img');
  const trigger = document.querySelector('.portfolio__btn');

  let msnry = null;
  let step = 12;
  let currentCount = step;
  let currentValue = null;

  const setHiddenClass = (item) => {
    !item.classList.contains('hidden') ?
    item.classList.add('hidden') : null;
  }

  const removeHiddenClass = (item) => {
    item.classList.contains('hidden') ?
    item.classList.remove('hidden') : null;
  }

  const initGallery = () => {
    imagesLoaded( items, () => {
      msnry = new Masonry( layout, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
      });
    });

    return msnry;
  }

  const fillItems = (arr, count) => {
    items.forEach(item => {
      setHiddenClass(item.parentNode);
    });

    arr.forEach((item, index) => {
      if(index < count) removeHiddenClass(item.parentNode);
    })

    if(arr.length <= count) {
      setHiddenClass(trigger);
    } else {
      removeHiddenClass(trigger);
    }
  }

  const sortItems = (value, count) => {
    new Promise((resolve, reject) => {
      let activeItems = [];
      items.forEach(item => {
        const data = item.dataset.tags.split(',');
        if(data.includes(value)) {
          activeItems.push(item);
        }
        setHiddenClass(item.parentNode);
      });
      resolve(activeItems);
    }).then((activeItems) => {
      fillItems(activeItems, count);
    })
  }

  const refillImages = () => {
    imagesLoaded( items, () => {
      msnry.layout();
    });
  }

  const showItems = (value, count) => {
    if(value === null) {
      /*скрыть, показать*/
      new Promise((resolve, reject) => {
        resolve(fillItems(items,count));
      }).then(() => {
        refillImages();
      })
    } else {
      /* скрыть, отсортировать, показать*/
      new Promise((resolve, reject) => {
        resolve(sortItems(value, count));
      }).then(() => {
        refillImages();
      })
    }
  }

  const setActiveTag = (prev, current, value) => {
    prev.classList.remove('active-tag');
    current.classList.add('active-tag');
    document.querySelector('.custom-select-opener').innerHTML = `<span># ${value}</span>`;
  }

  const onClickReloadMsnry = (evt) => {
    const prev = document.querySelector('.active-tag');

    if(evt.target.dataset.value === prev.dataset.value) return; // если это повторное нажатие на тег, то ничео не делаю

    const next = document.querySelector(`button[data-value="${evt.target.dataset.value}"`)

    if(evt.target === trigger) {
      currentCount += step;
    } else {
      if(evt.target.dataset.value === '0') {
        currentValue = null;
        currentCount = step; // если нужно уберать до начального кол-ва
        setActiveTag(prev, next, 'Все двери');
      } else {
        currentCount = step; // если нужно уберать до начального кол-ва
        currentValue = evt.target.dataset.value;

        setActiveTag(prev, next, currentValue);
      }
    }

    showItems(currentValue, currentCount);
  }

  const initButtons = () => {
    const btns = document.querySelectorAll('.tags__list button');
    const opts = document.querySelectorAll('.tags .custom-select-option');
    const controls = [...btns, ...opts, trigger];

    controls.forEach(control => {
      control.addEventListener('click', onClickReloadMsnry);
    });
  }

  const init = () => {
    new Promise((resolve, reject) => {
      resolve( initGallery() );
    }).then(() => {
      return fillItems(items, currentCount);
    }).then(() => {
      return setTags();
    }).then(() => {
      initButtons();
    });
  }

  init();
}
