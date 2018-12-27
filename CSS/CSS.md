# CSS

---

## width 设置为 auto 和 100% 的区别

- width:100% 并不包含margin-left  margin-right的属性值，直接取其父容器的宽度加上含margin-left /margin-right的值。如果设置了margin那新的width值是容器的宽度加上margin的值。
- width:auto包含margin-left/margin-right的属性值。其值包含margin-left /margin-right的值。width:auto总是占据整行！！！这其中margin的值已经包含其中了（也就是一整行）如果要设置margin的值那就用一整行然后减去margin的值就得到了现在的宽度了。减去的这个值就是相应边得空白。显著的特征是这个没有横向滚动条出现也就是宽度没有增加。

## CSS的组成

规则 --> 选择器+声明块 --> 声明 --> 属性和属性值组成的键值对

## CSS选择顺序

例如：```div ul li #item {} ``` 顺序是**从右向左**，原因在于这样可以**一次选中目标** 



## LVHA

> CSS中，编写a标签的伪类样式时，应该遵循LVHA的顺序。

举例：我想让未访问链接颜色为蓝色，活动链接为绿色，已访问链接为红色

- 第一种情况：我定义的顺序是a:visited、a:hover、a:link，这时会发现：把鼠标放到未访问过的蓝色链接上时，它并不变成绿色，只有放在已访问的红色链接上，链接才会变绿。
- 第二种情况：我把CSS定义顺序调整为：a:link、a:visited、a:hover，这时，无论你鼠标经过的链接有没有被访问过，它都会变成绿色啦。

这是因为，**一个鼠标经过的未访问链接同时拥有a:link、a:hover两种属性**，在第一种情况下，a:link离它最近，所以它优先满足a:link，而放弃a:hover的重复定义。
在第二种情况，无论链接有没有被访问过，它首先要检查是否符合a:hover的标准（即是否有鼠标经过它），满足，则变成绿色，不满足，则继续向上查找，一直找到满足条件的定义为止。

一句话：**在CSS中，如果对于相同元素有针对不同条件的定义，宜将最一般的条件放在最上面，并依次向下，保证最下面的是最特殊的条件。**
这样，浏览器在显示元素时，才会从特殊到一般、逐级向上验证条件，才会使你的每一个CSS语句都起到效果。
当然，如果故意打乱顺序，也会造成一些特殊的效果。比如，可以为链接制造出下划线颜色与文字颜色的差异。

## CSS实现一个简单选项卡

![](/media/yeoman_li/Sandisk/archive/images/Screenshot from 2018-09-13 20-21-24.png)

![](/media/yeoman_li/Sandisk/archive/images/Screenshot from 2018-09-13 20-21-55.png)

![](/media/yeoman_li/Sandisk/archive/images/Screenshot from 2018-09-13 20-22-07.png)

代码：

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo-01</title>
<style>
	a {
		text-decoration: none;
	}	

	div {
		display: none;
		width: 200px;
		height: 200px;
		background-color: #bfa;
		text-align: center;
		font: 50px/200px "Ubuntu";
	}
	
	:target {
		display: block;
	}
</style>
</head>
<body>
	<a href="#div1">div1</a>
	<a href="#div2">div2</a>
	<a href="#div3">div3</a>
	<div id="div1">div1</div>
	<div id="div2">div2</div>
	<div id="div3">div3</div>
</body>
</html>
```

## nth-child 和 nth-of-type

```html
<div>
	<span>
	<span>
	...
	<p>
</div>
```

`p:nth-child(1)`不能选中

`p:nth-of-type(1)`能选中

## 文本样式

1. 虽然opacity**不是继承**元素，但是会影响到他的后代。