$(function() {
    /* humberger menu */
    var $menu = $('.navigation .header_nav'),
        $navigation = $('.navigation'),
        pos_list;
    $menu.hide();
    $('.navigation .cue .menu_button').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $navigation.toggleClass('show');
        $('body').toggleClass('static');
        $menu.slideToggle('normal', function() {
            //�{�^���ʒu�ۑ�
            if (pos_list == undefined) {
                pos_list = {};
                var top = Math.max(
                    $('html').scrollTop(),
                    $('body').scrollTop()
                );
                $('.menu_nav a[data-method="open_nav"]').each(function(i) {
                    pos_list[$(this).attr('href')] = $(this).offset().top - top;
                });
            }
        });
        if (!$navigation.hasClass('show')) {
            closeMenu(this);
        }
        return false;
    });

    /* navigation menu */
    var $nav = $('.navigation .menu_nav a[data-method="open_nav"]'),
        $current,
        $selected,
        $subnav = $('.navigation .menu_nav a[data-method="open_child"]');

    $nav.on('click', function(e) {
        e.preventDefault();
        if (closeMenu(this)) {
            $current = $(this);
            $current.parent('li').toggleClass('active');
            $current.next('.open_area').slideToggle();
            if ($('.sp_only').css('display') == 'block') {
                var pos = pos_list[$current.attr('href')];
                var $nav = $('.navigation'),
                    navtop = $nav.scrollTop(),
                    gap = pos - navtop;
                if (gap < 0) {
                    $nav.animate({
                            scrollTop: pos
                        },
                        300,
                        'swing'
                    );
                }
            }
        }
    });

    $subnav.on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $selected = $(this).next('.child');
        $selected.slideToggle();
    });

    /* actual link */
    var $a = $('.navigation .open_area .child .child .child a');
    $a.on('click', function(e) {
        if (document.location.toString().indexOf(this.pathname) > -1) {
            e.preventDefault();
            $('.navigation .cue .menu_button').click();
            var target = this.hash;
            var offset = null;
            if ($(target).size() == 0) {
                return true;
            } else {
                offset = $(target).offset().top - 80;
                if (offset > $(document).height() - $(window).height()) {
                    offset = $(document).height() - $(window).height();
                }
            }
            $(
                    navigator.userAgent.indexOf('Opera') != -1 ?
                    document.compatMode == 'BackCompat' ?
                    'body' :
                    'html' :
                    'html,body'
                )
                .stop(false, false)
                .animate({
                    scrollTop: offset
                }, {
                    duration: 600
                });

            $current = undefined;

            return false;
        }
    });

    if (window.matchMedia != undefined) {
        var mediaQuery = window.matchMedia('(max-width: 640px)');

        // �y�[�W���ǂݍ��܂ꂽ���Ɏ��s
        handle(mediaQuery);

        // �E�B���h�E�T�C�Y���ύX����Ă����s�����悤��
        mediaQuery.addListener(handle);

        function handle(mq) {
            if (mq.matches) {
                // �E�B���h�E�T�C�Y��640px�ȉ��̂Ƃ�
            } else {
                // ����ȊO
                $('.navigation .open_area .child .child .child').css({
                    display: ''
                });
            }
        }
    }

    /* scroll top */
    $('#pageTop > a').on('click', function(e) {
        e.preventDefault();
        var $body = $(
            navigator.userAgent.indexOf('Opera') != -1 ?
            document.compatMode == 'BackCompat' ?
            'body' :
            'html' :
            'html,body'
        );
        $body.stop(true, false).animate({
            scrollTop: 0
        }, {
            duration: 600,
            easing: 'easeOutQuint'
        });
        return false;
    });

    function closeMenu(elm) {
        var flg = true;
        if ($current != undefined) {
            $current.parent('li').removeClass('active');
            $current.next('.open_area').slideUp();
            if ($current.text() == $(elm).text()) {
                $current = undefined;
                flg = false;
            }
        }
        return flg;
    }
});

/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright c 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
 */
(function(h) {
    h.easing.jswing = h.easing.swing;
    h.extend(h.easing, {
        def: 'easeOutQuad',
        swing: function(e, a, c, b, d) {
            return h.easing[h.easing.def](e, a, c, b, d);
        },
        easeInQuad: function(e, a, c, b, d) {
            return b * (a /= d) * a + c;
        },
        easeOutQuad: function(e, a, c, b, d) {
            return -b * (a /= d) * (a - 2) + c;
        },
        easeInOutQuad: function(e, a, c, b, d) {
            return 1 > (a /= d / 2) ?
                (b / 2) * a * a + c :
                (-b / 2) * (--a * (a - 2) - 1) + c;
        },
        easeInCubic: function(e, a, c, b, d) {
            return b * (a /= d) * a * a + c;
        },
        easeOutCubic: function(e, a, c, b, d) {
            return b * ((a = a / d - 1) * a * a + 1) + c;
        },
        easeInOutCubic: function(e, a, c, b, d) {
            return 1 > (a /= d / 2) ?
                (b / 2) * a * a * a + c :
                (b / 2) * ((a -= 2) * a * a + 2) + c;
        },
        easeInQuart: function(e, a, c, b, d) {
            return b * (a /= d) * a * a * a + c;
        },
        easeOutQuart: function(e, a, c, b, d) {
            return -b * ((a = a / d - 1) * a * a * a - 1) + c;
        },
        easeInOutQuart: function(e, a, c, b, d) {
            return 1 > (a /= d / 2) ?
                (b / 2) * a * a * a * a + c :
                (-b / 2) * ((a -= 2) * a * a * a - 2) + c;
        },
        easeInQuint: function(e, a, c, b, d) {
            return b * (a /= d) * a * a * a * a + c;
        },
        easeOutQuint: function(e, a, c, b, d) {
            return b * ((a = a / d - 1) * a * a * a * a + 1) + c;
        },
        easeInOutQuint: function(e, a, c, b, d) {
            return 1 > (a /= d / 2) ?
                (b / 2) * a * a * a * a * a + c :
                (b / 2) * ((a -= 2) * a * a * a * a + 2) + c;
        },
        easeInSine: function(e, a, c, b, d) {
            return -b * Math.cos((a / d) * (Math.PI / 2)) + b + c;
        },
        easeOutSine: function(e, a, c, b, d) {
            return b * Math.sin((a / d) * (Math.PI / 2)) + c;
        },
        easeInOutSine: function(e, a, c, b, d) {
            return (-b / 2) * (Math.cos((Math.PI * a) / d) - 1) + c;
        },
        easeInExpo: function(e, a, c, b, d) {
            return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c;
        },
        easeOutExpo: function(e, a, c, b, d) {
            return a == d ? c + b : b * (-Math.pow(2, (-10 * a) / d) + 1) + c;
        },
        easeInOutExpo: function(e, a, c, b, d) {
            return 0 == a ?
                c :
                a == d ?
                c + b :
                1 > (a /= d / 2) ?
                (b / 2) * Math.pow(2, 10 * (a - 1)) + c :
                (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c;
        },
        easeInCirc: function(e, a, c, b, d) {
            return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c;
        },
        easeOutCirc: function(e, a, c, b, d) {
            return b * Math.sqrt(1 - (a = a / d - 1) * a) + c;
        },
        easeInOutCirc: function(e, a, c, b, d) {
            return 1 > (a /= d / 2) ?
                (-b / 2) * (Math.sqrt(1 - a * a) - 1) + c :
                (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + c;
        },
        easeInElastic: function(e, a, c, b, d) {
            e = 1.70158;
            var f = 0,
                g = b;
            if (0 == a) return c;
            if (1 == (a /= d)) return c + b;
            f || (f = 0.3 * d);
            g < Math.abs(b) ?
                ((g = b), (e = f / 4)) :
                (e = (f / (2 * Math.PI)) * Math.asin(b / g));
            return (-(
                g *
                Math.pow(2, 10 * --a) *
                Math.sin((2 * (a * d - e) * Math.PI) / f)
            ) + c);
        },
        easeOutElastic: function(e, a, c, b, d) {
            e = 1.70158;
            var f = 0,
                g = b;
            if (0 == a) return c;
            if (1 == (a /= d)) return c + b;
            f || (f = 0.3 * d);
            g < Math.abs(b) ?
                ((g = b), (e = f / 4)) :
                (e = (f / (2 * Math.PI)) * Math.asin(b / g));
            return (
                g *
                Math.pow(2, -10 * a) *
                Math.sin((2 * (a * d - e) * Math.PI) / f) +
                b +
                c
            );
        },
        easeInOutElastic: function(e, a, c, b, d) {
            e = 1.70158;
            var f = 0,
                g = b;
            if (0 == a) return c;
            if (2 == (a /= d / 2)) return c + b;
            f || (f = 0.3 * d * 1.5);
            g < Math.abs(b) ?
                ((g = b), (e = f / 4)) :
                (e = (f / (2 * Math.PI)) * Math.asin(b / g));
            return 1 > a ?
                -0.5 *
                g *
                Math.pow(2, 10 * --a) *
                Math.sin((2 * (a * d - e) * Math.PI) / f) +
                c :
                g *
                Math.pow(2, -10 * --a) *
                Math.sin((2 * (a * d - e) * Math.PI) / f) *
                0.5 +
                b +
                c;
        },
        easeInBack: function(e, a, c, b, d, f) {
            void 0 == f && (f = 1.70158);
            return b * (a /= d) * a * ((f + 1) * a - f) + c;
        },
        easeOutBack: function(e, a, c, b, d, f) {
            void 0 == f && (f = 1.70158);
            return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c;
        },
        easeInOutBack: function(e, a, c, b, d, f) {
            void 0 == f && (f = 1.70158);
            return 1 > (a /= d / 2) ?
                (b / 2) * a * a * (((f *= 1.525) + 1) * a - f) + c :
                (b / 2) * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) +
                c;
        },
        easeInBounce: function(e, a, c, b, d) {
            return b - h.easing.easeOutBounce(e, d - a, 0, b, d) + c;
        },
        easeOutBounce: function(e, a, c, b, d) {
            return (a /= d) < 1 / 2.75 ?
                7.5625 * b * a * a + c :
                a < 2 / 2.75 ?
                b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c :
                a < 2.5 / 2.75 ?
                b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c :
                b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c;
        },
        easeInOutBounce: function(e, a, c, b, d) {
            return a < d / 2 ?
                0.5 * h.easing.easeInBounce(e, 2 * a, 0, b, d) + c :
                0.5 * h.easing.easeOutBounce(e, 2 * a - d, 0, b, d) +
                0.5 * b +
                c;
        }
    });
})(jQuery);
$(document).ready(function(){
    $("#show1").click(function(){
      $("#product_toggle1").toggle(300);
      $("#close1").show(30);
     
      
    });

    $("#close1").click(function(){
      $(".product_toggle").hide(250);
      $(".button_close").hide(30);
      
    });

    $("#show2").click(function(){
        $("#product_toggle2").toggle(300);
        $("#close2").show(30);
       
      });
  
      $("#close2").click(function(){
        $("#product_toggle2").hide(250);
        $("#close2").hide(30);
      });

      $("#show3").click(function(){
        $("#product_toggle3").toggle(300);
        $("#close3").show(30);
      
      });
  
      $("#close3").click(function(){
        $("#product_toggle3").hide(250);
        $("#close3").hide(30);
      });
      $("#show4").click(function(){
        $("#product_toggle4").toggle(300);
        $("#close4").show(30);
     
      });
  
      $("#close4").click(function(){
        $("#product_toggle4").hide(250);
        $("#close4").hide(30);
      });
      $("#show5").click(function(){
        $("#product_toggle5").toggle(300);
        $("#close5").show(30);
       
        
      });
  
      $("#close5").click(function(){
        $("#product_toggle5").hide(250);
        $("#close5").hide(30);
      });

      
      
      
    });

    var KEYCODE_ENTER = 13;
    var KEYCODE_ESC = 27;

    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            $(".product_toggle").hide(30);
        }
        
  });

  $(document).ready(function(){
	
    $("#zoom").click(function(){


            $('.book').css('transform','scale(1.2)');  
            $('.book').css('-webkit-transform','scale(1.2)');
			$('.book').css('-moz-transform','scale(1.2)');
			$('.book').css('-o-transform','scale(1.2)');
            $('.book').css('-ms-transform','scale(1.2)');    

            $('.button_zoom').css('margin-top','5.5%');
            $('.button_zoom').css('left','56%');

            
        
      });
      
      $("#zoomout").click(function(){

$('.book').css('transform','scale(1)');
 
    $('.book').css('top','0');
    $('.book').css('-webkit-transform','scale(1)');
    $('.button_zoom').css('margin-top','0%');
    $('.button_zoom').css('left','55%');
    
    $('#footer').css('margin-top','10%');

});
        
  });
