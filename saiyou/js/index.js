$(function() {
    // 社員・仕事紹介のスライダー
    $('.workstyle-list-slider').slick({
        prevArrow: '<i class="icon icon-prev"></i>',
        nextArrow: '<i class="icon icon-next"></i>',
        slidesToShow: 3, 
        swipeToSlide: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow:1
            }
        }]
    }); 

    // 360度拠点紹介のスライダー
    $('.base360-slider-wrap').slick({
        prevArrow: '<i class="icon icon-prev"></i>',
        nextArrow: '<i class="icon icon-next"></i>',
        slidesToScroll: 1,
        swipeToSlide: true, 
        appendArrows: $('.slide-arrow-area'),
        infinite:false,
        variableWidth:true,
        esponsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow:1,
                variableWidth:false,
            }
        }]
    }); 
});