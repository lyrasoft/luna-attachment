System.register(["@main"], function (_export, _context) {
  "use strict";

  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

  function initAttachmentList(el, options) {
    var removeBtns = el.querySelectorAll('[data-remove-btn]');
    var insertBtns = el.querySelectorAll('[data-insert-btn]');
    var sortable = options.sortable;

    if (sortable) {
      var defOptions = {
        sort: true,
        handle: '.c-handle'
      };

      if (_typeof(sortable) !== 'object') {
        sortable = {};
      }

      sortable = Object.assign(defOptions, sortable);
      console.log(sortable);
      u["import"]('@sortablejs').then(function () {
        u.module(el.querySelector('table tbody'), 'attachment.sortable', function (ele) {
          return new Sortable(ele, sortable);
        });
      });
    } // insert to editor


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
      u.directive('attachment-list', {
        mounted: function mounted(el, _ref) {
          var value = _ref.value;
          initAttachmentList(el, JSON.parse(value));
        }
      });
    }
  };
});
//# sourceMappingURL=attachment.js.map
