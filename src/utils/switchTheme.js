const switchTheme = (function() {
  let themeEle = null;
  return function(src) {
    if (!src) { return; }
    if (themeEle) {
      themeEle.remove();
    }
    themeEle = document.createElement('link');
    themeEle.rel = 'stylesheet';
    themeEle.href = src;
    document.body.appendChild(themeEle);
  };
})();

export default switchTheme;
