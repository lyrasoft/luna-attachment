System.register(["@main"], function (_export, _context) {
  "use strict";

  function initAttachmentList(el) {
    var removeBtns = el.querySelectorAll('[data-remove-btn]');
    var insertBtns = el.querySelectorAll('[data-insert-btn]'); // insert to editor

    insertBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var a = document.createElement('a');
        var href = e.currentTarget.dataset.href;
        var fileName = e.currentTarget.dataset.filename;
        a.setAttribute('target', '_blank');
        a.setAttribute('href', href);
        a.innerText = fileName;
        u.$ui.tinymce.get(btn.dataset.insertBtn || '#input-item-fulltext').insert(a.outerHTML);
      });
    }); // remove file

    removeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var tr = e.currentTarget.closest('tr');
        tr.querySelector('[data-remove]').removeAttribute('disabled');
        u.$ui.fadeOut(tr);
      });
    });
  }

  return {
    setters: [function (_main) {}],
    execute: function () {
      /**
       * Part of earth project.
       *
       * @copyright  Copyright (C) 2022 __ORGANIZATION__.
       * @license    __LICENSE__
       */
      u.directive('attachment-list', {
        mounted: function mounted(el, bindings) {
          initAttachmentList(el);
        }
      });
    }
  };
});
//# sourceMappingURL=attachment.js.map
