const Koa = require('koa');
const path = require("path");
const router = require("koa-router")();
const data = require('./data.json');
const static = require('koa-static');
const app = new Koa();
const {historyApiFallback} = require('koa2-connect-history-api-fallback');
app.use(historyApiFallback())

app.use(
	static(
		path.join(__dirname,'./dist')
	)
)

router.get('/api/goods',async ctx => {
	ctx.body = {
		code:0,
		data:data.goods
	}
})

router.get('/api/seller',async ctx => {
	ctx.body = {
		code:0,
		data:data.seller
	}
})

router.get('/api/ratings',async ctx => {
	ctx.body = {
		code:0,
		data:data.ratings
	}
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,() => {
	console.log('app starting at port 3000');
})