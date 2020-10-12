$(function() {
    // 社員・仕事紹介のスライダー
    $('.introduce01 .sub-image ul').slick({
        prevArrow: '<i class="icon icon-prev"></i>',
        nextArrow: '<i class="icon icon-next"></i>',
        slidesToShow: 5,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow:3
            }
        }]
    });

    $('.introduce02 .sub-image ul').slick({
        prevArrow: '<i class="icon icon-prev"></i>',
        nextArrow: '<i class="icon icon-next"></i>',
        slidesToShow: 5,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow:3
            }
        }]
    });


    // 社員・仕事紹介のスライダー

    $('.sub-image .slick-slide').on('click', function(){
        var targetNum = $(this).attr('target-num');
        var allImage = $(this).parents('.image-area').find('.main-image-box');
        var target = allImage.eq(targetNum);

        allImage.removeClass('active');
        target.addClass('active');
    });
});