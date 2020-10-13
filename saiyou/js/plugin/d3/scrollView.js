
(function ($) {
  function getScrollTop() {
    return document.documentElement.scrollTop
            || document.body.scrollTop
            || window.scrollY
            || window.pageYOffset;
  }
  function getViewportHeight() {
    var height = window.innerHeight; // Safari, Opera
    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight (which has the wrong value).
    if (height) {
      return height;
    }
    var mode = document.compatMode;

    if (mode || !$.support.boxModel) {
      // IE, Gecko
      height = mode === 'CSS1Compat' ? document.documentElement.clientHeight : // Standards
      document.body.clientHeight; // Quirks
    }
    return height;
  }
  function offsetTop(debug) {
    // Manually calculate offset rather than using jQuery's offset
    // This works-around iOS < 4 on iPad giving incorrect value
    // cf http://bugs.jquery.com/ticket/6446#comment:9
    var curtop = 0;
    for (var obj = debug; obj; obj = obj.offsetParent) {
      curtop += obj.offsetTop;
    }
    return curtop;
  }
  let count = -1,
      timeDelay = 100,
      ArrayClass = ['zoom', 'fadeUP'];
  function checkClass(ele, mapClass) {
    for(let i = 0; i <= mapClass.length - 1; i++) {
      if(ele.is('.' + mapClass[i])) {
        count = count + 1;
        setTimeout(function() {
          ele.removeClass(mapClass[i]);
        }, timeDelay * count);
        return true;
      }
      }
    }
  
  function checkInView() {
    count = -1;
    timeDelay = 100;
    var viewportTop = getScrollTop(),
        viewportBottom = viewportTop + getViewportHeight() - 100;
    $('.inview, .scroll').each(function () {
      var $el = $(this),
          elTop = offsetTop(this),
          elHeight = $el.height(),
          elBottom = elTop + elHeight,
          wasInView = $el.data('inview'),
          offset = $el.data('offset') || 0,
          inView = elTop >= viewportTop && elBottom <= viewportBottom,
          isBottomVisible = elBottom + offset >= viewportTop && elTop <= viewportTop,
          isTopVisible = elTop - offset <= viewportBottom && elBottom >= viewportBottom,
          inViewWithOffset = inView || isBottomVisible || isTopVisible || elTop <= viewportTop && elBottom >= viewportBottom;
      if (inViewWithOffset) {
        var visPart = isTopVisible ? 'top' : isBottomVisible ? 'bottom' : 'both';
        if (wasInView === undefined) {
          $el.data('inview', visPart);
          $el.trigger('inview', [true, visPart]); 
          var eleTarget = $el.trigger('inview', [true, visPart]);
          if(elTop < viewportBottom) {
            if(eleTarget.data('function')) {
                eval(eleTarget.data('function'));
            }else {
              checkClass(eleTarget, ArrayClass);
            }
            
          }
        }
      }
    });
  }
  function createFunctionLimitedToOneExecutionPerDelay(fn, delay) {
    var timer = null;
    function runOncePerDelay() {
      clearInterval(timer);
      timer = setTimeout(function () {
        fn();
      }, delay);
    }
    return runOncePerDelay;
  } // ready.inview kicks the event to pick up any elements already in view.
  // note however, this only works if the plugin is included after the elements are bound to 'inview'
  var runner = createFunctionLimitedToOneExecutionPerDelay(checkInView, 100);
  $(window).on('checkInView.inview click.inview ready.inview scroll.inview resize.inview', runner);
  if(getScrollTop() === 0) {
    checkInView();
  }
})(jQuery);