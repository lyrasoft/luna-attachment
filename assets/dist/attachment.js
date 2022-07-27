System.register(["@main"], function (_export, _context) {
  "use strict";

  var u;
  return {
    setters: [function (_main) {
      u = _main.default;
    }],
    execute: function () {
      /**
       * Part of earth project.
       *
       * @copyright  Copyright (C) 2022 __ORGANIZATION__.
       * @license    __LICENSE__
       */
      (function () {
        var uploader = document.getElementById('accachment-uploader');
        var input = document.getElementById('input-attachment-files');
        var overlayLabel = document.querySelector('[data-overlay-label]');
        var removeBtns = document.querySelectorAll('[data-remove-btn]');
        var insertBtns = document.querySelectorAll('[data-insert-btn]');
        var options = JSON.parse(uploader.dataset.options || '{}');
        var accepted = (options.accept || '').split(',').map(function (v) {
          return v.trim();
        }).filter(function (v) {
          return v.length > 0;
        }).map(function (v) {
          if (v.indexOf('/') === -1 && v[0] === '.') {
            return v.substr(1);
          }

          return v;
        });
        input.addEventListener('change', function (e) {
          onChange(e);
        });
        input.addEventListener('dragover', function () {
          input.classList.add('hover');
        });
        input.addEventListener('dragleave', function () {
          input.classList.remove('hover');
        });
        input.addEventListener('drop', function () {
          input.classList.remove('hover');
        }); // insert to editor

        insertBtns.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            var a = document.createElement('a');
            var href = e.currentTarget.dataset.href;
            var fileName = e.currentTarget.dataset.filename;
            a.setAttribute('target', '_blank');
            a.setAttribute('href', href);
            a.innerText = fileName;
            u.$ui.tinymce.get('#input-item-fulltext').insert(a.outerHTML);
          });
        }); // remove file

        removeBtns.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            var tr = e.currentTarget.closest('tr');
            tr.querySelector('[data-remove]').removeAttribute('disabled');
            tr.classList.add('hide');
          });
        });

        function onChange(e) {
          var files = input.files;
          var text = '';
          Array.prototype.forEach.call(files, function (file) {
            checkType(accepted, file);
            text += "<div>".concat(file.name, "</div>");
            overlayLabel.innerHTML = text;
          });
        }

        function checkType(accepted, file) {
          var _this = this;

          var fileExt = file.name.split('.').pop();

          if (accepted.length) {
            var allow = false;
            accepted.forEach(function (type) {
              if (allow) {
                return;
              }

              if (type.indexOf('/') !== -1) {
                if (_this.compareMimeType(type, file.type)) {
                  allow = true;
                }
              } else {
                if (type === fileExt) {
                  allow = true;
                }
              }
            });

            if (!allow) {
              u.alert(u.__('unicorn.field.file.drag.message.unaccepted.files'), u.__('unicorn.field.file.drag.message.unaccepted.files.desc', accepted.join(', ')), 'warning');
              throw new Error('Not accepted file ext');
            }
          }
        }
      })();
    }
  };
});
//# sourceMappingURL=attachment.js.map
