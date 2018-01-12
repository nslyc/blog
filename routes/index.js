const router = require('koa-router')()

router.get('/', async(ctx, next) => {
	await ctx.render('index', {
        title: 'Blog'
	})
})

router.get('/essay', async(ctx, next) => {
	await ctx.render('essay', {
        title: 'Blog-essay'
	})
})

router.get('/image', async(ctx, next) => {
	await ctx.render('image', {
        title: 'Blog-image'
	})
})

router.get('/music', async(ctx, next) => {
	await ctx.render('music', {
        title: 'Blog-music'
	})
})

router.get('/game', async(ctx, next) => {
	await ctx.render('game', {
        title: 'Blog-game'
	})
})

router.get('/leave', async(ctx, next) => {
	await ctx.render('leave', {
        title: 'Blog-leave'
	})
})

router.get('/json', async(ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})

module.exports = router
