import customSelect from 'custom-select';
const images = document.querySelectorAll('.masonry-item img');

export function setTags() {
  return new Promise((resolve, reject) => {
    let tags = [];
    images.forEach(img => {
      const imgTags = img.dataset.tags;
      tags = [...tags, ...imgTags.split(',')]
    })
    resolve(tags);
  }).then((tags) => {
    const unique = [...new Set(tags)];
    return unique;
  }).then((unique) => {
    const tagList = document.querySelector('.tags__list');
    const tagListButtonTemplate = document.querySelector('#tag-list-button-template');
    customSelect('.portfolio-custom-select');
    const tagsSlct = document.querySelector('.portfolio-custom-select').customSelect;

    const fillTagList = (item, id) => {
      const fragment = document.createDocumentFragment();
      const template = tagListButtonTemplate.content.cloneNode(true);
      const btn = template.querySelector('button');
      const tagContent = '# ' + `${ item}`;
      btn.dataset.value = item;
      btn.innerHTML = tagContent;

      fragment.appendChild(template);
      tagList.appendChild(fragment);

      const option = document.createElement('option');
      option.text = tagContent;
      option.value = item;

      tagsSlct.append(option);
    };

    unique.forEach((item, index) => {
      console.log('item', item);

      fillTagList(item, index + 1);
    });
  }).then(() => {
    console.log('finished');
  });
}
