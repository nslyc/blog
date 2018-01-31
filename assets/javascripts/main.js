$(function () {
    var app = new App();
    // 检测屏幕宽度，绑定事件
    if (document.body.clientWidth <= 770) {
        app.reset();
        app.touchEvent('body', app.navToggle);
        app.msScreenScroll('.content');
    } else if (document.body.clientWidth > 770 && document.body.clientWidth <= 1200) {
        app.msScreenScroll(document);
    } else {
        app.screenScroll()
    }
    app.eventBind();
});

// 构造函数
class App {
    constructor() {

    }
    // 一系列事件绑定
    eventBind() {
        // 导航栏列表点击事件
        $('.nav li').on('click', function (e) {
            $('.nav li').removeClass('active');
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
        this.getTime();
        setInterval(this.getTime, 6000)
    }
    // 大屏幕的滚动事件
    screenScroll() {
        $(document).on('scroll', function (e) {
            let top = $(document).scrollTop();
            if (top >= 300) {
                $('div.rope').css({
                    height: top + 50
                })
            } else {
                $('div.rope').css({
                    height: 300
                })
            }
        })
    }
    // 中小屏幕的滚动事件
    msScreenScroll(ele) {
        $(ele).on('scroll', function (e) {
            let top = $(ele).scrollTop();
            if (top >= 300) {
                $('div.rope .top').fadeIn();
            } else {
                $('div.rope .top').fadeOut();
            }
        })
    }
    // 时钟
    getTime() {
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
    // 响应式重置样式
    reset() {
        var dpr, rem, scale;
        var docEl = document.documentElement;
        var fontEl = document.createElement('style');
        var metaEl = document.querySelector('meta[name="viewport"]');

        dpr = window.devicePixelRatio || 1;
        rem = docEl.clientWidth * dpr / 20;
        scale = 1 / dpr;
        // 设置body高度
        $(docEl).height(dpr * docEl.clientHeight);
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
    // 滑动事件
    touchEvent(ele, fn) {
        let startX, startY, moveEndX, moveEndY, X, Y;
        $(ele).on("touchstart", function (e) {
            startX = e.originalEvent.changedTouches[0].pageX;
            startY = e.originalEvent.changedTouches[0].pageY;
        });
        $(ele).on("touchend", function (e) {
            moveEndX = e.originalEvent.changedTouches[0].pageX;
            moveEndY = e.originalEvent.changedTouches[0].pageY;
            X = moveEndX - startX;
            Y = moveEndY - startY;

            if (Math.abs(X) > Math.abs(Y) && X > 50) {
                e.preventDefault();
                fn(e, 'toRight');
            } else if (Math.abs(X) > Math.abs(Y) && X < -50) {
                e.preventDefault();
                fn(e, 'toLeft');
            } else if (Math.abs(Y) > Math.abs(X) && Y > 50) {
                fn(e, 'toBottom');
            } else if (Math.abs(Y) > Math.abs(X) && Y < -50) {
                fn(e, 'toTop');
            } else {
                fn(e, 'click');
            }
        });
    }
    // 导航滑动事件函数
    navToggle(e, info) {
        var navs = $('.nav li');
        // 打开导航
        if (info === 'toRight') {
            $('body').css({
                transform: `translateX(${$('.nav').width()}px)`
            })
            $('.wrapper').show();
            for (var i = 0; i < navs.length; i++) {
                navs.eq(i).css({
                    transform: 'translate(0)',
                    transition: 'all 0.2s ' + (i + 1) * 0.12 + 's'
                })
            }
        } else if ((!!$(e.target).hasClass('wrapper') && info === 'toLeft') || (!!$(e.target).hasClass('wrapper') && info === 'click')) {
            // // 关闭导航
            $('body').css({
                transform: `translateX(0)`
            })
            $('.wrapper').hide();
            for (var j = navs.length - 1; j >= 0; j--) {
                navs.eq(j).css({
                    'transform': 'translate(-100%)',
                    'transition': 'all ' + ($('.nav li').length - j) * 0.12 + 's'
                })
            }
        }
    }
}