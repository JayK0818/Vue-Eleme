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
	fastclick
	
	
	报错:
	show_detail computed property vue/no-side-effects-in-computed-properties
	在ESLint的情况下，computed中不能直接修改data中的数据,可以在methods中修改,然后在computed中调用该方法。