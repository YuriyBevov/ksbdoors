import { Modal } from "../classes/Modal";

export function sendForm(form) {
  const modal = form.closest('.modal');
  const loader = document.querySelector('.loader');
  const successModal = document.querySelector('.success-modal');
  const errorModal = document.querySelector('.error-modal');

  loader.classList.add('active');

  function hideLoader() {
    loader.classList.remove('active');
  }

  function success() {
    console.log('SHOW SUCCESS');

    hideLoader();
    form.reset();

    new Modal(successModal).show();
  }

  function error() {
    console.log('SHOW ERROR', modal);

    hideLoader();
    new Modal(errorModal).show();
  }

  // handle the form submission event

  const data = new FormData(form);
  ajax(form.method, form.action, data, success, error);

  function ajax(method, url, data, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        if(xhr.response.indexOf('SUCCESS') > -1) {
          success(xhr.response, xhr.responseType);
        } else {
          error(xhr.status, xhr.response, xhr.responseType);
        }
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  };
}


