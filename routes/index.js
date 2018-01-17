const router = require('koa-router')()

router.get('/', async(ctx, next) => {
	await ctx.render('index', {
        route: '/',
        title: 'NSLYC-WebSize'
	})
})

router.get('/try', async(ctx, next) => {
	await ctx.render('try', {
        route: '/try',
        title: 'NSLYC-WebSize essay'
	})
})

router.get('/about', async(ctx, next) => {
	await ctx.render('about', {
        route: '/about',
        title: 'NSLYC-WebSize image'
	})
})

router.get('/leave', async(ctx, next) => {
	await ctx.render('leave', {
        route: '/leave',
        title: 'NSLYC-WebSize leave'
	})
})

module.exports = router
