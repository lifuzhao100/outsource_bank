const Koa = require('koa');
const static = require('koa-static');
const compress = require('koa-compress');
const app = new Koa();
app.use(compress({
	filter: function (content_type) {
		return /\.(js|css|jpg|png|woff)(\.map)?$/i.test(content_type)
	},
	threshold: 2048,
	flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(static('build'));
app.listen(7500);