const Koa = require('koa');
// const static = require('koa-static');
const staticCache = require('koa-static-cache');
// const compress = require('koa-compress');
const { extname, join } = require('path');
const app = new Koa();
// app.use(compress({
// 	filter: function (content_type) {
// 		return true;
// 	},
// 	threshold: 10240,
// 	flush: require('zlib').Z_SYNC_FLUSH
// }))
let files = {};
app.use(async (ctx,next) => {
	console.log(ctx.request.path);
	await next();
});
app.use(staticCache(join(__dirname, 'build'), {
	maxAge: 365 * 24 * 60 * 60,
	gzip: true,
	prefix: '/build/'
}, files));
app.use(staticCache(join(__dirname, 'static-build'), {
	prefix: '/build/static',
	maxAge: 0
}, files));
for (let file in files){
	if(/\.html$/.test(file) || /^[\\\/]build[\\\/]static/.test(file)){
		files[file].maxAge = 0;
	}
}
// app.use(staticCache(join(__dirname, 'static-build') , {
// 	maxAge: 0,
// 	prefix: '/static-build/'
// }));
app.listen(7500);