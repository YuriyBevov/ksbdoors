import Masonry from "masonry-layout";

import { setTags } from "./tags.js";
import imagesLoaded from "imagesloaded";
const layout = document.querySelector('.masonry');

if(layout) {
  let itemsToShow = 12;
  const trigger = document.querySelector('.portfolio__btn');

  const items = layout.querySelectorAll('.masonry-item');
  let msnry = null;

  const setHiddenClass = (item) => {
    !item.classList.contains('hidden') ?
    item.classList.add('hidden') : null;
  }

  const removeHiddenClass = (item) => {
    item.classList.contains('hidden') ?
    item.classList.remove('hidden') : null;
  }

  /*items.forEach((item,index) => {
    if(index > itemsToShow) {
      setHiddenClass(item);
    }
  });*/

  const msnryReload = () => {
    msnry.reloadItems()
    msnry.layout();
  }

  const setActiveItems = () => {
    items.forEach((item,index) => {
      if(index < itemsToShow) {
        removeHiddenClass(item);
      }
    });

    if(itemsToShow >= items.length ) {
      setHiddenClass(trigger);
    }
    msnryReload();
  }

  const imgs = layout.querySelectorAll('.masonry-item img');

  imagesLoaded( imgs, () => {
    msnry = new Masonry( layout, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
    });
  });

  /*trigger.addEventListener('click', () => {
    itemsToShow += itemsToShow;
    setActiveItems();
  });*/

  const onClickSetMasonry = (evt) => {
    const value = evt.target.dataset.value;

    if(evt.target === trigger) {
      console.log('trigger')
    } else if(value && value === '0') {
      console.log('0')
    } else {
      const prev = document.querySelector('button.active-tag');
      const active = document.querySelector(`button[data-value="${value}"]`);

      prev.classList.remove('active-tag');
      active.classList.add('active-tag');

      new Promise((resolve, reject) => {
        imgs.forEach(img => {
          setHiddenClass(img.parentNode);
        });
        resolve(imgs);
      }).then((imgs) => {
        imgs.forEach(img => {
          const data = img.dataset.tags.split(',');
          if(data.includes(value)) {
            removeHiddenClass(img.parentNode);
          }
        });
        return imgs
      }).then((imgs) => {
        imagesLoaded( imgs, () => {
          msnry.layout();
        });
      });
    }
  }

  new Promise((resolve, reject) => {
    resolve(setTags());
  }).then(() => {
    const btns = document.querySelectorAll('.tags__list button');
    const opts = document.querySelectorAll('.tags .custom-select-option');
    const controls = [...btns, ...opts, trigger];

    controls.forEach(control => {
      control.addEventListener('click', onClickSetMasonry);
    });
  })
}
