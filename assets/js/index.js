$(function () {
    var ua = navigator.userAgent,
        agent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        // スマートフォン用コード
        agent = 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        // タブレット用コード
        agent = 'tablet';
    } else {
        // PC用コード
        agent = 'pc';
    }

    /* overlay */
    var $a = $('.over_cue + a'),
        $this;
    $a.on({
        'mouseenter': function () {
            $(this).prev('dl').find('dd').addClass('show');
            
        },
        'mouseleave': function () {
            $(this).prev('.over_cue').find('dd').removeClass('show');
        }
    });

    /* main visual */
    var options = {
        videoId: '4bS2c5ldHWY',
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        disablekb: 1,
        rel: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
        wrapperZIndex: 0,
        mute: false
    };
    //下記削除で動画表示・制作中は邪魔なので外す
    if (agent != 'sp') {
        $('#player').tubular(options);
        window.stopVideo = function () {
            $('.main_visual #player_container').addClass('cover');
        }
    }
});