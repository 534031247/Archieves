> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.jianshu.com/p/99d9eda110f6

## 前言

JS 需要异步处理的地方实在是比较多，比如定时器 / ajax/io 操作等等，在当今前端技术日新月异的情况下，异步编程成了核心技能之一，在这里我只是罗列一下几种我用过的异步编程方式并稍加对比。本次编写的代码全部在 node 7 + 版本中运行

### 同步和异步

首先我们要弄清同步和异步到底是个什么玩意儿，其实我的理解就是他们对代码的 “执行顺序” 控制程度不一样。为什么这样说呢？因为同步在一段代码调用之后，是不管有没有结果返回的，立马就执行到下一步去了。而异步，是会等待那个调用的，直到返回了结果再往下执行。
举个例子：假设有个抢红包的调用, 它是需要一段时间才能满足抢红包结束的

```
var result = function(){
    if(抢红包结束) return 5
}
console.log(result())

```

如果是同步，这段代码就不管 result 的死活了直接往下走，输出 undefined，如果写成异步风格的代码，那就不一样了。

### 回调函数

在前端的远古时代，回调是处理异步的不二选择，为什么，因为它的写法简单，没有多余的 api。就拿刚刚那个抢红包的例子来说，我用一个定时器替代它：

```
var result = function(){
    setTimeout(()=>{
        return 5;
    },1000)
}
console.log(result())

```

用回调函数处理怎么弄呢？很简单, 让 result 的参数为一个回调函数就可以了，于是代码变成下面这样

```
var result = function(callback){
    setTimeout(()=>{
        callback(5)
    },1000)
}
result(console.log)

```

现在我们用一个真实的 io 调用替代抢红包，新建一个 numbers.txt，在里面写若干个红包金额, 代码如下：

```
const fs = require('fs');

const readFileAsArray = function (file, cb) {
    fs.readFile(file, (err, data) => {
        if (err) return cb(err);
        const lines = data.toString().trim().split('\n');
        cb(null, lines);
    })
}

readFileAsArray('./numbers.txt', (err, lines) => {
    if (err) throw err;
    const numbers = lines.map(Number);
    console.log(`分别抢到了${numbers}块红包`);
})

```

代码输出为:

```
>分别抢到了10,11,12,13,14,15块红包

```

从代码中我们可以看到，定义了一个 readFileAsArray 函数，传两个参：文件名和回调函数，然后调用这个函数，把回调函数写入第二个参数里，就可以控制代码执行顺序了。
不过，回调的缺点就是写多了，层层嵌套，又会造成回调地狱的坑爹情况，代码变得难以维护和阅读。所以我们需要更好的解决办法。

### Promise

借用 ydjs 的一句话：Promise 实现了控制反转。什么意思呢？原来这个顺序的控制是在代码那边而不是程序员控制，现在有了 Promise，控制权就由人来掌握了，通过一系列 Promise 的方法如 then/catch/all/race 等控制异步流程。<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise 文档 </a>
还是刚刚那个抢红包的例子，这次用 Promise 来写就是这样的：

```
const fs = require('fs');

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            const lines = data.toString().split('\n');
            resolve(lines);
        })
    })
}

readFileAsArray('./numbers.txt').then(
    lines => {
        const numbers = lines.map(Number);
        console.log(`分别抢到了${numbers}块红包`);
    }
).catch(error => console.error(error));

```

结果和使用回调函数一样，但是在这里已经把控制权交给了程序员，代码也变得更好理解。虽然 Promise 有单值 / 不可取消等缺点，不过在现在大部分的情况下实现异步还是够用的。想深入了解的朋友可以去看看《你不知道的 JS》中卷第三章。

### await/async

Promise 的 api 太多了，有没有简化的办法呢？答案是肯定有的，ES7 推出了一个语法糖：await/async，它的内部封装了 Promise 和 Generator 的组合使用方式，至于 Generator 是什么，这里不再赘述，有兴趣的朋友们可以去自行研究。
于是，刚刚那段代码就变成了：

```javascript
const fs = require('fs');

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            const lines = data.toString().split('\n');
            resolve(lines);
        })
    })
}

async function result() {
    try {
        const lines = await readFileAsArray('./numbers.txt');
        const numbers = lines.map(Number);
        console.log(`分别抢到了${numbers}块红包`);
    } catch (err) {
        console.log("await出错！");        
        console.log(err);
    }
}

result();

```

这样做的结果是不是让代码可读性更高了！而且也屏蔽了 Promise 和 Generator 的细节。

### event

另一个实现异步的方式是 event，回调 (promise、await/async) 和 event 的关系就像计划经济和市场经济一样，一个是人为的强制性的控制，一个是根据需求和供给这只看不见的手控制。
还是同一个例子，用 event 写就是这样：

```
const EventEmitter = require('events');
const fs = require('fs');
class MyEventEmitter extends EventEmitter {
    executeAsy(asyncFunc, args) {
        this.emit("开始");
        console.time('执行耗时');
        asyncFunc(args, (err, data) => {
            if (err) return this.emit('error', err);
            this.emit('data', data);
            console.timeEnd('执行耗时');
            this.emit("结束");
        });
    }
}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.on('开始', () => {
    console.log('开始执行了');
})
myEventEmitter.on('data', (data) => {
    console.log(`分别抢到了${data}块红包`);
})
myEventEmitter.on('结束', () => {
    console.log('结束执行了');
})
myEventEmitter.on('error', (err) => {
    console.error(err);
})

myEventEmitter.executeAsy(fs.readFile, './numbers.txt');

```

这种事件驱动非常灵活，也不刻意去控制代码的顺序，一旦有事件的供给 (emit)，它就会立刻消费事件 (on)，不过正是因为这样，它的缺点也很明显：让程序的执行流程很不清晰。

### event+promise+await/async

纯粹的计划经济也不好，纯粹的市场经济也不好。好的方式是什么？当然是结合起来啦！
所以就有了结合 event 和 promise 的写法:

```
const EventEmitter = require('events');
const fs = require('fs');
class MyEventEmitter extends EventEmitter {
    async executeAsy(asyncFunc, args) {
        this.emit("开始");
        try {
            console.time('执行耗时');
            const data = await asyncFunc(args);
            this.emit('data', data);
            console.timeEnd('执行耗时');
            this.emit('结束');
        } catch (err) {
            console.log("出错了!");
            this.emit('error', err);
        }

    }
}

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            const lines = data.toString().split('\r\n');
            resolve(lines);
        })
    })
}
const myEventEmitter = new MyEventEmitter();

myEventEmitter.on('开始', () => {
    console.log('开始执行了');
})
myEventEmitter.on('data', (data) => {
    console.log(`分别抢到了${data}块红包`);
})
myEventEmitter.on('结束', () => {
    console.log('结束执行了');
})
myEventEmitter.on('error', (err) => {
    console.error(err);
})

myEventEmitter.executeAsy(readFileAsArray, './numbers.txt');

```

这种结合的方式基本上可以应付现今的异步场景了，缺点嘛。。。就是代码量比较多

### rxjs

js 越发壮大，jser 们终于站起来了，看着其他语言使用着 rx 这个强大的工具，我们怎么能少，一种大一统管理异步的方案：rxjs 就这样来到了世上。
简单介绍下 rxjs 和异步的关系：它可以把数据转化成一股流，无论这个数据是同步得到的还是异步得到的，是单值还是多值。
比如用 Rx.Observable.of 来包装单值同步数据，
用 Rx.Observable.of 来包装单值同步数据，
用 Rx.Observable.fromPromise 来包装单值异步数据，
以及用 Rx.Observable.fromEvent 来包装多值异步数据：

```
const fs = require('fs');
const Rx = require('rxjs');
const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {
    async executeAsy(asyncFunc, args) {
        this.emit("开始");
        try {
            console.time('执行耗时');
            const data = await asyncFunc(args);
            this.emit('data', data);
            console.timeEnd('执行耗时');
            this.emit('结束');
        } catch (err) {
            console.log("出错了!");
            this.emit('error', err);
        }

    }
}

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            const lines = data.toString().split('\r\n');
            resolve(lines);
        })
    })
}
const myEventEmitter = new MyEventEmitter();

myEventEmitter.executeAsy(readFileAsArray, './numbers.txt');

let dataObservable = Rx.Observable.fromEvent(myEventEmitter, 'data')

let subscription = dataObservable.subscribe((data) => {
    console.log(`分别抢到了${data}块红包`);
}, err => {
    console.error(err);
}, compelete => {
    console.info("compelete!");
})

```

rxjs 还有很多重要的概念，比如生产者 Observe 和消费者 Observable、推拉模型、各种方便的操作符和函数式编程等等

### 关于异步的未来展望

ES8 已经着手 Observable 和 Observe 的实现了，node 也在着手异步生命周期钩子 Async Hooks 来方便程序们来调试异步程序，我相信，未来 js 的异步编程会变得越来越容易，功能也会越来越强大~