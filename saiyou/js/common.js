//  IEでfixedがガタつく問題を解消
if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edg/)) {
    $('body').on("mousewheel", function () {
    event.preventDefault();
    var wd = event.wheelDelta;
    var csp = window.pageYOffset;
    window.scrollTo(0, csp - wd);
    });
	
	//$(function() {  
//    $("body").niceScroll();
//	});

}

if(navigator.userAgent.match(/Edg/)) {

	$(function() {  
    $("body").niceScroll();
	});

}

// ヘッダー追従
var scrollHeader = function(){
    if($(window).scrollTop() == 0)  {
        $('header').removeClass('fixed'); 
    }else{
        $('header').addClass('fixed');
    }
}

scrollHeader();

$(window).on('scroll', function(){
    scrollHeader();
});

//ページ遷移時にフェードする
$(window).on('load', function(){
    $('#wrapper').removeClass('fadeout');
    setTimeout(function(){
        $('#wrapper').addClass('fadeend');
    }, 400);
});

//[アコーディオン]用
//$(function(){
//	$('.accord').click(function(){
//		$(this).toggleClass("changed");
//		$(this).next('.drop-menu').slideToggle();
//	});
//});

//$(function(){
//	$(".accord").click(function(){
//	    $(this).next(".drop-menu").slideToggle();
//	    $(this).toggleClass("changed");
//	});
//});

$(function(){
	$('.accord').on('click', function () {
	  /*クリックでコンテンツを開閉*/
	  $(this).next().slideToggle(100);
	  /*矢印の向きを変更*/
	  $(this).toggleClass('changed', 100);
	});
});


//リンクのホバーアクション様にテキストを複製
function linkbtnText(){
    $(".js-linkbtn").each(function(index){
        var linkbtnClone = $(this).children(".js-linkbtn-text").clone();
        $(this).append(linkbtnClone.addClass("js-linkbtn-text-clone"));
    });
}

//別ページからのアンカーリンク時にヘッダーの高さだけ位置をずらす
$(window).on('load', function() {
    var url = $(location).attr('href');
    if(url.indexOf("#") != -1){
        var anchor = url.split("#");
        var target = $('#' + anchor[anchor.length - 1]);
        var hh = $('header').innerHeight();
        if(target.length){
            var pos = Math.floor(target.offset().top) - hh;
            $("html, body").animate({scrollTop:pos}, 1);
        }
    }
});

$(function() {

    linkbtnText();

    history.replaceState(null, document.getElementsByTagName('title')[0].innerHTML, null);
    window.addEventListener('popstate', function(e) {
        $('#wrapper').removeClass('fadeout');
        setTimeout(function(){
            $('#wrapper').addClass('fadeend');
        }, 400);
    });

    
    $(function() {
        // ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
        $('a:not([href^="#"]):not([target]):not([data-target])').on('click', function(e){
        e.preventDefault(); // ナビゲートをキャンセル
        url = $(this).attr('href'); // 遷移先のURLを取得
        if (url !== '') {
            $('#wrapper').addClass('fadeout');  // bodyに class="fadeout"を挿入
            if($('header').hasClass('open')){
                $('header').removeClass('open');
                $('header').addClass('close');
            }
            setTimeout(function(){
            window.location = url;  // 0.8秒後に取得したURLに遷移
            }, 800);
        }
        return false;
        });
    });


    // SP時のメニュー開閉
    $('.menu-icon').on('click', function(){
        if($('header').hasClass('open')){
            $('header').removeClass('open');
            $('header').addClass('close');
        }else{
            $('header').addClass('open');
            $('header').removeClass('close');
        }
    });

    $("#nav-ul").on('animationend',function(){
        $('header').removeClass('close');
    });


    // SP時のGナビ内のアコーディオン開閉
    $('div.nav-title').on('click', function(){
        if($(window).innerWidth() < 1024){
            var target = $(this).parents('li');
            if(target.hasClass('open')){
                target.removeClass('open').find('.nav-ul-sub').slideUp();
            }else{
                target.addClass('open').find('.nav-ul-sub').slideDown();
            }
        }
    });

    $(window).on('load resize scroll',function(){
        if($(window).innerWidth() >= 1024){
            $('div.nav-title').parents('li').removeClass('open').find('.nav-ul-sub').attr('style', '');
        }
    });

    

    $('.icon-menu-more').on('click', function(){
        var target = $(this).parents('.cate-title');

        if(target.hasClass('open')){
            target.removeClass('open');
            target.next('ul').slideUp();
        }else{
            target.addClass('open');
            target.next('ul').slideDown();
        }
    });
    
    $(window).on('resize', function(){
        var wSize = $(window).width();

        if(wSize >= 768){
            $('.cate-title').removeClass('open');
            $('.cate-title').next('ul').attr('style', '');
        }        
    });

    $('header nav').on('transitionend', function(){
        $('header').removeClass('close');
    });

    // スムーススクロール
    $('a[href^="#"]').click(function(){
        if(!$(this).hasClass('more-btn')){
            var speed = 1000;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var hh = $('header').innerHeight();
            var position = target.offset().top - hh;
            $("html, body").animate({scrollTop:position}, speed, "easeInOutQuart");
            $('header').removeClass('open');
        }
        
        return false;
    });


});

//fadeIn
var ww = $(window).width();
$(window).on('load resize scroll',function(){
    ww = $(window).width();
});	
$(window).on('load resize scroll',function(){
    var scrollWindow = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.fade-box').each(function(){
        targetPosition = $(this).offset().top;
        
        if(ww > 768){
            if(scrollWindow > targetPosition - windowHeight + 200){
                $(this).addClass("fade");
            }
        } else {
            if(scrollWindow > targetPosition - windowHeight + 100){
                $(this).addClass("fade");
            }
        }
    });
});

// pagetop
	$('.pagetop').css('display','none');
	$(window).on('load scroll',function() {
		if($(this).scrollTop() >600) {
		 	$('.pagetop').stop().fadeIn(); 
		} else {
		 	$('.pagetop').stop().fadeOut();
		}
	});
	
	$('.pagetop a').click(function() {
		$('html,body').animate({scrollTop: 0}, 500, 'swing');
	});	

// aos
	$(window).on('load resize scroll',function(){
	AOS.init({
		//easing: 'ease-out-back',
		duration: 1000
	});
});
