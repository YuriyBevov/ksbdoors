import { Modal } from "../classes/Modal";

export function sendForm(form) {
  const loader = document.querySelector('.loader');
  const successModal = document.querySelector('.success-modal');
  const errorModal = document.querySelector('.error-modal');

  loader.classList.add('active');

  function hideLoader() {
    loader.classList.remove('active');
  }

  function success() {
    hideLoader();
    form.reset();
    new Modal(successModal).show();
  }

  function error() {
    hideLoader();
    new Modal(errorModal, {
      preventBodyLock: true
    }).show();
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
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  };
}


