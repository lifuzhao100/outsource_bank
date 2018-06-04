let { resolve } = require('path');
let root = process.cwd();
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyJs = require('uglifyjs-webpack-plugin');
module.exports = {
	mode: 'production',
	context: resolve(root, 'src'),
	entry: {
		'pc/index': './index.pc.js',
		'mobile/index': './index.mobile.js'
	},
	output: {
		filename: '[name]_[hash].js',
		chunkFilename: '[name]_[chunkhash].js',
		path: resolve(root, 'build'),
		publicPath: '/'
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
						warnings: false,
						drop_console: true,
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name]_[contenthash].css',
			chunkFilename: 'styles/[name]_[hash].css'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'pc/index.html',
			template: './index.html',
			title: 'CMS',
			inject: 'body',
			chunks: ['vendor','pc/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'mobile/index.html',
			template: './index.html',
			title: 'mobile',
			inject: 'body',
			chunks: ['vendor','mobile/index'],
		})
	]
};