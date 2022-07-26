/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import u from '@main';

(() => {
  const uploader = document.getElementById('accachment-uploader');
  const input = document.getElementById('input-attachment-files');
  const overlayLabel = document.querySelector('[data-overlay-label]');
  const removeBtns = document.querySelectorAll('[data-remove-btn]');
  const insertBtns = document.querySelectorAll('[data-insert-btn]');
  const options = JSON.parse(uploader.dataset.options || '{}');
  const accepted = (options.accept || '')
    .split(',')
    .map(v => v.trim())
    .filter(v => v.length > 0)
    .map(v => {
      if (v.indexOf('/') === -1 && v[0] === '.') {
        return v.substr(1);
      }

      return v;
    });

  input.addEventListener('change', (e) => {
    onChange(e);
  });

  input.addEventListener('dragover', () => {
    input.classList.add('hover');
  });

  input.addEventListener('dragleave', () => {
    input.classList.remove('hover');
  });

  input.addEventListener('drop', () => {
    input.classList.remove('hover');
  });

  // insert to editor
  insertBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let a = document.createElement('a');
      const href = e.currentTarget.dataset.href;
      const fileName = e.currentTarget.dataset.filename;

      a.setAttribute('target', '_blank');
      a.setAttribute('href', href);
      a.innerText = fileName;

      u.$ui.tinymce.get('#input-item-fulltext').insert(a.outerHTML);
    });
  });

  // remove file
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let tr = e.currentTarget.closest('tr');

      tr.querySelector('[data-remove]').removeAttribute('disabled');
      tr.classList.add('hide');
    });
  });

  function onChange(e) {
    const files = input.files;
    let text = '';

    Array.prototype.forEach.call(files, file => {
      checkType(accepted, file);

      text += `<div>${file.name}</div>`;
      overlayLabel.innerHTML = text;
    });
  }

  function checkType(accepted, file) {
    const fileExt = file.name.split('.').pop();

    if (accepted.length) {
      let allow = false;

      accepted.forEach((type) => {
        if (allow) {
          return;
        }

        if (type.indexOf('/') !== -1) {
          if (this.compareMimeType(type, file.type)) {
            allow = true;
          }
        } else {
          if (type === fileExt) {
            allow = true;
          }
        }
      });

      if (!allow) {

        u.alert(
          u.__('unicorn.field.file.drag.message.unaccepted.files'),
          u.__('unicorn.field.file.drag.message.unaccepted.files.desc', accepted.join(', ')),
          'warning'
        );
        throw new Error('Not accepted file ext');
      }
    }
  }
})();
