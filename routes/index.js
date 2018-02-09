const router = require('koa-router')()
const api = require('../api/api');
const urlEncode = require('../tools/urlEncode');
const time = require('../tools/time');

router.get('/', async (ctx, next) => {
    await api.queryArticles().then(res => {
        let data = JSON.parse(res)['list'];
        data.forEach(ele => {
            ele.href = `http://127.0.0.1:8000/article/${urlEncode.encodeId(ele.id+'')}`
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
    let id = urlEncode.decodeId(ctx.params.id);
    let data, articles, reviews;
    await api.queryArticlesById(id).then(res => {
        data = JSON.parse(res)[0];
        data.time = time.timeFormat(data.create_time);
        return api.queryArticlesByCategoriesId(data.categories_id);
    }).then(res => {
        articles = JSON.parse(res)['list'];
        let index;
        articles.forEach((ele, i) => {
            ele.href = `http://127.0.0.1:8000/article/${urlEncode.encodeId(ele.id+'')}`
            if (Number(ele.id) === Number(id)) {
                index = i;
            }
        })
        articles.splice(index, 1);
        if (articles.length >= 4) {
            articles.slice(0, 4);
        }
        return api.queryReviewsByArticlesId(id);
    }).then(res => {
        reviews = JSON.parse(res)['list'];
        return ctx.render('article', {
            title: `LTP - ${data.title} - ${data.author}`,
            articles: articles,
            reviews: reviews,
            data: data
        })

    })
})

module.exports = router