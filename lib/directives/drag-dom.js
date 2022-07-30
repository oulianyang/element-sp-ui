'use strict';

exports.__esModule = true;
var isDragging = false;
// 获取dom
function getDragDom(el, attr) {
  var domClass = el.getAttribute(attr);
  var dom = void 0;
  if (domClass) {
    dom = el.querySelector('.' + domClass);
  }
  if (!dom) {
    dom = el;
  }
  return dom;
}

exports.default = {
  bind: function bind(el, binding, vnode) {
    if (!binding.value) {
      return;
    }
    var dragTarget = getDragDom(el, 'element-drag-mouse-target');
    var dragDom = getDragDom(el, 'element-drag-dom');

    dragTarget.style.cssText += ';cursor:move;';

    var getStyle = function () {
      if (window.document.currentStyle) {
        return function (dom, attr) {
          return dom.currentStyle[attr];
        };
      } else {
        return function (dom, attr) {
          return getComputedStyle(dom, null)[attr];
        };
      }
    }();

    dragTarget.onmousedown = function (e) {
      if (isDragging) return;
      document.onselectstart = function () {
        return false;
      };
      document.ondragstart = function () {
        return false;
      };

      var startX = e.clientX;
      var startY = e.clientY;

      var dragDomWidth = dragDom.offsetWidth;
      var dragDomHeight = dragDom.offsetHeight;

      var screenWidth = document.body.clientWidth;
      var screenHeight = document.body.clientHeight;

      var minDragDomLeft = dragDom.offsetLeft;
      var maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      var minDragDomTop = dragDom.offsetTop;
      var maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      var styL = getStyle(dragDom, 'left');
      var styT = getStyle(dragDom, 'top');

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
        var left = e.clientX - startX;
        var top = e.clientY - startY;

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

        dragDom.style.cssText += ';left:' + (styL + left) + 'px;top:' + (styT + top) + 'px; right: inherit; bottom: inherit;';
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