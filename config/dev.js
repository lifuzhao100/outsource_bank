let { resolve } = require('path');
let root = process.cwd();
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	mode: 'development',
	context: resolve(root, 'src'),
	entry: {
		'pc/index': './index.pc.js',
		'mobile/index': './index.mobile.js'
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: resolve(root, 'build'),
		publicPath: '/build/'
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
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.less$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
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
				name: '[path][name].[ext]'
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'cms/index.html',
			template: './index.pc.html',
			title: 'CMS',
			inject: 'body',
			chunks: ['pc/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.mobile.html',
			title: 'mobile',
			inject: 'body',
			chunks: ['mobile/index'],
		}),
		new webpack.NamedModulesPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: resolve(root, 'build'),
		port: 7000,
		hot: true,
		proxy: {
			"/api": {
				// target: "http://bank.mengant.cn/",
				target: "http://nshyy.0859sh.com/",
				changeOrigin: true
			}
		}
	}
};