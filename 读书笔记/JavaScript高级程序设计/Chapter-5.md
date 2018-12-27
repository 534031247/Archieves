# Chapter-5

## 没有重载

```javascript
function add(num) {
	return num + 100
}

function add(num) {
	return num + 200
}
var result = add(100)
```

输出结果是300。

因为**后面的函数覆盖了前面的函数**

等同于：

```javascript
var add = function (num) {
    return num + 100
}

add = function (num) {
    return num + 200
}
```

## 函数内部属性：callee

> `callee`是一个指针，指向拥有函数`arguments`对象的函数

举例：

```javascript
function fac(num) {
	if (num <= 1)	return 1;
    else return num * arguments.callee(num - 1);
}
var fac2 = fac;
fac = function() {
	return 0;
}
alert(fac2(5));
alert(fac(5));
```

一个输出120，另外一个输出0。

在此,变量 trueFactorial 获得了 factorial 的值,实际上是在另一个位置上保存了一个函数
的指针。然后,我们又将一个简单地返回 0 的函数赋值给 factorial 变量。如果像原来的 factorial()
那样不使用 arguments.callee ,调用 trueFactorial() 就会返回 0。可是,在解除了函数体内的代
码与函数名的耦合状态之后, trueFactorial() 仍然能够正常地计算阶乘;至于 factorial() ,它现
在只是一个返回 0 的函数。

使用`callee`可以解除函数体内的代码与函数名的耦合。



## 函数内部属性：apply、call

详见红宝书：P135

**自己实现apply、call**

```javascript
this.color = 'red'
const o = { color: 'blue' }
function sayColor() {
  console.log(this.color)
}
o.sayColor = sayColor
sayColor()		//"red"
o.sayColor()		//"blue"
```

