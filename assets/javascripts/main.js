$(function () {
    // 检测屏幕宽度，绑定事件
    if (document.body.clientWidth <= 750) {
        // 右侧按钮点击事件
        $('.nav-menu').on('click', function (e) {
            toggle();
        })
        // 导航栏列表点击事件
        $('.navs dd').on('click', function (e) {
            $('.navs dd').removeClass('active');
            $(this).addClass('active');
            toggle();
        })
    }
})

function toggle() {
    $('.navs').toggleClass('collapse');
    var navs = $('.navs dd');
    // 打开导航
    if ($('.navs').hasClass('collapse')) {
        for (var i = 0; i < navs.length; i++) {
            navs.eq(i).css({
                transform: 'translate(0)',
                transition: 'all 0.2s ' + (i + 1) * 0.12 + 's'
            })
        }
    } else {
        // 关闭导航
        for (var j = navs.length - 1; j >= 0; j--) {
            navs.eq(j).css({
                'transform': 'translate(-100%)',
                'transition': 'all ' + ($('.navs dd').length - j) * 0.12 + 's'
            })
        }
    }
}