$(function() {

    $('.refinement-content').on('click', function(){
        var targetClass = $(this).attr('refinement-data');
        $('.refinement-content').removeClass('active');
        $('.peolpe-list').addClass('off');
        $(this).addClass('active');
        $('.peolpe-list.' + targetClass).removeClass('off');
    });

    $('.reset-btn').on('click', function(){
        $('.refinement-content').removeClass('active');
        $('.peolpe-list').removeClass('off');
    });

    $('.refinement-list-title').on('click', function(){
        var wWidth = $(window).innerWidth();
        if(wWidth <= 767){
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).next('.refinement-list-main').slideUp();
            }else{
                $(this).addClass('open');
                $(this).next('.refinement-list-main').slideDown();
            }
        }
    });


    $(window).on('load resize scroll', function(){
        var wWidth = $(window).innerWidth();
        if(wWidth > 767){
            $('.refinement-list-title').removeClass('open');
            $('.refinement-list-main').attr('style', '');
        }
    });

});