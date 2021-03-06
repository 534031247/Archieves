> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://github.com/ljianshu/Blog/issues/20

## 前言

面向对象编程很重要的一个方面，就是对象的继承。**A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法**。这对于代码的复用是非常有用的。

大部分面向对象的编程语言，都是通过 “类”（class）实现对象的继承。传统上，JavaScript 语言的继承不通过 class(ES6 引入了 class 语法)，而是通过 “原型对象”（prototype）实现。那么在 JS 中常见的继承方式有几种呢？

如需本文源码，请猛戳 **[常见的六种继承方式](https://github.com/ljianshu/Blog/blob/master/oop%E7%BB%A7%E6%89%BF%E5%85%AD%E7%A7%8D%E6%96%B9%E5%BC%8F.html)**

**如果觉得文章对你有些许帮助，欢迎在[我的 GitHub 博客](https://github.com/ljianshu/Blog)点赞和关注，感激不尽！**

## 方式一、原型链继承

这种方式关键在于: **子类型的原型为父类型的一个实例对象。**

```
//父类型
 function Person(name, age) {
   this.name = name,
   this.age = age,
   this.play = [1, 2, 3]
   this.setName = function () {}
 }
 Person.prototype.setAge = function () {}
 //子类型
 function Student(price) {
   this.price = price
   this.setScore = function () {}
 }
 Student.prototype = new Person() // 子类型的原型为父类型的一个实例对象
 var s1 = new Student(15000)
 var s2 = new Student(14000)
 console.log(s1,s2)     

```

[![](https://camo.githubusercontent.com/a51e629e193322abcf19aca6de503d2474781659/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346465363034396330656332323f773d39383326683d32353526663d706e6726733d3431333134)](https://camo.githubusercontent.com/a51e629e193322abcf19aca6de503d2474781659/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346465363034396330656332323f773d39383326683d32353526663d706e6726733d3431333134)
但这种方式实现的本质是通过将子类的原型指向了父类的实例，所以**子类的实例就可以通过__proto__访问到 Student.prototype 也就是 Person 的实例，这样就可以访问到父类的私有方法，然后再通过__proto__指向父类的 prototype 就可以获得到父类原型上的方法**。于是做到了将父类的私有、公有方法和属性都当做子类的公有属性

**子类继承父类的属性和方法是将父类的私有属性和公有方法都作为自己的公有属性和方法**，我们都知道在操作基本数据类型的时候操作的是值，在操作引用数据类型的时候操作的是地址，如果说父类的私有属性中有引用类型的属性，那它被子类继承的时候会作为公有属性，这样子类 1 操作这个属性的时候，就会影响到子类 2。

```
s1.play.push(4)
console.log(s1.play, s2.play)
console.log(s1.__proto__ === s2.__proto__)//true
console.log(s1.__proto__.__proto__ === s2.__proto__.__proto__)//true      

```

[![](https://camo.githubusercontent.com/b5c7f1c365cb38091701b5a6a1f720f3b0fc6996/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346465316634393233366238343f773d38373226683d31353026663d706e6726733d3138383638)](https://camo.githubusercontent.com/b5c7f1c365cb38091701b5a6a1f720f3b0fc6996/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346465316634393233366238343f773d38373226683d31353026663d706e6726733d3138383638)
s1 中 play 属性发生变化，与此同时，s2 中 play 属性也会跟着变化。

另外注意一点的是，**我们需要在子类中添加新的方法或者是重写父类的方法时候，切记一定要放到替换原型的语句之后**

```
function Person (name, age) {
 this.name = name,
 this.age = age
}
Person.prototype.setAge = function () {
 console.log("111")
}
function Student (price) {
 this.price = price
 this.setScore = function () { }
}
// Student.prototype.sayHello = function () { }//在这里写子类的原型方法和属性是无效的，
//因为会改变原型的指向，所以应该放到重新指定之后
Student.prototype = new Person()
Student.prototype.sayHello = function () { }
var s1 = new Student(15000)
console.log(s1)      

```

**特点**：

*   父类新增原型方法 / 原型属性，子类都能访问到
*   简单，易于实现

**缺点**：

*   无法实现多继承
*   来自原型对象的所有属性被所有实例共享
*   创建子类实例时，无法向父类构造函数传参
*   要想为子类新增属性和方法，必须要在`Student.prototype = new Person()` 之后执行，不能放到构造器中

## 方式二: 借用构造函数继承

这种方式关键在于: **在子类型构造函数中通用 call() 调用父类型构造函数**

```
  function Person(name, age) {
    this.name = name,
    this.age = age,
    this.setName = function () {}
  }
  Person.prototype.setAge = function () {}
  function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
  }
  var s1 = new Student('Tom', 20, 15000)

```

[![](https://camo.githubusercontent.com/f14aa910b41e399bf08bf24df6e691daa5f89a48/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346461656634633164353262333f773d3130303126683d31333226663d706e6726733d3238323234)](https://camo.githubusercontent.com/f14aa910b41e399bf08bf24df6e691daa5f89a48/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346461656634633164353262333f773d3130303126683d31333226663d706e6726733d3238323234)
这种方式只是实现部分的继承，如果父类的原型还有方法和属性，子类是拿不到这些方法和属性的。

```
console.log(s1.setAge())//Uncaught TypeError: s1.setAge is not a function

```

**特点**：

*   解决了原型链继承中子类实例共享父类引用属性的问题
*   创建子类实例时，可以向父类传递参数
*   可以实现多继承 (call 多个父类对象)

**缺点**：

*   实例并不是父类的实例，只是子类的实例
*   只能继承父类的实例属性和方法，不能继承原型属性和方法
*   无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

## 方式三: 原型链 + 借用构造函数的组合继承

这种方式关键在于: **通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。**

```
function Person (name, age) {
  this.name = name,
  this.age = age,
  this.setAge = function () { }
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () { }
}
Student.prototype = new Person()
Student.prototype.constructor = Student//组合继承也是需要修复构造函数指向的
Student.prototype.sayHello = function () { }
var s1 = new Student('Tom', 20, 15000)
var s2 = new Student('Jack', 22, 14000)
console.log(s1)
console.log(s1.constructor) //Student
console.log(p1.constructor) //Person       

```

[![](https://camo.githubusercontent.com/bf4bb04dd685f54b7bb4495d9a29aa0a993bb14b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346536633062666336373238313f773d39383926683d33303926663d706e6726733d3334323338)](https://camo.githubusercontent.com/bf4bb04dd685f54b7bb4495d9a29aa0a993bb14b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f372f313636346536633062666336373238313f773d39383926683d33303926663d706e6726733d3334323338)
这种方式融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。不过也存在缺点就是无论在什么情况下，都会调用两次构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数的内部，子类型最终会包含父类型对象的全部实例属性，但我们不得不在调用子类构造函数时重写这些属性。

**优点**：

*   可以继承实例属性 / 方法，也可以继承原型属性 / 方法
*   不存在引用属性共享问题
*   可传参
*   函数可复用

**缺点**：

*   调用了两次父类构造函数，生成了两份实例

## 方式四: 组合继承优化 1

**这种方式通过父类原型和子类原型指向同一对象，子类可以继承到父类的公有方法当做自己的公有方法，而且不会初始化两次实例方法 / 属性，避免的组合继承的缺点**。

```
function Person (name, age) {
  this.name = name,
  this.age = age,
  this.setAge = function () { }
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () { }
}
Student.prototype = Person.prototype
Student.prototype.sayHello = function () { }
var s1 = new Student('Tom', 20, 15000)
console.log(s1)       

```

[![](https://camo.githubusercontent.com/1662d8f5f75d7ce06bb000869747e3f401e5d6ba/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353330393737643039643331633f773d37323626683d32323326663d706e6726733d3233343538)](https://camo.githubusercontent.com/1662d8f5f75d7ce06bb000869747e3f401e5d6ba/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353330393737643039643331633f773d37323626683d32323326663d706e6726733d3233343538)
但这种方式没办法辨别是对象是子类还是父类实例化

```
console.log(s1 instanceof Student, s1 instanceof Person)//true true
console.log(s1.constructor)//Person

```

**优点**：

*   不会初始化两次实例方法 / 属性，避免的组合继承的缺点

**缺点**：

*   没办法辨别是实例是子类还是父类创造的，子类和父类的构造函数指向是同一个。

## 方式五: 组合继承优化 2

**借助原型可以基于已有的对象来创建对象，`var B = Object.create(A)`以 A 对象为原型，生成了 B 对象。B 继承了 A 的所有属性和方法。**

```
function Person (name, age) {
  this.name = name,
  this.age = age
}
Person.prototype.setAge = function () {
  console.log("111")
}
function Student (name, age, price) {
  Person.call(this, name, age)
  this.price = price
  this.setScore = function () { }
}
Student.prototype = Object.create(Person.prototype)//核心代码
Student.prototype.constructor = Student//核心代码
var s1 = new Student('Tom', 20, 15000)
console.log(s1 instanceof Student, s1 instanceof Person) // true true
console.log(s1.constructor) //Student
console.log(s1)       

```

同样的，Student 继承了所有的 Person 原型对象的属性和方法。目前来说，最完美的继承方法！
[![](https://camo.githubusercontent.com/d208000899c75a204a397d0fad7826fcd3eec98d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f31312f313636363066616365333034306463363f773d36363826683d31383726663d706e6726733d3230333134)](https://camo.githubusercontent.com/d208000899c75a204a397d0fad7826fcd3eec98d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f31312f313636363066616365333034306463363f773d36363826683d31383726663d706e6726733d3230333134)

## 方式六：ES6 中 class 的继承

ES6 中引入了 class 关键字，class 可以通过 extends 关键字实现继承，还可以通过 static 关键字定义类的静态方法, 这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

**需要注意的是，class 关键字只是原型的语法糖，JavaScript 继承仍然是基于原型实现的**。

```
class Person {
  //调用类的构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  //定义一般的方法
  showName () {
    console.log("调用父类的方法")
    console.log(this.name, this.age);
  }
}
let p1 = new Person('kobe', 39)
console.log(p1)
//定义一个子类
class Student extends Person {
  constructor(name, age, salary) {
    super(name, age)//通过super调用父类的构造方法
    this.salary = salary
  }
  showName () {//在子类自身定义方法
    console.log("调用子类的方法")
    console.log(this.name, this.age, this.salary);
  }
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()     

```

[![](https://camo.githubusercontent.com/b523c13dfd9ef012d9f74df994105ebd9e866238/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353337653636323733636264373f773d38353126683d33353926663d706e6726733d3434353439)](https://camo.githubusercontent.com/b523c13dfd9ef012d9f74df994105ebd9e866238/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f382f313636353337653636323733636264373f773d38353126683d33353926663d706e6726733d3434353439)
**优点**：

*   语法简单易懂, 操作更方便

**缺点**：

*   并不是所有的浏览器都支持 class 关键字

## 参考文章

*   [JS 实现继承的几种方式](http://www.cnblogs.com/humin/p/4556820.html)
*   [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
*   [JavaScript 常见的继承方式](https://juejin.im/entry/5993eeaa51882524382f3c0b)
*   [阮一峰 ES6 入门之 class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)