# Chapter-4

> JavaScript变量包含两种不同数据类型的值：**基本类型**和**引用类型**

- 基本类型

  基本类型有**5**种：`Undefined`、`Null`、`Boolean`、`Number`、`String`

  这5种基本类型都是**按值访问**的，因为可以操作保存在变量中实际的值。



- 引用类型

  这种类型的值是**保存在内存中的对象**。与其他语言不同, JavaScript 不允许直接访问内存中的位置, 也就是说不能直接操作对象的内存空间。在操作对象时,实际上是在操作对象的引用而不是实际的对象。为此,引用类型的值是按引用访问的

  ```javascript
  var obj1 = new Object{};
  var obj2 = obj1;
  obj1.name = "name";
  alert(obj2.name);
  ```

  输出："name"



## 传递参数

> **ECMAScript 中所有函数的参数都是按值传递的。**

```javascript
function setName(obj) {
	obj.name = "01";
}
var person = new Object{};
setName(person);
alrt(person.name);
```

虽然以上的代码输出的是'01'。在局部作用域中修改的对象在全局作用域中反映出来。

但是并不能说明对象是按引用传递的。

因为person指向的对象在堆内存中只有一个，而且是全局对象。

```javascript
function setName(obj) {
	obj.name = "01";
    obj = new Object();
    obj.name = "02";
}
var person = new Object{};
setName(person);
alrt(person.name);
```

这个例子中，输出仍然是一开始的01。这说明即使在函数内部修改了参数的值，但是原始的引用仍然保持不变。实际上，当在函数内部重写obj时，这个变量的引用就是一个局部的对象了。而这个局部对象会在函数执行完毕之后立即被销毁。

**可以把JavaScript函数的参数想象成局部变量**

## 小结

1. 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中；
2. 引用类型的值是对象，保存在堆内存中；
3. 包含引用类型值的变量实际上包含的并不是对象本身，而是一个**指向该对象的指针**
4. 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此**两个变量最终都指向同一个对象**
5. **ECMAScript 中所有函数的参数都是按值传递的。**



