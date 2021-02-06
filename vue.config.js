const data = require('./data.json');
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

function resolve(dir){
	return path.join(__dirname,dir);
}

module.exports = {
	css:{
		extract:false,
		sourceMap:false
	},
	productionSourceMap:false,
	devServer:{
		before:function(app){
			app.get("/api/goods",function(req,res) {
				res.json({
					code:0,
					data:data.goods
				})
			})
			app.get('/api/seller',function(req,res){
				res.json({
					code:0,
					data:data.seller
				})
			})
			app.get("/api/ratings",function(req,res){
				res.json({
					code:0,
					data:data.ratings
				})
			})
			app.get('/api/search_good',function(req,res){
				let {id} = req.query;
				let find_data = {};
				for(let i = 0, length = data['goods'].length; i < length; i++){
					let good = data['goods'][i]['foods'];
					let find_food = good.find(item => item['id'] == id);
					if(find_food) {
						find_data = find_food;
						break;
					}
				}
				res.json({
					code:0,
					data:find_data
				})
			})
		}
	},
	chainWebpack(config){
		let miniCssExtractPlugin = new MiniCssExtractPlugin({
			filename:'[name].css',
			chunkFilename:'[name].css'
		})
		config.plugin("extract-css").use(miniCssExtractPlugin)
		config.resolve.alias.set('@ant-design/icons/lib/dist$',resolve('src/common/js/icon.js'))
		config.plugin('context')
		.use(webpack.ContextReplacementPlugin,[/moment[/\\]locale$/,/zh-cn/])
		config.module.rule('images')
			.test(/\.(png|jpeg|jpg|gif|svg)$/)
			.use('image-webpack-loader')
			.loader('image-webpack-loader')
			.options({
				bypassOnDebug:true
			})
			.end()
		config.plugins.delete("prefetch")
		config.plugins.delete("preload")
	},
	configureWebpack:config => {
		config.optimization = {
		  // 分割代码块
		  splitChunks: {
		    cacheGroups: {
		      //公用模块抽离
		      common: {
		        chunks: 'initial',
		        minSize: 0, //大于0个字节
		        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
		      },
		      //第三方库抽离
		      vendor: {
		        priority: 1, //权重
		        test: /node_modules/,
		        chunks: 'initial',
		        minSize: 0, //大于0个字节
		        minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
		      },
		    },
		  }
		}
	}
}