
let dataColor = ['#db54a8', '#3d8c9d', '#b9d94c', '#f18f3b', '#f0e466', '#a3588e']
var pie = d3.pie().value(function(d){return d;}).sort(null);
var Arc = d3.arc().innerRadius(0).outerRadius(160);


class CreateSvg {
    constructor(width, height, NameId, data) {
        this._width = width;
        this._height = height;
        this._id = NameId;
        this._data = data;
    }
    create() {
        this._parent = d3.select('#' + this._id).style('width', this._width * 2).style('height', this._height * 2).attr('viewBox', '0 0 ' + this._width * 2 + ' ' + this._height * 2).append('g').attr('class', this._id).attr('transform', 'translate(' + this._width + ',' + this._height + ')');
    }
    draw() {
        this._chart = this._parent.selectAll('.arc')
            .data(pie(this._data))
            .enter()
            .append('g')
            .lower()
            .attr('class', function(d,i) {
                return 'arc' + i;
            }).append('path')
            // .attr('d',this._Arc)
            .style('fill', function(d,i) {
                return dataColor[i];
            })
    }
    // addText() {
    //     var dataNum = this._data;
    //     this._GroupText = this._parent.selectAll('.group-text')
    //         .data(this._text)
    //         .enter()
    //         .append('g')
    //         .attr('class', function(d,i) {
    //             return 'group-text' + i;
    //         });
    //     this._GroupText.append('text')
    //         .attr('class', function(d,i) {
    //             return 'text' + i;
    //         }).attr('font-family','Noto Sans JP, sans-serif')
    //         .attr('font-size', '16px')
    //         .attr('fill', 'white')
    //         .attr('font-weight', 600)
    //         .text(function(d,i) {
    //             return d;
    //         })
    //     this._GroupText.append('text')
    //         .attr('class', function(d,i) {
    //             return 'text-num' + i;
    //         }).attr('font-family','Noto Sans JP, sans-serif')
    //         .attr('font-size', '30px')
    //         .attr('fill', 'white')
    //         .attr('font-weight', 600)
    //         .text(function(d,i) {
    //             return dataNum[i] + '%';
    //         })
    // }
    addImage(img, tranx, trany) {
        this._parent.append('g')
            .attr('transform','translate(' + (tranx - this._width) + ',' + (trany - this._height) + ')')
            .attr('class',' group-img')
            .append('image')
            .attr('href', img)
            .style('opacity', 0)
            // .attr('transform','translate(' + (tranx - this._width) + ',' + (trany - this._height) + ')')
            .attr('transform', 'translate(0, 20)')
    }
    pathTween(id) {
        console.log('run');
        d3.select(id).style('fill', 'red')
        d3.select(id).selectAll('path')
            .transition()
            .attrTween('d', function(d) {
                var i = d3.interpolate(0, d.endAngle);
                return function(t) {
                    d.startAngle = 0;
                    d.endAngle = i(t);
                    return Arc(d);
                };
            }).duration(1500)
            .end();
        d3.select(id).selectAll('.group-img image')
            .transition()
            .duration(1000)
            .delay(800)
            .style('opacity', 1)
            .attr('transform', 'translate(0, 0)')
    }
}

let pie1 = new CreateSvg(172, 168, 'chart1', [55, 16, 13, 8, 7]);
pie1.create();
pie1.draw();
pie1.addImage('../../images/report/img_text_q1.png', 0, 0);
// pie1.pathTween('chart1');

let pie2 = new CreateSvg(165, 160, 'chart2', [50, 36, 14]);
pie2.create();
pie2.draw();
pie2.addImage('../../images/report/img_text_q2.png', 0, 0);

let pie3 = new CreateSvg(190, 165, 'chart3', [36, 34, 21, 9]);
pie3.create();
pie3.draw();
pie3.addImage('../../images/report/img_text_q3.png', 25, 0);

let pie4 = new CreateSvg(178, 210, 'chart4', [44, 41, 11, 4]);
pie4.create();
pie4.draw();
pie4.addImage('../../images/report/img_text_q4.png', 14, 0);

let pie5 = new CreateSvg(175, 190, 'chart5', [44, 42, 8, 6]);
pie5.create();
pie5.draw();
pie5.addImage('../../images/report/img_text_q5.png', 0, 0);

let pie6 = new CreateSvg(205, 170, 'chart6', [55, 25, 13, 7]);
pie6.create();
pie6.addImage('../../images/report/img_text_q6.png', 18, 0);
pie6.draw();

let pie7 = new CreateSvg(168, 205, 'chart7', [45, 41, 13, 1]);
pie7.create();
pie7.addImage('../../images/report/img_text_q7.png', 8, 0);
pie7.draw();

let pie8 = new CreateSvg(278, 172, 'chart8', [34, 30, 13, 10, 8]);
pie8.create();
pie8.addImage('../../images/report/img_text_q8.png', 0, 0);
pie8.draw();

let pie9 = new CreateSvg(195, 174, 'chart9', [48, 38, 13, 4, 4]);
pie9.create();
pie9.addImage('../../images/report/img_text_q9.png', 0, 0);
pie9.draw();

let pie10 = new CreateSvg(245, 193, 'chart10', [54, 15, 13, 10, 8, 4]);
pie10.create();
pie10.addImage('../../images/report/img_text_q10.png', 0, 0);
pie10.draw();

//ad data function 

let callFuction = [pie1.pathTween, pie2.pathTween, pie3.pathTween, pie4.pathTween, pie5.pathTween, pie6.pathTween, pie7.pathTween, pie8.pathTween, pie9.pathTween, pie10.pathTween];


$.each($('.wrap-svg'), function(index) {
    $(this).data('function', callFuction[index]);
});



(function ($) {
    function getScrollTop() {
      return document.documentElement.scrollTop
              || document.body.scrollTop
              || window.scrollY
              || window.pageYOffset;
    }
    function getViewportHeight() {
      var height = window.innerHeight; 
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
          viewportBottom = viewportTop + getViewportHeight() - 200;
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
                console.log(elTop);
                console.log(viewportBottom);
              if(eleTarget.data('function')) {
                let t = eleTarget.data('function');
                t('#' + eleTarget.children('svg').attr('id'));
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
