# （搬运）可能是最全的CSS居中解决方案

> 本篇文章大部分翻译自CSS-TRICKS，由于是英文版的，对于我来说看起来始终没有中文快，无法达到随用随记、一目十行的效果， 特此翻译，顺便总结消化一下， 原文链接🔗https://css-tricks.com/centering-css-complete-guide/

## 前言

居中是CSS中最被人诟病的地方之一。为什么在CSS中实现居中这么难呢？我认为难的并不是单纯地使用CSS实现居中，难的是实现为了实现居中，产生了各种各样的奇淫巧技。在多种应用场景下，我们往往不知道使用哪种方法去实现它。



所以本文采用决策树的行文形式来缓解我们的选择困难症😎



现在我们想要在项目中实现居中：



## 水平方向（Horizontally）

### 内联元素（inline)

你可以使用`text-align: center`将块级（block）元素下的内联（inline）元素水平居中：

```css
.center-children {
    text-align: center;
}
```

这个适用于`inline`, `inline-block`, `inline-table`, `inline-flex`等。



### 块级元素（block）

你可以让块级元素的`margin-left`和`margin-right`等于`auto`来达到水平居中的效果（**但是这个块级元素必须设置了宽度，否则就会占满整个宽度**），通常这样简写：

```css
.center-me {
    margin: 0 auto;
}
```

无论你所要居中的块级元素以及包裹块级元素的父元素宽度如何，这个方法均有用。

**需要注意的是`float`是没有`center`属性的**，如果你想要使用`float`，[这有个办法](https://css-tricks.com/float-center/)



### 不止一个块级元素？

如果你有两个或者更多的块级元素居中排列在一行中，这有两种方法：1. 设置他们的`display`属性为`inline-block`  2. 使用弹性盒子布局（flex）

1. 设置`display`属性

   

2. `flex`布局