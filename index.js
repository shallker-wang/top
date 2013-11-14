
/**
 * Module dependencies.
 */

var debounce = require('debounce')
  , html = require('./template')
  , domify = require('domify')
  , event = require('event')

/**
 * Expose `top`.
 */

module.exports = top;

/**
 * Add back-to-top link.
 *
 * @api public
 */
function top() {
  var el = domify(html);
  var height = window.innerHeight;

  function onscroll() {
    var top = getScrollTop();
    if (top < height / 2) return hide();
    show();
  }

  function show() {
    el.className = 'show';
  }

  function hide() {
    el.className = '';
  }

  event.bind(window, 'scroll', debounce(onscroll, 50));
  document.body.appendChild(el);
}

function getScrollTop(){
  if (typeof pageYOffset!= 'undefined'){
    //most browsers except IE before #9
    return pageYOffset;
  } else {
    var B = document.body; //IE 'quirks'
    var D = document.documentElement; //IE with doctype

    D = (D.clientHeight)? D: B;

    return D.scrollTop;
  }
}
