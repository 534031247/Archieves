# Webpack引入Vue

### 引入Vue

`cnpm i vue -D`

### main.js

`import Vue from 'vue'`

### vue-loader

.vue文件需要通过vue-loader来进行加载，现在我们需要做如下配置。通过 vue-loader 和vue-template-compiler来加载并编译.vue文件

`cnpm i vue-loader vue-template-compiler -D`

### webpack.config.js

```javascript
{
    test: /\.vue$/,
    loader: 'vue-loader'
}
```

然而发现并不能运行，发现报错：

> vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.

后来经过网上查看之后找到了解决方案:  https://vue-loader.vuejs.org/guide/#vue-cli

### 解决方案

在webpack.config.js中：

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')
........
plugins: [
    new VueLoaderPlugin()
  ]
```



### 还是发现问题。。。

可以npm run build，但是当我打开开发模式：npm run dev之后，网页虽然成功打开了，但是Vue并没有渲染出我想要的结果，查看控制台：

> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
>
> (found in <Root>)

这是什么意思呢?
运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。运行时构建比独立构建要轻量30%，只有 17.14 Kb min+gzip大小。
上面一段是官方api中的解释。就是说，如果我们想使用template，我们不能直接在客户端使用npm install之后的vue。此时，再去看查vue模块，添加几行:

```JavaScript
resolve: {
	alias: {
		'vue': 'vue/dist/vue.js'
	}
}
```

总算是。。。。