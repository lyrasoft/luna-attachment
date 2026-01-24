import { module, useTinymce, fadeOut, injectCssToDocument, useUniDirective } from "@windwalker-io/unicorn-next";
const css = ".c-attachment-list__item {\n  transition: all 0.3s ease-in-out;\n}\n.c-attachment-list__item.hide {\n  height: 0;\n  visibility: collapse;\n}";
class AttachmentHandler {
  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.init(this.el, this.options);
  }
  init(el, options) {
    const removeBtns = el.querySelectorAll("[data-remove-btn]");
    const insertBtns = el.querySelectorAll("[data-insert-btn]");
    let sortable = options.sortable;
    if (sortable) {
      const sortableOptions = {
        sort: true,
        handle: ".c-handle"
      };
      import("sortablejs").then(({ default: Sortable }) => {
        module(
          el.querySelector("table tbody"),
          "attachment.sortable",
          (ele) => new Sortable(ele, sortableOptions)
        );
      });
    }
    insertBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let a = document.createElement("a");
        const currentTarget = e.currentTarget;
        const href = currentTarget?.dataset.href;
        const fileName = currentTarget?.dataset.filename;
        a.setAttribute("target", "_blank");
        if (href) {
          a.setAttribute("href", href);
        }
        if (fileName) {
          a.innerText = fileName;
        }
        useTinymce(btn.dataset.insertBtn || "#input-item-fulltext").then((tinymce) => {
          tinymce.insert(a.outerHTML);
        });
      });
    });
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const currentTarget = e.currentTarget;
        let tr = currentTarget?.closest("tr");
        if (tr) {
          tr?.querySelector("[data-remove]")?.removeAttribute("disabled");
          fadeOut(tr);
        }
      });
    });
  }
}
async function init() {
  injectCssToDocument(document, css);
  useUniDirective(
    "attachment-list",
    {
      mounted(el, { value }) {
        const options = JSON.parse(value);
        module(el, "attachment", (el2) => new AttachmentHandler(el2, options));
      }
    }
  );
}
const ready = init();
export {
  AttachmentHandler,
  ready
};
//# sourceMappingURL=attachment.js.map
