# Chapter-7

## 两种定义函数的方式

- 函数声明：`function name(arg1, arg2) {}`
- 函数表达式：`var name = function(arg1, arg2) {}`

两种方式的区别在于<b>函数声明具有声明提升的特征</b>

```javascript
sayHi()
function sayHi() {...}	true
var sayHi = function () {...}	error
```

