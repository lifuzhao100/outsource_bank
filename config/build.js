let { resolve } = require('path');
let root = process.cwd();
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyJs = require('uglifyjs-webpack-plugin');
let Copy = require('copy-webpack-plugin');
let Clean = require('clean-webpack-plugin');
module.exports = {
	mode: 'production',
	context: resolve(root, 'src'),
	entry: {
		'pc/index': './index.pc.js',
		'mobile/index': './index.mobile.js',
		test: './test.js'
	},
	output: {
		filename: 'scripts/[id]_[hash].js',
		chunkFilename: 'scripts/[id]_[chunkhash].js',
		path: resolve(root, 'build'),
		publicPath: '/build/'
	},
	devtool: 'source-map',
	externals: /moment/,
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test:/[\/\\]node_modules[\/\\]react.*\.js$/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		},
		minimize: true,
		minimizer: [
			new webpack.DefinePlugin(({
				'process.env.NODE_ENV': JSON.stringify('production')
			})),
			new UglifyJs({
				cache: true,
				parallel: true,
				sourceMap: true,
				uglifyOptions:{
					beautify: false,
					comments: false,
					compress: {
						// warnings: false,
						// drop_console: true,
						collapse_vars: true,
						reduce_vars: true
					}
				}
			})
		]
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			include: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		}, {
			test: /\.less$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						sourceMap: true,
						modules: true
					}
				},
				{
					loader: 'less-loader',
					options: {
						sourceMap: true
					}
				}
			]
		}, {
			test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|otf|ttf)$/i,
			loader: 'file-loader',
			options: {
				name: '[path][name][hash].[ext]'
			}
		}]
	},
	plugins: [
		new Clean(['build'], {
			root: root
		}),
		// new Copy([{
		// 	from: 'static-build/**.*',
		// 	to: '[name].[ext]',
		// 	toType: 'template'
		// }], {
		// 	context: root
		// }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name]_[contenthash].css',
			chunkFilename: 'styles/[name]_[hash].css'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'cms/index.html',
			template: './index.pc.html',
			inject: 'body',
			chunks: ['vendor','pc/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.mobile.html',
			inject: 'body',
			chunks: ['vendor','mobile/index'],
		}),
		new HtmlWebpackPlugin({
			filename: 'test.html',
			template: './test.html',
			inject: 'body',
			chunks: ['test'],
		})
	]
};