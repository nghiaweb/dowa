$(function() {
    $('.message-slider').slick({
        prevArrow: '<i class="icon icon-prev"></i>',
        nextArrow: '<i class="icon icon-next"></i>',
        slidesToShow: 1, 
        swipeToSlide: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow:1
            }
        }]
    });
  
});