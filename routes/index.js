const router = require('koa-router')()

router.get('/', async(ctx, next) => {
	await ctx.render('index', {
        route: '/',
        title: 'LTP - 主页',
        data: 'test'
	})
})

router.get('/try', async(ctx, next) => {
	await ctx.render('try', {
        route: '/try',
        title: 'LTP - 主页 随想'
	})
})

router.get('/about', async(ctx, next) => {
	await ctx.render('about', {
        route: '/about',
        title: 'LTP - 主页 图片'
	})
})

router.get('/leave', async(ctx, next) => {
	await ctx.render('leave', {
        route: '/leave',
        title: 'LTP - 主页 留言'
	})
})

module.exports = router
