const router = require('koa-router')()
const api = require('../api/api');
const urlEncode = require('../tools/urlEncode');

router.get('/', async (ctx, next) => {
    await api.queryArticles().then(res => {
        let data = JSON.parse(res)['list'];
        data.forEach(ele => {
            ele.href = `/article/${urlEncode.encodeId(ele.id+'')}`
        });
        return ctx.render('index', {
            route: '/',
            title: 'LTP - 主页',
            data: data
        })
    })
})

router.get('/try', async (ctx, next) => {
    await ctx.render('try', {
        route: '/try',
        title: 'LTP - 主页 随想'
    })
})

router.get('/about', async (ctx, next) => {
    await ctx.render('about', {
        route: '/about',
        title: 'LTP - 主页 图片'
    })
})

router.get('/leave', async (ctx, next) => {
    await ctx.render('leave', {
        route: '/leave',
        title: 'LTP - 主页 留言'
    })
})

router.get('/article/:id', async (ctx, next) => {
    let id = urlEncode.encodeId(ctx.parse.id);
    await ctx.render('article', {
        route: '/article',
        title: 'LTP - 文章标题'
    })
})

module.exports = router