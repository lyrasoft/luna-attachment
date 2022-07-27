/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import '@main';

u.directive(
  'attachment-list',
  {
    mounted(el, bindings) {
      initAttachmentList(el);
    }
  }
);

function initAttachmentList(el) {
  const removeBtns = el.querySelectorAll('[data-remove-btn]');
  const insertBtns = el.querySelectorAll('[data-insert-btn]');

  // insert to editor
  insertBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let a = document.createElement('a');
      const href = e.currentTarget.dataset.href;
      const fileName = e.currentTarget.dataset.filename;

      a.setAttribute('target', '_blank');
      a.setAttribute('href', href);
      a.innerText = fileName;

      u.$ui.tinymce.get(btn.dataset.insertBtn || '#input-item-fulltext').insert(a.outerHTML);
    });
  });

  // remove file
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let tr = e.currentTarget.closest('tr');

      tr.querySelector('[data-remove]').removeAttribute('disabled');

      u.$ui.fadeOut(tr);
    });
  });
}
