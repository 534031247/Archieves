> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://juejin.im/post/59aa1248518825392656a86a

自从 Vue2.0 发布后，Vue 就成了前端领域的热门话题，github 也突破了三万的 star，那么对于新手来说，如何高效快速的学习 Vue2.0 呢。

## Vue 基础

对于没有接触过 es6 和 webpack 的童鞋来说，不建议直接用官方的脚手架 vue-cli 构件项目。
先按文档顺序最少学习完组件那一章。直接在 html 文件中引入 vue.js 开始学习, 了解 vue 的基础指令，和整个 vue 实例的基础架构。
vue 的生命周期很重要，了解这点以后可以免去很多问题。
学完这些可以做一些练手的小项目，比如万年不变的 todolist。。。
现在可以开始学习使用 vue-cli 构件项目了，学习组件化之前，推荐先看一下 es6 关于模块的介绍。阮一峰《ECMAScript6》 Module
光会这些还是不够的，还得会一些 npm 基础，知道如何用 git-bush 来安装模块依赖，会一些常用的命令。这方面的知识可以参阅 npm 入门文档
看完这些就可以试着将之前的写的 demo 用搭建的 vue-cli 来实现。附上我写的一个入门小 demovue-demo-search
多看看组件那里，看看如何在 vue-cli 中怎么实现组件化。
到这里 vue 基础篇就结束了。你还可以有条件的参阅剩下的官方文档里面的进阶篇，如果时间有限，就直接进入 vue-router

## Vue-router

和之前一样，推荐直接用 html+js 过一遍文档
对路由导航钩子得好好看一看。
看完文档就可以上手 vue-cli，一般新手在这几天都会死活跑不出来。偷笑
最直接的方法就是去 github 上搜一些关于 vue-router2.0 的 demo，看如何构件路由，如何构件项目目录。
我这里有一个传送门
如果能跑出来，就可以做一些小项目了，比如写一个知乎日报啊偷笑，这些 demo 在 github 上很多。
可以结合一些组件库写 demo，这样可以更加了解组件化。比如饿了么团队的 Element、mint-ui

## Vuex

什么是 vuex？
Vuex 是一个专门为 Vue.js 应用设计的 状态管理模型 + 库。它为应用内的所有组件提供集中式存储服务，其中的规则确保状态只能按预期方式变更。说白了就是控制应用的一些全局状态。状态改变了，对应的视图也会改变。

在学习 Vuex 时，会有一些 ES6 特性，当遇到这些时，最好不要一带而过，去好好看一看这些 es6 特性。
比如在学习 Action 时可以看看 ES6 新增的 Promise 和参数解构。
实践的方法一样是先看别人别人写的代码，比如官方的购物车实例的应用结构
把之前写的 demo 优化一下，有些地方可以用用 vuex
vuex 主要是用来对不同组件间进行通信，它构建了一个 Vue 实例的全局数据与方法，这些数据与方法可以在该 Vue 实例的所有组件中 get 与 set

## 入门到放弃整理

#### 一、vue 基础

[Vue2.0 最全文档](https://link.juejin.im?target=https%3A%2F%2Frouter.vuejs.org%2Fzh-cn%2F)
[Vue2.0 探索之路——vue-router 入门教程和总结](https://link.juejin.im?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000009651628)
[Vue.js 2.0 快速上手](https://link.juejin.im?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F23078117)
[Vuejs2.0 文档攻略](https://link.juejin.im?target=http%3A%2F%2Flarabase.com%2Fcollection%2F2%2Fpost%2F126)
[“Vue2.0” 跟俺一起全面入坑 01](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F98b8a8fb00e6)
[“Vue2.0” 跟俺一起全面入坑 02](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fc01b984509ff)
[“Vue2.0” 跟俺一起全面入坑 03](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F6d0213d1d109)
[“Vue2.0” 跟俺一起全面入坑 —— 自定义便签](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F2e77524a088b)
[超好用的 VueJs 调试工具——vue-devtools](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F282682abd9f5)
[Vue2.0 史上最全入坑教程（上）—— 搭建 Vue 脚手架（vue-cli）](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F1626b8643676)
[Vue2.0 史上最全入坑教程（中）—— 脚手架代码详解](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F2b661d01eaf8)
[Vue2.0 史上最全入坑教程（下）—— 实战案例](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fec436222c608)
[Vue2.0 史上最全入坑教程（完）—— 实战案例](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F7c5ccfac3fa8)
[vue-cli 中配置 sass 和利用 SASS 函数功能实现 px 转 rem](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F607cf1a413c5)

#### 二、vue 提高

[Vue 路由跳转问题记录详解](https://link.juejin.im?target=https%3A%2F%2Fwww.oudahe.com%2Fp%2F13909%2F)
[vuejs 心法和技法](https://link.juejin.im?target=http%3A%2F%2Fwww.cnblogs.com%2Fkidsitcn%2Fp%2F5409994.html)
[Vue2.0 生命周期和钩子函数的一些理解](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F2339426e037b) ===》推荐
[用 webpack（2.x 语法）手动搭建 Vue 项目](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fa87dee15e6c3)
[全面解析 vue-cli 生成的项目中使用其他库（js 库、css 库）](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fa2fc286cb8ab)
[Vuex 从入门到熟练使用](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F0fcdf380afe7)
[vue 与服务端通信—vue-resource](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fc2e1a07bd1f7)
[vue 开发过程中跨域最简单解决方案](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F16f05ae4ca0f)
[富文本编辑器 Ueditor 如何在 Vue 中使用？](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F8c43636c6c47)

#### 三、vue 1.x 和 vue 2.x 的区别

[到了 Vue2.x 有哪些变化？—— 知识点](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F711513ad58f8)
[到了 Vue2.x 有哪些变化？—— 组件通信](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F4cbc409516bf)

#### 四、其他必备知识点

[ES6 入门（一）](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fe37d902abd91)
[ES6 快速入门（二）](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F78df394e505c)
[ES6 快速入门（三）](https://link.juejin.im?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2F942efadf27f7)

![](https://user-gold-cdn.xitu.io/2017/9/2/e14e201c13a3e14a04920b57c257189b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 需要视频教程的关注公众号 [代码技巧]（ID:daimajiqiao）回复 14 即可获取, 付出总会有收获

## Vue.js2.0 核心思想

Vue.js 是一个提供 MVVM 数据双向绑定的库，专注于 UI 层面，核心思想是：数据驱动、组件系统。

数据驱动：

Vue.js 数据观测原理在技术实现上，利用的是 ES5Object.defineProperty 和存储器属性: getter 和 setter（所以只兼容 IE9 及以上版本），可称为基于依赖收集的观测机制。核心是 VM，即 ViewModel，保证数据和视图的一致性。

watcher：每一个指令都会有一个对应的用来观测数据的对象，叫做 watcher，比如 v-text="msg", {{msg}}，即为两个 watcher，watcher 对象中包含了待渲染的关联 DOM 元素。

```
<div id="app">
  {{ message }}
</div>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})复制代码
```

基于依赖收集的观测机制原理：

1 将原生的数据改造成 “可观察对象”，通常为，调用 defineProperty 改变 data 对象中数据为存储器属性。一个可观察对象可以被取值 getter，也可以被赋值 setter。
2 在解析模板，也就是在 watcher 的求值过程中，每一个被取值的可观察对象都会将当前的 watcher 注册为自己的一个订阅者，并成为当前 watcher 的一个依赖。
3 当一个被依赖的可观察对象被赋值时，它会通知 notify 所有订阅自己的 watcher 重新求值，并触发相应的更新，即 watcher 对象中关联的 DOM 改变渲染。
依赖收集的优点在于可以精确、主动地追踪数据的变化，不需要手动触发或对作用域中所有 watcher 都求值（angular 脏检查实现方式的缺点）。特殊的是，对于数组，需要通过包裹数组的可变方法（比如 push）来监听数组的变化。在添加 / 删除属性，或是修改数组特定位置元素时，也需要调用特定的函数，如 obj.$add(key, value) 才能触发更新。这是受 ES5 的语言特性所限。

组件系统：

应用类 UI 可以看作全部是由组件树构成的。

注册一个组件：

```
Vue.component('my-component', {
    // 模板
    template: '<div>{{msg}} {{privateMsg}}</div>',
    // 接受参数
    props: {
        msg: String    
    },
    // 私有数据，需要在函数中返回以避免多个实例共享一个对象
    data: function () {
        return {
            privateMsg: 'component!'
        }
    }
})
<my-component msg="hello"></my-component>复制代码
```

组件的核心选项

1 模板（template）：模板声明了数据和最终展现给用户的 DOM 之间的映射关系。
2 初始数据（data）：一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。
3 接受的外部参数 (props)：组件之间通过参数来进行数据的传递和共享。
4 方法（methods）：对数据的改动操作一般都在组件的方法内进行。
5 生命周期钩子函数（lifecycle hooks）：一个组件会触发多个生命周期钩子函数，最新 2.0 版本对于生命周期函数名称改动很大。
6 私有资源（assets）：Vue.js 当中将用户自定义的指令、过滤器、组件等统称为资源。一个组件可以声明自己的私有资源。私有资源只有该组件和它的子组件可以调用。
Webpack 是一个开源的前端模块构建工具，它提供了强大的 loader API 来定义对不同文件格式的预处理逻辑，这是. vue 后缀单文件组件形式的基础。所以在此基础上，尤大开发的 vue-loader 允许将模板、样式、逻辑三要素整合在同一个文件中，以. vue 文件后缀形成单文件组件格式，方便项目架构和开发引用。

其他特性：

1 异步批量 DOM 更新：当大量数据变动时，所有受到影响的 watcher 会被推送到一个队列中，并且每个 watcher 只会推进队列一次。这个队列会在进程的下一个 tick 异步执行。这个机制可以避免同一个数据多次变动产生的多余 DOM 操作，也可以保证所有的 DOM 写操作在一起执行，避免 DOM 读写切换可能导致的 layout。
2 动画系统：Vue.js 提供了简单却强大的动画系统，当一个元素的可见性变化时，用户不仅可以很简单地定义对应的 CSS Transition 或 Animation 效果，还可以利用丰富的 JavaScript 钩子函数进行更底层的动画处理。
3 可扩展性：除了自定义指令、过滤器和组件，Vue.js 还提供了灵活的 mixin 机制，让用户可以在多个组件中复用共同的特性。

![](https://user-gold-cdn.xitu.io/2017/9/2/45c0b734bfb8b174386fd34e889786b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### Node 与 Angular 与 Vue.js 视频教程需要视频教程的关注公众号 [代码技巧]（ID:daimajiqiao）回复 14 即可获取, 付出总会有收获

## 最后建议 Vue 2.0 的学习顺序

起步

1.  扎实的 JavaScript / HTML / CSS 基本功。这是前置条件。

2.  通读官方教程 (guide) 的基础篇。不要用任何构建工具，就只用最简单的 script，把教程里的例子模仿一遍，理解用法。不推荐上来就直接用 vue-cli 构建项目，尤其是如果没有 Node/Webpack 基础。

3.  照着官网上的示例，自己想一些类似的例子，模仿着实现来练手，加深理解。

4.  阅读官方教程进阶篇的前半部分，到『自定义指令 (Custom Directive) 』为止。着重理解 Vue 的响应式机制和组件生命周期。『渲染函数（Render Function)』如果理解吃力可以先跳过。

5.  阅读教程里关于路由和状态管理的章节，然后根据需要学习 vue-router 和 vuex。同样的，先不要管构建工具，以跟着文档里的例子理解用法为主。

1.  走完基础文档后，如果你对于基于 Node 的前端工程化不熟悉，就需要补课了。下面这些严格来说并不是 Vue 本身的内容，也不涵盖所有的前端工程化知识，但对于大型的 Vue 工程是前置条件，也是合格的『前端工程师』应当具备的知识。

前端生态 / 工程化

1.  了解 JavaScript 背后的规范，ECMAScript 的历史和目前的规范制定方式。学习 ES2015/16 的新特性，理解 ES2015 modules，适当关注还未成为标准的提案。

2.  学习命令行的使用。建议用 Mac。

3.  学习 Node.js 基础。建议使用 nvm 这样的工具来管理机器上的 Node 版本，并且将 npm 的 registry 注册表配置为淘宝的镜像源。至少要了解 npm 的常用命令，npm scripts 如何使用，语义化版本号规则，CommonJS 模块规范（了解它和 ES2015 Modules 的异同），Node 包的解析规则，以及 Node 的常用 API。应当做到可以自己写一些基本的命令行程序。注意最新版本的 Node (6+) 已经支持绝大部分 ES2015 的特性，可以借此巩固 ES2015。

4.  了解如何使用 / 配置 Babel 来将 ES2015 编译到 ES5 用于浏览器环境。

5.  学习 Webpack。Webpack 是一个极其强大同时也复杂的工具，作为起步，理解它的『一切皆模块』的思想，并基本了解其常用配置选项和 loader 的概念 / 使用方法即可，比如如何搭配 Webpack 使用 Babel。学习 Webpack 的一个挑战在于其本身文档的混乱，建议多搜索搜索，应该还是有质量不错的第三方教程的。英文好的建议阅读 Webpack 2.0 的文档，比起 1.0 有极大的改善，但需要注意和 1.0 的不兼容之处。

Vue 进阶

1.  有了 Node 和 Webpack 的基础，可以通过 vue-cli 来搭建基于 Webpack ，并且支持单文件组件的项目了。建议用 webpack-simple 这个模板开始，并阅读官方教程进阶篇剩余的内容以及 vue-loader 的文档，了解一些进阶配置。有兴趣的可以自己亲手从零开始搭一个项目加深理解。

2.  根据 例子 尝试在 Webpack 模板基础上整合 vue-router 和 vuex

3.  深入理解 Virtual DOM 和『渲染函数 (Render Functions)』这一章节（可选择性使用 JSX)，理解模板和渲染函数之间的对应关系，了解其使用方法和适用场景。

4.  （可选）根据需求，了解服务端渲染的使用（需要配合 Node 服务器开发的知识）。其实更重要的是理解它所解决的问题并搞清楚你是否需要它。

5.  阅读开源的 Vue 应用、组件、插件源码，自己尝试编写开源的 Vue 组件、插件。