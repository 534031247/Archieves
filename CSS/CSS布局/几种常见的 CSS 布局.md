> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247483708&idx=1&sn=8b8ecd6ab05d1483d3f9a0f94e8acefe&chksm=c06680aaf71109bc421159ae51e2df30d34163654dc25611b75e4e5bb1566d9e0111c35eb9e3&mpshare=1&scene=1&srcid=&pass_ticket=Iy%2Fl3L7Uw1hq9za%2FwbitwiaIMzHZ27XR%2Fe%2BWy%2FLj2t8%3D#rd

## 本文概要

本文将介绍如下几种常见的布局：

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWkkf8fayL2tkLxpV6aK3uoO3csJibYUfmG4uF4G9aBtiaNjzcOc3z2wFA/640?wx_fmt=png)

其中实现三栏布局有多种方式，本文着重介绍圣杯布局和双飞翼布局。另外几种可以猛戳实现三栏布局的几种方法

## 一、单列布局

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWgmWWpGhGK16YWNZMsRCic7SticcD8yDBLkMo7rCmcdCGRHmrVQyewTWw/640?wx_fmt=png)

常见的单列布局有两种：

*   header,content 和 footer 等宽的单列布局

*   header 与 footer 等宽, content 略窄的单列布局

### 1\. 如何实现

对于第一种，先通过对 header,content,footer 统一设置 width：1000px; 或者 max-width：1000px(这两者的区别是当屏幕小于 1000px 时，前者会出现滚动条，后者则不会，显示出实际宽度); 然后设置 margin:auto 实现居中即可得到。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div class="header"></div>`

2.  `<div class="content"></div>`

3.  `<div class="footer"></div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.header{`

2.  `margin:0 auto;` 

3.  `max-width: 960px;`

4.  `height:100px;`

5.  `background-color: blue;`

6.  `}`

7.  `.content{`

8.  `margin: 0 auto;`

9.  `max-width: 960px;`

10.  `height: 400px;`

11.  `background-color: aquamarine;`

12.  `}`

13.  `.footer{`

14.  `margin: 0 auto;`

15.  `max-width: 960px;`

16.  `height: 100px;`

17.  `background-color: aqua;`

18.  `}`

</pre>

对于第二种，header、footer 的内容宽度不设置，块级元素充满整个屏幕，但 header、content 和 footer 的内容区设置同一个 width，并通过 margin:auto 实现居中。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div class="header">`

2.  `<div class="nav"></div>`

3.  `</div>`

4.  `<div class="content"></div>`

5.  `<div class="footer"></div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.header{`

2.  `margin:0 auto;`

3.  `max-width: 960px;`

4.  `height:100px;`

5.  `background-color: blue;`

6.  `}`

7.  `.nav{`

8.  `margin: 0 auto;`

9.  `max-width: 800px;`

10.  `background-color: darkgray;`

11.  `height: 50px;`

12.  `}`

13.  `.content{`

14.  `margin: 0 auto;`

15.  `max-width: 800px;`

16.  `height: 400px;`

17.  `background-color: aquamarine;`

18.  `}`

19.  `.footer{`

20.  `margin: 0 auto;`

21.  `max-width: 960px;`

22.  `height: 100px;`

23.  `background-color: aqua;`

24.  `}`

</pre>

## 二、两列自适应布局

**两列自适应布局是指一列由内容撑开，另一列撑满剩余宽度的布局方式**

### 1.float+overflow:hidden

如果是普通的两列布局，**浮动 + 普通元素的 margin** 便可以实现，但如果是自适应的两列布局，利用 **float+overflow:hidden** 便可以实现，这种办法主要通过 overflow 触发 BFC, 而 BFC 不会重叠浮动元素。由于设置 overflow:hidden 并不会触发 IE6 - 浏览器的 haslayout 属性，所以需要设置 zoom:1 来兼容 IE6 - 浏览器。具体代码如下：

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div class="parent" style="background-color: lightgrey;">`

2.  `<div class="left" style="background-color: lightblue;">`

3.  `<p>left</p>`

4.  `</div>`

5.  `<div class="right"  style="background-color: lightgreen;">`

6.  `<p>right</p>`

7.  `<p>right</p>`

8.  `</div>`

9.  `</div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.parent {`

2.  `overflow: hidden;`

3.  `zoom: 1;`

4.  `}`

5.  `.left {`

6.  `float: left;`

7.  `margin-right: 20px;`

8.  `}`

9.  `.right {`

10.  `overflow: hidden;`

11.  `zoom: 1;`

12.  `}`

</pre>

**注意点: 如果侧边栏在右边时，注意渲染顺序。即在 HTML 中，先写侧边栏后写主内容**

### 2.Flex 布局

Flex 布局，也叫弹性盒子布局，区区简单几行代码就可以实现各种页面的的布局。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `//html部分同上`

2.  `.parent {`

3.  `display:flex;`

4.  `}  `

5.  `.right {`

6.  `margin-left:20px;` 

7.  `flex:1;`

8.  `}`

</pre>

### 3.grid 布局

Grid 布局，是一个基于网格的二维布局系统，目的是用来优化用户界面设计。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `//html部分同上`

2.  `.parent {`

3.  `display:grid;`

4.  `grid-template-columns:auto 1fr;`

5.  `grid-gap:20px`

6.  `}` 

</pre>

## 三、三栏布局

**特征：中间列自适应宽度，旁边两侧固定宽度**

### 1\. 圣杯布局

#### ① 特点

**比较特殊的三栏布局，同样也是两边固定宽度，中间自适应，唯一区别是 dom 结构必须是先写中间列部分，这样实现中间列可以优先加载**。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.container {`

2.  `padding-left: 220px;//为左右栏腾出空间`

3.  `padding-right: 220px;`

4.  `}`

5.  `.left {`

6.  `float: left;`

7.  `width: 200px;`

8.  `height: 400px;`

9.  `background: red;`

10.  `margin-left: -100%;`

11.  `position: relative;`

12.  `left: -220px;`

13.  `}`

14.  `.center {`

15.  `float: left;`

16.  `width: 100%;`

17.  `height: 500px;`

18.  `background: yellow;`

19.  `}`

20.  `.right {`

21.  `float: left;`

22.  `width: 200px;`

23.  `height: 400px;`

24.  `background: blue;`

25.  `margin-left: -200px;`

26.  `position: relative;`

27.  `right: -220px;`

28.  `}`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<article class="container">`

2.  `<div class="center">`

3.  `<h2>圣杯布局</h2>`

4.  `</div>`

5.  `<div class="left"></div>`

6.  `<div class="right"></div>`

7.  `</article>`

</pre>

#### ② 实现步骤

*   三个部分都设定为左浮动，**否则左右两边内容上不去，就不可能与中间列同一行**。然后设置 center 的宽度为 100%(**实现中间列内容自适应**)，此时，left 和 right 部分会跳到下一行

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWbRkAo4VgMfZncTCxsPmsTN9wSlF3XZm2EMdoogUP7PiaqLtjNliaNVug/640?wx_fmt=png)

*   通过设置 margin-left 为负值让 left 和 right 部分回到与 center 部分同一行

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWFQEhZiaOYfTWUfEpiceyvJ0yI6fpZjHLZA0bv1Nd9e7qAicxicZYlibia1nw/640?wx_fmt=png)

*   通过设置父容器的 padding-left 和 padding-right，让左右两边留出间隙。

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWJvMJoUWiayDflP8VwStdupDmTz7OMBxicyicBv8FHm3ibAjbDBugLJWekA/640?wx_fmt=png)

*   通过设置相对定位，让 left 和 right 部分移动到两边。

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWQlZb54ia9ssLMjyWicibAMMR0RibnQ2cpytzeKic8nxHV5icgAd6jmWy3AXA/640?wx_fmt=png)

#### ③ 缺点

*   center 部分的最小宽度不能小于 left 部分的宽度，否则会 left 部分掉到下一行

*   如果其中一列内容高度拉长 (如下图)，其他两列的背景并不会自动填充。(借助等高布局正 padding + 负 margin 可解决，下文会介绍)

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWJBtURia9QHecbT42q1u85GcutGibEVq3w7BakWTwibpO23NL2tLQO1xiaA/640?wx_fmt=png)

### 2\. 双飞翼布局

#### ① 特点

**同样也是三栏布局，在圣杯布局基础上进一步优化，解决了圣杯布局错乱问题，实现了内容与布局的分离。而且任何一栏都可以是最高栏，不会出问题**。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.container {`

2.  `min-width: 600px;//确保中间内容可以显示出来，两倍left宽+right宽`

3.  `}`

4.  `.left {`

5.  `float: left;`

6.  `width: 200px;`

7.  `height: 400px;`

8.  `background: red;`

9.  `margin-left: -100%;`

10.  `}`

11.  `.center {`

12.  `float: left;`

13.  `width: 100%;`

14.  `height: 500px;`

15.  `background: yellow;`

16.  `}`

17.  `.center .inner {`

18.  `margin: 0 200px; //新增部分`

19.  `}`

20.  `.right {`

21.  `float: left;`

22.  `width: 200px;`

23.  `height: 400px;`

24.  `background: blue;`

25.  `margin-left: -200px;`

26.  `}`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<article class="container">`

2.  `<div class="center">`

3.  `<div class="inner">双飞翼布局</div>`

4.  `</div>`

5.  `<div class="left"></div>`

6.  `<div class="right"></div>`

7.  `</article>`

</pre>

#### ② 实现步骤 (前两步与圣杯布局一样)

*   三个部分都设定为左浮动，然后设置 center 的宽度为 100%，此时，left 和 right 部分会跳到下一行；

*   通过设置 margin-left 为负值让 left 和 right 部分回到与 center 部分同一行；

*   center 部分增加一个内层 div，并设 margin: 0 200px；

#### ③ 缺点

**多加一层 dom 树节点，增加渲染树生成的计算量**。

### 3\. 两种布局实现方式对比:

*   两种布局方式都是把主列放在文档流最前面，使主列优先加载。

*   两种布局方式在实现上也有相同之处，都是让三列浮动，然后通过负外边距形成三列布局。

*   两种布局方式的不同之处在于如何处理中间主列的位置： **圣杯布局是利用父容器的左、右内边距 + 两个从列相对定位**； **双飞翼布局是把主列嵌套在一个新的父级块中利用主列的左、右外边距进行布局调整**

## 四、等高布局

等高布局是指子元素在父元素中高度相等的布局方式。接下来我们介绍常见几种实现方式：

### 1\. 利用正 padding + 负 margin

我们通过等布局便可解决圣杯布局的第二点缺点，因为背景是在 padding 区域显示的，**设置一个大数值的 padding-bottom，再设置相同数值的负的 margin-bottom，并在所有列外面加上一个容器，并设置 overflow:hidden 把溢出背景切掉**。这种可能实现多列等高布局，并且也能实现列与列之间分隔线效果，结构简单，兼容所有浏览器。新增代码如下：

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.center,`

2.  `.left,`

3.  `.right {`

4.  `padding-bottom: 10000px;`

5.  `margin-bottom: -10000px;`

6.  `}`

7.  `.container {`

8.  `padding-left: 220px;`

9.  `padding-right: 220px;`

10.  `overflow: hidden;//把溢出背景切掉`

11.  `}`

</pre>

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWKm5GSezcYMCLMWq6sD3p0Xu6Y2McgictrHZcz0YVtWQ8AtkY4LugRSQ/640?wx_fmt=png)

### 2\. 利用背景图片

这种方法是我们实现等高列最早使用的一种方法，就是使用背景图片，在列的父元素上使用这个背景图进行 Y 轴的铺放，从而实现一种等高列的假象。实现方法简单，兼容性强，不需要太多的 css 样式就可以轻松实现, 但此方法不适合流体布局等高列的布局。

在制作样式之前需要一张类似下面的背景图：

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZWgT02s13kQAbia7YqEXqY3zkwlDW99BSag6ckyqeALtsDAJgpmoZaeSw/640?wx_fmt=gif)

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div class=”container clearfix”>`

2.  `<div class=”left”></div>`

3.  `<div  class=”content”></div>`

4.  `<div class=”right”></div>`

5.  `</div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.container {`

2.  `background: url("column.png") repeat-y;`

3.  `width: 960px;`

4.  `margin: 0 auto;`

5.  `}`

6.  `.left {`

7.  `float: left;`

8.  `width: 220px;`

9.  `}`

10.  `.content {`

11.  `float: left;`

12.  `width: 480px;`

13.  `}`

14.  `.right {`

15.  `float: left;`

16.  `width: 220px;`

17.  `}`

</pre>

### 3\. 模仿表格布局

这是一种非常简单，易于实现的方法。不过兼容性不好，在 ie6-7 无法正常运行。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div class="container table">`

2.  `<div class="containerInner tableRow">`

3.  `<div class="column tableCell cell1">`

4.  `<div class="left aside">`

5.  `....`

6.  `</div>`

7.  `</div>`

8.  `<div class="column tableCell cell2">`

9.  `<div class="content section">`

10.  `...`

11.  `</div>`

12.  `</div>`

13.  `<div class="column tableCell cell3">`

14.  `<div class="right aside">`

15.  `...`

16.  `</div>`

17.  `</div>`

18.  `</div>`

19.  `</div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `.table {`

2.  `width: auto;`

3.  `min-width: 1000px;`

4.  `margin: 0 auto;`

5.  `padding: 0;`

6.  `display: table;`

7.  `}`

8.  `.tableRow {`

9.  `display: table-row;`

10.  `}`

11.  `.tableCell {`

12.  `display: table-cell;`

13.  `width: 33%;`

14.  `}`

15.  `.cell1 {`

16.  `background: #f00;`

17.  `height: 800px;`

18.  `}`

19.  `.cell2 {`

20.  `background: #0f0;`

21.  `}`

22.  `.cell3 {`

23.  `background: #00f;`

24.  `}`

</pre>

### 4\. 使用边框和定位

这种方法是使用边框和绝对定位来实现一个假的高度相等列的效果。结构简单，兼容各浏览器，容易掌握。假设你需要实现一个两列等高布局，侧栏高度要和主内容高度相等。

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `#wrapper {`

2.  `width: 960px;`

3.  `margin: 0 auto;`

4.  `}`

5.  `#mainContent {`

6.  `border-right: 220px solid #dfdfdf;`

7.  `position: absolute;`

8.  `width: 740px;`

9.  `height: 800px;`

10.  `background: green;`

11.  `}`

12.  `#sidebar {`

13.  `background: #dfdfdf;`

14.  `margin-left: 740px;`

15.  `position: absolute;`

16.  `height: 800px;`

17.  `width: 220px;`

18.  `}`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div id="wrapper">`

2.  `<div id="mainContent">...</div>`

3.  `<div id="sidebar">...</div>`

4.  `</div>`

</pre>

## 五、粘连布局

### 1\. 特点

*   有一块内容 `<main>`，当 `<main>`的高康足够长的时候，紧跟在 `<main>`后面的元素 `<footer>`会跟在 `<main>`元素的后面。

*   当 `<main>`元素比较短的时候 (比如小于屏幕的高度), 我们期望这个 `<footer>`元素能够 “粘连” 在屏幕的底部

![](https://mmbiz.qpic.cn/mmbiz_png/zewrLkrYfsO5XKSbiaribdfKJBC7oeG7ZW9mktaib1icjA583SptZ0klMIQ5zxwyWgx8fbAgkzt3Slu02ial4YoqrEw/640?wx_fmt=png)

具体代码如下：

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `<div id="wrap">`

2.  `<div class="main">`

3.  `main <br />`

4.  `main <br />`

5.  `main <br />`

6.  `</div>`

7.  `</div>`

8.  `<div id="footer">footer</div>`

</pre>

<pre style="box-sizing: border-box;margin-top: 0px;margin-bottom: 0px;padding: 8px 0px 6px;background-color: rgb(241, 239, 238);border-radius: 0px;overflow-y: auto;color: rgb(80, 97, 109);text-align: start;font-size: 10px;line-height: 12px;font-family: consolas, menlo, courier, monospace, &quot;Microsoft Yahei&quot;!important;border-width: 1px !important;border-style: solid !important;border-color: rgb(226, 226, 226) !important;">

1.  `* {`

2.  `margin: 0;`

3.  `padding: 0;`

4.  `}`

5.  `html,`

6.  `body {`

7.  `height: 100%;//高度一层层继承下来`

8.  `}`

9.  `#wrap {`

10.  `min-height: 100%;`

11.  `background: pink;`

12.  `text-align: center;`

13.  `overflow: hidden;`

14.  `}`

15.  `#wrap .main {`

16.  `padding-bottom: 50px;`

17.  `}`

18.  `#footer {`

19.  `height: 50px;`

20.  `line-height: 50px;`

21.  `background: deeppink;`

22.  `text-align: center;`

23.  `margin-top: -50px;`

24.  `}`

</pre>

### 2\. 实现步骤

#### (1)footer 必须是一个独立的结构，与 wrap 没有任何嵌套关系

#### (2)wrap 区域的高度通过设置 min-height，变为视口高度

#### (3)footer 要使用 margin 为负来确定自己的位置

#### (4) 在 main 区域需要设置 padding-bottom。这也是为了防止负 margin 导致 footer 覆盖任何实际内容。

**于 2019.1.2 重新修改，如果觉得文章对你有些许帮助，欢迎在我的 GitHub 博客点赞和关注，感激不尽！**

## 参考文章

*   双飞翼布局介绍 - 始于淘宝 UED

*   CSS 三栏布局的四种方法

*   CSS 两列布局 --- 左侧固定，右侧自适应

*   两列自适应布局的四种思路

*   css 常见布局之九：三栏布局的常见实现

*   【布局】聊聊为什么淘宝要提出「双飞翼」布局

*   CSS 的单列布局与二 & 三列布局