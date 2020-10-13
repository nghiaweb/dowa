$('.voice-bttn .voice-tab').on('click', function() {
    if(!$(this).is('active')) {
        $('.voice-bttn .voice-tab').removeClass('active');
        $('.trans-tap .voice-main').removeClass('active')
        $(this).addClass('active');
        $('.trans-tap .voice-main').eq($(this).data('order')).addClass('active');
        // console.log($(this).data('order'));
    }
})

if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edg/)){
    console.log(true);
}
// not run browser internet explorer
