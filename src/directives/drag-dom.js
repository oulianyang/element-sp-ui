let isDragging = false;
// 获取dom
function getDragDom(el, attr) {
  let domClass = el.getAttribute(attr);
  let dom;
  if (domClass) {
    dom = el.querySelector('.' + domClass);
  }
  if (!dom) {
    dom = el;
  }
  return dom;
}

export default {
  bind(el, binding, vnode) {
    if (!binding.value) { return; }
    let dragTarget = getDragDom(el, 'element-drag-mouse-target');
    let dragDom = getDragDom(el, 'element-drag-dom');

    dragTarget.style.cssText += ';cursor:move;';

    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, null)[attr];
      }
    })();

    dragTarget.onmousedown = (e) => {
      if (isDragging) return;
      document.onselectstart = function() {
        return false;
      };
      document.ondragstart = function() {
        return false;
      };

      const startX = e.clientX;
      const startY = e.clientY;

      const dragDomWidth = dragDom.offsetWidth;
      const dragDomHeight = dragDom.offsetHeight;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      let styL = getStyle(dragDom, 'left');
      let styT = getStyle(dragDom, 'top');

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL / 100);
        styT = +document.body.clientHeight * (+styT / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      }

      isDragging = true;
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', upFn);

      return false;
      function moveFn(e) {
        let left = e.clientX - startX;
        let top = e.clientY - startY;

        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        dragDom.style.cssText += `;left:${styL + left}px;top:${styT +
          top}px; right: inherit; bottom: inherit;`;
      }

      function upFn() {
        document.removeEventListener('mousemove', moveFn);
        document.removeEventListener('mouseup', upFn);
        document.onselectstart = null;
        document.ondragstart = null;
        vnode.context && typeof vnode.context.dragMoveEndFn === 'function' && vnode.context.dragMoveEndFn();
        isDragging = false;
      }
    };
  }
};
