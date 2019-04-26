# 搭建Vue脚手架的一些坑

按照这个链接🔗：<https://juejin.im/post/5bc30d5fe51d450ea1328877#heading-14>一步一步搭建自己的Vue项目脚手架，还是遇到了一些坑。



## 第三方库单独打包

使用`autodll-webpack-plugin`，按照此链接配置，发现开发环境下没问题，生产环境下发现打包出来的`index.html`中的JavaScript文件导入出错。

`<script type="text/javascript" src="./dist/vendor_07b70c649eb7d13ea550.js">`

这个链接必须手动删除`./dist`中的`.`才能正确引入。



### 解决方案

一开始我简单粗暴地给`webpack.base.conf.js`中添加`publicPath: './'`。

但是后来发现这样导致了我只能先`build`才能使用`development`模式。

最终： `publicPath: 'production' == process.env.NODE_ENV ? './' : ''`