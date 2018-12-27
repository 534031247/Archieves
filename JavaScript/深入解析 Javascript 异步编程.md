> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://www.cnblogs.com/nullcc/p/5841182.html

# [深入解析 Javascript 异步编程](https://www.cnblogs.com/nullcc/p/5841182.html)

这里深入探讨下 Javascript 的异步编程技术。(P.S. 本文较长，请准备好瓜子可乐 :D)

**一. Javascript 异步编程简介**

至少在语言级别上，Javascript 是单线程的，因此异步编程对其尤为重要。

拿 nodejs 来说，外壳是一层 js 语言，这是用户操作的层面，在这个层次上它是单线程运行的，也就是说我们不能像 Java、Python 这类语言在语言级别使用多线程能力。取而代之的是，nodejs 编程中大量使用了异步编程技术，这是为了高效使用硬件，同时也可以不造成同步阻塞。不过 nodejs 在底层实现其实还是用了多线程技术，只是这一层用户对用户来说是透明的，nodejs 帮我们做了几乎全部的管理工作，我们不用担心锁或者其他多线程编程会遇到的问题，只管写我们的异步代码就好。

**二. Javascript 异步编程方法**

ES 6 以前：

* 回调函数
* 事件监听 (事件发布 / 订阅)
* Promise 对象

ES 6：

* Generator 函数 (协程 coroutine)

ES 7:

* async 和 await

PS: 如要运行以下例子，请安装 node v0.11 以上版本，在命令行下使用 node [文件名. js] 的形式来运行，有部分代码需要开启特殊选项，会在具体例子里说明。

**1\. 回调函数**

回调函数在 Javascript 中非常常见，一般是需要在一个耗时操作之后执行某个操作时可以使用回调函数。

example 1:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //一个定时器
 2 function timer(time, callback){
 3     setTimeout(function(){
 4         callback();
 5     }, time);
 6 }
 7 
 8 timer(3000, function(){
 9     console.log(123);
10 })</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

example 2:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre>1 //读文件后输出文件内容
2 var fs = require('fs');
3 
4 fs.readFile('./text1.txt', 'utf8', function(err, data){
5     if (err){
6         throw err;
7     }
8     console.log(data);
9 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

example 3:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre>1 //嵌套回调，读一个文件后输出，再读另一个文件，注意文件是有序被输出的，先text1.txt后text2.txt
2 var fs = require('fs');
3 
4 fs.readFile('./text1.txt', 'utf8', function(err, data){
5     console.log("text1 file content: " + data);
6     fs.readFile('./text2.txt', 'utf8', function(err, data){
7         console.log("text2 file content: " + data);
8     });
9 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

example 4:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //callback hell
 2 
 3 doSomethingAsync1(function(){
 4     doSomethingAsync2(function(){
 5         doSomethingAsync3(function(){
 6             doSomethingAsync4(function(){
 7                 doSomethingAsync5(function(){
 8                     // code...
 9                 });
10             });
11         });
12     });
13 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

通过观察以上 4 个例子，可以发现一个问题，在回调函数嵌套层数不深的情况下，代码还算容易理解和维护，一旦嵌套层数加深，就会出现 “回调金字塔” 的问题，就像 example 4 那样，如果这里面的每个回调函数中又包含了很多业务逻辑的话，整个代码块就会变得非常复杂。从逻辑正确性的角度来说，上面这几种回调函数的写法没有任何问题，但是随着业务逻辑的增加和趋于复杂，这种写法的缺点马上就会暴露出来，想要维护它们实在是太痛苦了，这就是“回调地狱(callback hell)”。
一个衡量回调层次复杂度的方法是，在 example 4 中，假设 doSomethingAsync2 要发生在 doSomethingAsync1 之前，我们需要忍受多少重构的痛苦。

回调函数还有一个问题就是我们在回调函数之外无法捕获到回调函数中的异常，我们以前在处理异常时一般这么做：

example 5:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre>1 try{
2     //do something may cause exception..
3 }
4 catch(e){
5     //handle exception...
6 }</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

在同步代码中，这没有问题。现在思考一下下面代码的执行情况：

example 6:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 
 3 try{
 4     fs.readFile('not_exist_file', 'utf8', function(err, data){
 5         console.log(data);
 6     });
 7 }
 8 catch(e){
 9     console.log("error caught: " + e);
10 }</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

你觉得会输出什么？答案是 undefined。我们尝试读取一个不存在的文件，这当然会引发异常，但是最外层的 try/catch 语句却无法捕获这个异常。这是异步代码的执行机制导致的。

Tips: 为什么异步代码回调函数中的异常无法被最外层的 try/catch 语句捕获?

异步调用一般分为两个阶段，提交请求和处理结果，这两个阶段之间有事件循环的调用，它们属于两个不同的事件循环 (tick)，彼此没有关联。

异步调用一般以传入 callback 的方式来指定异步操作完成后要执行的动作。而异步调用本体和 callback 属于不同的事件循环。

try/catch 语句只能捕获当次事件循环的异常，对 callback 无能为力。

也就是说，一旦我们在异步调用函数中扔出一个异步 I/O 请求，异步调用函数立即返回，此时，这个异步调用函数和这个异步 I/O 请求没有任何关系。

**2\. 事件监听 (事件发布 / 订阅)**

事件监听是一种非常常见的异步编程模式，它是一种典型的逻辑分离方式，对代码解耦很有用处。通常情况下，我们需要考虑哪些部分是不变的，哪些是容易变化的，把不变的部分封装在组件内部，供外部调用，需要自定义的部分暴露在外部处理。从某种意义上说，事件的设计就是组件的接口设计。

example 7:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //发布和订阅事件
 2 
 3 var events = require('events');
 4 var emitter = new events.EventEmitter();
 5 
 6 emitter.on('event1', function(message){
 7     console.log(message);
 8 });
 9 
10 emitter.emit('event1', "message for you");</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

这种使用事件监听处理的异步编程方式很适合一些需要高度解耦的场景。例如在之前一个游戏服务端项目中，当人物属性变化时，需要写入到持久层。解决方案是先写一个订阅方，订阅'save'事件，在需要保存数据时让发布方对象 (这里就是人物对象) 上直接用 emit 发出一个事件名并携带相应参数，订阅方收到这个事件信息并处理。

**3.Promise 对象**

ES 6 中原生提供了 Promise 对象，Promise 对象代表了某个未来才会知道结果的事件 (一般是一个异步操作)，并且这个事件对外提供了统一的 API，可供进一步处理。
使用 Promise 对象可以用同步操作的流程写法来表达异步操作，避免了层层嵌套的异步回调，代码也更加清晰易懂，方便维护。

**Promise.prototype.then()**

Promise.prototype.then() 方法返回的是一个新的 Promise 对象，因此可以采用链式写法，即一个 then 后面再调用另一个 then。如果前一个回调函数返回的是一个 Promise 对象，此时后一个回调函数会等待第一个 Promise 对象有了结果，才会进一步调用。

example 8:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //ES 6原生Promise示例
 2 var fs = require('fs')
 3 
 4 var read = function (filename){
 5     var promise = new Promise(function(resolve, reject){
 6         fs.readFile(filename, 'utf8', function(err, data){
 7             if (err){
 8                 reject(err);
 9             }
10             resolve(data);
11         })
12     });
13     return promise;
14 }
15 
16 read('./text1.txt')
17 .then(function(data){
18     console.log(data);
19 }, function(err){
20     console.log("err: " + err);
21 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

以上代码中，read 函数是 Promise 化的，在 read 函数中，实例化了一个 Promise 对象，Promise 的构造函数接受一个函数作为参数，这个函数的两个参数分别是 resolve 方法和 reject 方法。如果异步操作成功，就是用 resolve 方法将 Promise 对象的状态从 “未完成” 变为 “完成”(即从 pending 变为 resolved)，如果异步操作出错，则是用 reject 方法把 Promise 对象的状态从“未完成” 变为“失败”(即从 pending 变为 rejected)，read 函数返回了这个 Promise 对象。Promise 实例生成以后，可以用 then 方法分别指定 resolve 方法和 reject 方法的回调函数。

上面这个例子，Promise 构造函数的参数是一个函数，在这个函数中我们写异步操作的代码，在异步操作的回调中，我们根据 err 变量来选择是执行 resolve 方法还是 reject 方法，一般来说调用 resolve 方法的参数是异步操作获取到的数据 (如果有的话)，但还可能是另一个 Promise 对象，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，调用 reject 方法的参数是异步回调用的 err 参数。

调用 read 函数时，实际上返回的是一个 Promise 对象，通过在这个 Promise 对象上调用 then 方法并传入 resolve 方法和 reject 方法来指定异步操作成功和失败后的操作。

example 9:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //原生Primose顺序嵌套回调示例
 2 var fs = require('fs')
 3 
 4 var read = function (filename){
 5     var promise = new Promise(function(resolve, reject){
 6         fs.readFile(filename, 'utf8', function(err, data){
 7             if (err){
 8                 reject(err);
 9             }
10             resolve(data);
11         })
12     });
13     return promise;
14 }
15 
16 read('./text1.txt')
17 .then(function(data){
18     console.log(data);
19 return read('./text2.txt');
20 })
21 .then(function(data){
22     console.log(data);
23 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

在 Promise 的顺序嵌套回调中，第一个 then 方法先输出 text1.txt 的内容后返回 read('./text2.txt')，注意这里很关键，这里实际上返回了一个新的 Promise 实例，第二个 then 方法指定了异步读取 text2.txt 文件的回调函数。这种形似同步调用的 Promise 顺序嵌套回调的特点就是有一大堆的 then 方法，代码冗余略多。

**异常处理**

**Promise.prototype.catch()**

Promise.prototype.catch 方法是 Promise.prototype.then(null, rejection) 的别名，用于指定发生错误时的回调函数。

example 9:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs')
 2 
 3 var read = function (filename){
 4     var promise = new Promise(function(resolve, reject){
 5         fs.readFile(filename, 'utf8', function(err, data){
 6             if (err){
 7                 reject(err);
 8             }
 9             resolve(data);
10         })
11     });
12     return promise;
13 }
14 
15 read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25 })
26 .then(function(data){
27     console.log("completed");
28 })</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

使用 Promise 对象的 catch 方法可以捕获异步调用链中 callback 的异常，Promise 对象的 catch 方法返回的也是一个 Promise 对象，因此，在 catch 方法后还可以继续写异步调用方法。这是一个非常强大的能力。

如果在 catch 方法中发生了异常：

example 10:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs')
 2 
 3 var read = function (filename){
 4     var promise = new Promise(function(resolve, reject){
 5         fs.readFile(filename, 'utf8', function(err, data){
 6             if (err){
 7                 reject(err);
 8             }
 9             resolve(data);
10         })
11     });
12     return promise;
13 }
14 
15 read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25     x+1;
26 })
27 .then(function(data){
28     console.log("completed");
29 })</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

在上述代码中，x+1 会抛出一个异常，但是由于后面没有 catch 方法了，导致这个异常不会被捕获，而且也不会传递到外层去，也就是说这个异常就默默发生了，没有惊动任何人。

我们可以在 catch 方法后再加 catch 方法来捕获这个 x+1 的异常：

example 11:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs')
 2 
 3 var read = function (filename){
 4     var promise = new Promise(function(resolve, reject){
 5         fs.readFile(filename, 'utf8', function(err, data){
 6             if (err){
 7                 reject(err);
 8             }
 9             resolve(data);
10         })
11     });
12     return promise;
13 }
14 
15 read('./text1.txt')
16 .then(function(data){
17     console.log(data);
18     return read('not_exist_file');
19 })
20 .then(function(data){
21     console.log(data);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25     x+1;
26 })
27 .catch(function(err){
28     console.log("error caught: " + err);
29 })
30 .then(function(data){
31     console.log("completed");
32 })</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

**Promise 异步并发**

如果几个异步调用有关联，但它们不是顺序式的，是可以同时进行的，我们很直观地会希望它们能够并发执行 (这里要注意区分“并发” 和“并行”的概念，不要搞混)。

**Promise.all()**

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

var p = Promise.all([p1,p2,p3]);

Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象实例。

p 的状态由 p1、p2、p3 决定，分两种情况：

（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

一个具体的例子：

example 12:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs')
 2 
 3 var read = function (filename){
 4     var promise = new Promise(function(resolve, reject){
 5         fs.readFile(filename, 'utf8', function(err, data){
 6             if (err){
 7                 reject(err);
 8             }
 9             resolve(data);
10         })
11     });
12     return promise;
13 }
14 
15 var promises = [1, 2].map(function(fileno){
16     return read('./text' + fileno + '.txt');
17 });
18 
19 Promise.all(promises)
20 .then(function(contents){
21     console.log(contents);
22 })
23 .catch(function(err){
24     console.log("error caught: " + err);
25 })</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

上述代码会并发执行读取 text1.txt 和 text2.txt 的操作，当两个文件都读取完毕时，输出它们的内容，contents 是一个数组，每个元素对应 promises 数组的执行结果 (顺序完全一致)，在这里就是 text1.txt 和 text2.txt 的内容。

**Promise.race()**

Promise.race() 也是将多个 Promise 实例包装成一个新的 Promise 实例：

var p = Promise.race([p1,p2,p3]);

上述代码中，p1、p2、p3 只要有一个实例率先改变状态，p 的状态就会跟着改变，那个率先改变的 Promise 实例的返回值，就传递给 p 的返回值。如果 Promise.all 方法和 Promise.race 方法的参数不是 Promise 实例，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。

example 13:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var http = require('http'); 
 2 var qs = require('querystring');
 3 
 4 var requester = function(options, postData){
 5     var promise = new Promise(function(resolve, reject){
 6         var content = "";
 7         var req = http.request(options, function (res) {
 8             res.setEncoding('utf8');
 9 
10             res.on('data', function (data) {
11                 onData(data);
12             });
13 
14             res.on('end', function () {
15                 resolve(content);
16             });
17 
18             function onData(data){
19                 content += data;
20             }
21         });
22 
23         req.on('error', function(err) {
24             reject(err);
25         });
26 
27         req.write(postData);
28             req.end();
29         });
30 
31         return promise;
32     }
33 
34     var promises = ["柠檬", "苹果"].map(function(keyword){
35     var options = {
36         hostname: 'localhost', 
37         port: 9200, 
38         path: '/meiqu/tips/_search',
39         method: 'POST' 
40     };
41 
42     var data = {
43         'query' : {
44             'match' : {
45                 'summary' : keyword
46             }
47         }
48     };
49     data = JSON.stringify(data);
50     return requester(options, data);
51 });
52 
53 Promise.race(promises)
54 .then(function(contents) {
55     var obj = JSON.parse(contents);
56     console.log(obj.hits.hits[0]._source.summary);
57 })
58 .catch(function(err){
59     console.log(err); 
60 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

**Promise.resolve()**

有时候需将现有对象转换成 Promise 对象，可以使用 Promise.resolve()。

如果 Promise.resolve 方法的参数，不是具有 then 方法的对象（又称 thenable 对象），则返回一个新的 Promise 对象，且它的状态为 fulfilled。

如果 Promise.resolve 方法的参数是一个 Promise 对象的实例，则会被原封不动地返回。

example 14:

<pre>1 var p = Promise.resolve('Hello');
2 
3 p.then(function (s){
4     console.log(s)
5 });</pre>

**Promise.reject()**

Promise.reject(reason) 方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。Promise.reject 方法的参数 reason，会被传递给实例的回调函数。

example 15:

<pre>1 var p = Promise.reject('出错了');
2 
3 p.then(null, function (s){
4     console.log(s)
5 });</pre>

上面代码生成一个 Promise 对象的实例 p，状态为 rejected，回调函数会立即执行。

**3.Generator 函数**

Generator 函数是协程在 ES 6 中的实现，最大特点就是可以交出函数的执行权（暂停执行）。
注意：在 node 中需要开启 --harmony 选项来启用 Generator 函数。
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。

协程的运行方式如下：

第一步：协程 A 开始运行。
第二步：协程 A 执行到一半，暂停，执行权转移到协程 B。
第三步：一段时间后，协程 B 交还执行权。
第四步：协程 A 恢复执行。

上面的协程 A 就是异步任务，因为分为两步执行。

比如一个读取文件的例子：

example 16:

<pre>1 function asnycJob() {
2     // ...其他代码
3     var f = yield readFile(fileA);
4     // ...其他代码
5 }</pre>

asnycJob 函数是一个协程，yield 语句表示，执行到此处执行权就交给其他协程，也就是说，yield 是两个阶段的分界线。协程遇到 yield 语句就暂停执行，直到执行权返回，再从暂停处继续执行。这种写法的优点是，可以把异步代码写得像同步一样。

看一个简单的 Generator 函数例子：

example 17:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 function* gen(x){
 2     var y = yield x + 2;
 3     return y;
 4 }
 5 
 6 var g = gen(1);
 7 var r1 = g.next(); // { value: 3, done: false }
 8 console.log(r1);
 9 var r2 = g.next() // { value: undefined, done: true }
10 console.log(r2);</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

需要注意的是 Generator 函数的函数名前面有一个 "*"。
上述代码中，调用 Generator 函数，会返回一个内部指针 (即遍历器)g，这是 Generator 函数和一般函数不同的地方，调用它不会返回结果，而是一个指针对象。调用指针 g 的 next 方法，会移动内部指针，指向第一个遇到的 yield 语句，上例就是执行到 x+2 为止。
换言之，next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的信息（value 属性和 done 属性）。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

**Generator 函数的数据交换和错误处理**

next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据。

example 18:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 function* gen(x){
 2     var y = yield x + 2;
 3     return y;
 4 }
 5 
 6 var g = gen(1);
 7 var r1 = g.next(); // { value: 3, done: false }
 8 console.log(r1);
 9 var r2 = g.next(2) // { value: 2, done: true }
10 console.log(r2);</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

第一个 next 的 value 值，返回了表达式 x+2 的值 (3)，第二个 next 带有参数 2，这个参数传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收，因此这一阶段的 value 值就是 2。

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

example 19:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 function* gen(x){
 2     try {
 3         var y = yield x + 2;
 4     }
 5     catch (e){
 6         console.log(e);
 7     }
 8     return y;
 9 }
10 
11 var g = gen(1);
12 g.next();
13 g.throw('error!'); //error!</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

下面是一个读取文件的真实异步操作的例子。

example 20:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 var thunkify = require('thunkify');
 3 var readFile = thunkify(fs.readFile);
 4 
 5 var gen = function* (){
 6     var r1 = yield readFile('./text1.txt', 'utf8');
 7     console.log(r1);
 8     var r2 = yield readFile('./text2.txt', 'utf8');
 9     console.log(r2);
10 };
11 
12 //开始执行上面的代码
13 var g = gen();
14 
15 var r1 = g.next();
16 r1.value(function(err, data){
17     if (err) throw err;
18     var r2 = g.next(data);
19     r2.value(function(err, data){
20         if (err) throw err;
21         g.next(data);
22     });
23 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

这就是一个基本的 Generator 函数定义和执行的流程。可以看到，虽然这里的 Generator 函数写的很简洁，和同步方法的写法很像，但是执行起来却很麻烦，流程管理比较繁琐。

在深入讨论 Generator 函数之前我们先要知道 Thunk 函数这个概念。

**求值策略 (即函数的参数到底应该何时求值)**

(1) 传值调用
(2) 传名调用

Javascript 是传值调用的，Thunk 函数是编译器 “传名调用” 的实现，就是将参数放入一个临时函数中，再将这个临时函数放入函数体，这个临时函数就叫做 Thunk 函数。
举个栗子就好懂了：

example 21:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 function f(m){
 2     return m * 2;
 3 }
 4 var x = 1;
 5 f(x + 5);
 6 
 7 //等同于
 8 var thunk = function (x) {
 9     return x + 5;
10 };
11 
12 function f(thunk){
13     return thunk() * 2;
14 }</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

Thunk 函数本质上是函数柯里化 (currying)，柯里化进行参数复用和惰性求值，这个是函数式编程的一些技巧，在 js 中，我们可以利用 ** 高阶函数 ** 实现函数柯里化。

**JavaScript 语言的 Thunk 函数**

在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。

example 22:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 
 3 // 正常版本的readFile（多参数版本）
 4 fs.readFile(fileName, callback);
 5 
 6 // Thunk版本的readFile（单参数版本）
 7 var readFileThunk = Thunk(fileName);
 8 readFileThunk(callback);
 9 
10 var Thunk = function (fileName){
11     return function (callback){
12         return fs.readFile(fileName, callback);
13     };
14 };</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。以下是一个简单的 Thunk 函数转换器：

example 23:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre>1 var Thunk = function(fn){
2     return function (){
3         var args = Array.prototype.slice.call(arguments);
4         return function (callback){
5             args.push(callback);
6             return fn.apply(this, args);
7         }
8     };
9 };</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

从本质上说，我们借助了 Javascript 高阶函数来抽象了异步执行流程。

使用上面的转换器，生成 fs.readFile 的 Thunk 函数。

example 24:

<pre>1 var readFileThunk = Thunk(fs.readFile);
2     readFileThunk('./text1.txt', 'utf8')(function(err, data){
3     console.log(data);
4 });</pre>

可以使用 thunkify 模块来 Thunk 化任何带有 callback 的函数。

我们需要借助 Thunk 函数的能力来自动执行 Generator 函数。

下面是一个基于 Thunk 函数的 Generator 函数执行器。

example 25:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //Generator函数执行器
 2 
 3 function run(fn) {
 4     var gen = fn();
 5 
 6     function next(err, data) {
 7         var result = gen.next(data);
 8         if (result.done) return;
 9         result.value(next);
10     }
11 
12     next();
13 }
14 
15 run(gen);</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

我们马上拿这个执行器来做点事情。

example 26:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 var thunkify = require('thunkify');
 3 var readFile = thunkify(fs.readFile);
 4 
 5 var gen = function* (){
 6     var f1 = yield readFile('./text1.txt', 'utf8');
 7     console.log(f1);
 8     var f2 = yield readFile('./text2.txt', 'utf8');
 9     console.log(f2);
10     var f3 = yield readFile('./text3.txt', 'utf8');
11     console.log(f3);
12 };
13 
14 function run(fn) {
15 var gen = fn();
16 
17 function next(err, data) {
18     var result = gen.next(data);
19     if (result.done) return;
20     result.value(next);
21 }
22 
23 next();
24 }
25 
26 run(gen); //自动执行</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

现在异步操作代码的写法就和同步的写法一样了。实际上，Thunk 函数并不是自动控制 Generator 函数执行的唯一方案，要自动控制 Generator 函数的执行过程，需要有一种机制，自动接收和交还程序的执行权，回调函数和 Promise 都可以做到 (利用调用自身的一些特性)。

**yield * 语句**

普通的 yield 语句后面跟一个异步操作，yield * 语句后面需要跟一个遍历器，可以理解为 yield * 后面要跟另一个 Generator 函数，讲起来比较抽象，看一个实例。

example 27:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 //嵌套异步操作流
 2 var fs = require('fs');
 3 var thunkify = require('thunkify');
 4 var readFile = thunkify(fs.readFile);
 5 
 6 var gen = function* (){
 7     var f1 = yield readFile('./text1.txt', 'utf8');
 8     console.log(f1);
 9 
10     var f_ = yield * gen1(); //此处插入了另外一个异步流程
11 
12     var f2 = yield readFile('./text2.txt', 'utf8');
13     console.log(f2);
14 
15     var f3 = yield readFile('./text3.txt', 'utf8');
16     console.log(f3);
17 };
18 
19 var gen1 = function* (){
20     var f4 = yield readFile('./text4.txt', 'utf8');
21     console.log(f4);
22     var f5 = yield readFile('./text5.txt', 'utf8');
23     console.log(f5);
24 }
25 
26 function run(fn) {
27     var gen = fn();
28 
29     function next(err, data) {
30     var result = gen.next(data);
31     if (result.done) return;
32     result.value(next);
33 }
34 
35 next();
36 }
37 
38 run(gen); //自动执行</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

上面这个例子会输出
1
4
5
2
3
也就是说，使用 yield * 可以在一个异步操作流程中直接插入另一个异步操作流程，我们可以据此构造可嵌套的异步操作流，更为重要的是，写这些代码完全是同步风格的。

目前业界比较流行的 Generator 函数自动执行的解决方案是 co 库，此处也只给出 co 的例子。顺带一提 [node-fibers](https://github.com/laverdet/node-fibers/) 也是一种解决方案。

顺序执行 3 个异步读取文件的操作，并依次输出文件内容：

example 28:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 var co = require('co');
 3 var thunkify = require('thunkify');
 4 var readFile = thunkify(fs.readFile);
 5 
 6 co(function*(){
 7     var files=[
 8     './text1.txt',
 9     './text2.txt',
10     './text3.txt'
11     ];
12 
13     var p1 = yield readFile(files[0]);
14     console.log(files[0] + ' ->' + p1);
15 
16     var p2 = yield readFile(files[1]);
17     console.log(files[1] + ' ->' + p2);
18 
19     var p3 = yield readFile(files[2]);
20     console.log(files[2] + ' ->' + p3);
21 
22     return 'done';
23 });</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

并发执行 3 个异步读取文件的操作，并存储在一个数组中输出 (顺序和文件名相同)：

example 29:

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 var co = require('co');
 3 var thunkify = require('thunkify');
 4 var readFile = thunkify(fs.readFile);
 5 
 6 co(function* () {
 7     var files = ['./text1.txt', './text2.txt', './text3.txt'];
 8     var contents = yield files.map(readFileAsync);
 9 
10     console.log(contents);
11 });
12 
13 function readFileAsync(filename) {
14     return readFile(filename, 'utf8');
15 }</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

co 库和我们刚才的 run 函数有点类似，都是自动控制 Generator 函数的流程。

**ES 7 中的 async 和 await**

async 和 await 是 ES 7 中的新语法，新到连 ES 6 都不支持，但是可以通过 Babel 一类的预编译器处理成 ES 5 的代码。目前比较一致的看法是 async 和 await 是 js 对异步的终极解决方案。

async 函数实际上是 Generator 函数的语法糖 (js 最喜欢搞语法糖，包括 ES 6 中新增的“类” 支持其实也是语法糖)。

配置 Babel 可以看：[配置 Babel](http://www.ruanyifeng.com/blog/2016/01/babel.html)

如果想尝个鲜，简单一点做法是执行：

<pre>1 sudo npm install --global babel-cli</pre>

async_await.js 代码如下：

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

<pre> 1 var fs = require('fs');
 2 
 3 var readFile = function (fileName){
 4     return new Promise(function (resolve, reject){
 5         fs.readFile(fileName, function(error, data){
 6             if (error){
 7                 reject(error);
 8             }
 9             else {
10                 resolve(data);
11             }
12         });
13     });
14 };
15 
16 var asyncReadFile = async function (){
17     var f1 = await readFile('./text1.txt');
18     var f2 = await readFile('./text2.txt');
19     console.log(f1.toString());
20     console.log(f2.toString());
21 };
22 
23 asyncReadFile();</pre>

[![](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0); "复制代码")

接着执行 babel-node async_await.js

输出：

1

2 

本 blog 已搬迁至 https://nullcc.github.io/ 标签: [JavaScript](http://www.cnblogs.com/nullcc/tag/JavaScript/), [异步编程](http://www.cnblogs.com/nullcc/tag/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/) [好文要顶](javascript:void(0);) [关注我](javascript:void(0);) [收藏该文](javascript:void(0);) [![](https://common.cnblogs.com/images/icon_weibo_24.png)](javascript:void(0); "分享至新浪微博") [![](https://common.cnblogs.com/images/wechat.png)](javascript:void(0); "分享至微信") [![](https://pic.cnblogs.com/face/1018597/20170426175414.png)](http://home.cnblogs.com/u/nullcc/) [nullcc](http://home.cnblogs.com/u/nullcc/)
[关注 - 0](http://home.cnblogs.com/u/nullcc/followees)
[粉丝 - 3](http://home.cnblogs.com/u/nullcc/followers) [+ 加关注](javascript:void(0);) 4 0 <script type="text/javascript">currentDiggType = 0;</script> [«](http://www.cnblogs.com/nullcc/p/5829218.html) 上一篇：[(译)package.json 详解](http://www.cnblogs.com/nullcc/p/5829218.html "发布于2016-09-01 11:42")
[»](http://www.cnblogs.com/nullcc/p/5846751.html) 下一篇：[(译 + 注解)node.js 的 C++ 扩展入门](http://www.cnblogs.com/nullcc/p/5846751.html "发布于2016-09-06 18:06")
posted @ 2016-09-05 09:40 [nullcc](http://www.cnblogs.com/nullcc/) 阅读 (7808) 评论 (1) [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=5841182) [收藏](#)