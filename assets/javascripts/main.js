$(function () {
    // 检测屏幕宽度，绑定事件
    if (document.body.clientWidth <= 770) {
        reset();
        // 右侧按钮点击事件
        $('.nav-menu').on('click', function (e) {
            toggle();
        })
    } else if (document.body.clientWidth > 770 && document.body.clientWidth <= 1336) {
        // 屏幕滚动事件
        $(document).on('scroll', function (e) {
            let top = $(document).scrollTop();
            if (top >= 500) {
                $('div.rope .top').fadeIn();
            } else {
                $('div.rope .top').fadeOut();
            }
        })
    } else {
        // 屏幕滚动事件
        $(document).on('scroll', function (e) {
            let top = $(document).scrollTop();
            if (top >= 200) {
                $('div.rope').css({
                    height: top + 200
                })
            } else {
                $('div.rope').css({
                    height: 200
                })
            }
        })
    }
    // 导航栏列表点击事件
    $('.nav li').on('click', function (e) {
        $('.navs li').removeClass('active');
        $(this).addClass('active');
    })
    
    
    // 回到顶部事件
    $('div.rope>.top').on('click', function (e) {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    })
    // 搜索
    $('.search .search-icon').on('click', function (e) {
        if ($('.search').hasClass('toggle') && !$('.search input').val()) {
            $('.search').removeClass('toggle');
        } else if (!!$('.search input').val()) {
            console.log('search');
        } else {
            $('.search').addClass('toggle');
        }
    })
    // 点击enter搜索
    $('.search input').on('keyup', function (e) {
        if (e.which === 13) {
            console.log('search');
        }
    })
    getTime();
    setInterval(getTime, 6000)
})
// 时钟
function getTime() {
    var nowDate = new Date();
    var h = nowDate.getHours(); //获取当前小时数(0-23)
    h = h <= 12 ? h : (h - 12);
    var m = nowDate.getMinutes(); //获取当前分钟数(0-59)
    $('.clock .minute').css({
        transform: 'rotateZ(' + (m - 10) * 6 + 'deg) translate(1px,0)'
    })
    $('.clock .hour').css({
        transform: 'rotateZ(' + ((h + m / 60) * 30 + 60) + 'deg)'
    })
}

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

function reset() {
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    dpr = window.devicePixelRatio || 1;
    rem = docEl.clientWidth * dpr / 20;
    scale = 1 / dpr;


    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
    // metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function (v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;

}