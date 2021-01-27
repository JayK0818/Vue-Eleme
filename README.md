# Vue-Seller
	
	axios拦截器:
```js
//	拦截请求:
axios.interceptors.request.use(function(config){
	return config;	// 可以在请求之前做些什么
})

// 	拦截响应:
axios.intereptors.response.use(function(response){
	return response;	// 可以在请求成功时直接返回数据,这样不用在每个组件判断code 
})
```
	ant-design-vue组件和icon按需引入:
		yarn add babel-plugin-import --dev
```js
// babel.config.js
{
	"plugins": [
     "transform-vue-jsx",
     "transform-runtime",
     ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
   ]
}
```
```js
// main.js
import { Button } from 'ant-design-vue';
Vue.component(Button.name, Button)
```
	按需引入icon
```js
// vue.config.js	在根目录下新建文件并修改webpack配置
const path = require("path");
function resolve(dir){
	return path.join(__dirname,dir);
}
configureWebpack:{
	resolve:{
		alias:{
			'@ant-design/icons/lib/dist$':resolve('src/common/js/icon.js')	// 然后在该文件下引入需要的icon图标
		}
	}
}
```
[ant-design-vud的icon按需引用](https://blog.csdn.net/weixin_44103733/article/details/106074717)

	打包📦文件大小分析工具🔧
```js
// package.json	修改脚本命令
"scripts": {
	"serve": "vue-cli-service serve",
	"build": "vue-cli-service build --report",	// 打包后会生产一个report.html文件
	"lint": "vue-cli-service lint"
},
```
	第二种方式是使用 webpack-bundle-analyzer
```js
// vue.config.js
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
configureWebpack:{
	plugins:[
		new BundleAnalyzer()
	]
}
```
[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
[how to optimize-momentjs-with-webpack](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack)
	
	Sticky footer布局
	
	border-1px
	-webkit-device-pixel-ratio:是一个非标准的布尔类型CSS媒体类型,是标准 resolution媒体类型的一个替代方案
```scss
@mixin bordr-bottom-1px($color){
	position:relative;
	&:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		right:0;
		bottom:0;
		border-bottom:1px solid $color;
	}
	@media screen and (min-resolution:2dppx) {
		&:after{
			transform:translateY(0.5);
			-webkit-transform:translateY(0.5);
		}
	}
}
```
	fastclick
	FastClick is a simple,easy to use library for eliminating the 300ms delay between a physical tap and the firing of a
	click event on mobile browsers.The aim is to make your application feel less laggy and more responsive while avoiding
	any interference with your current logic.
```js
if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded',function(){
		FastClick.attach(document.body);
	},)
}
```
	
	报错:
	show_detail computed property vue/no-side-effects-in-computed-properties
	在ESLint的情况下，computed中不能直接修改data中的数据,可以在methods中修改,然后在computed中调用该方法。
	
	报错:
	Unable to preventDefault inside passive event listener due to target being treated as passive.
[报错原因](https://blog.csdn.net/lijingshan34/article/details/88350456)

	报错：
	$listeners is readonly.
	$attrs is readonly.
		调用的时候不是同一个 vue。
[报错原因](https://github.com/vuejs/vue/issues/6698)

	productionSourceMap:false	打包时不要生成map文件
	
	当使用history路由模式的时候,使用node搭建服务,防止页面刷新的时候报错,使用 koa2-connect-history-api-fallback插件
```js
// Koa
const {historyApiFallback} = require('koa2-connect-history-api-fallback');
app.use(historyApiFallback())


// Express
const historyApiFallback = require('connect-history-api-fallback');
app.use(historyApiFallback())
```

	项目页面及功能:
		页面: 商品页面/评价页面/商家页面/商品详情页/头部浮层/购物车列表组件
		功能:
			1. 菜单列表和商品列表联动滚动
			2. 加入购物车小球抛物线动画
			3. 商品加入购物车及删除
			4. 对弹层类提示框使用Vue.extend封装
			5. start和icon组件封装
			6. 评价筛选和时间格式化函数
			7. 商家收藏功能

	