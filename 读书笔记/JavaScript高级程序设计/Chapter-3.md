# Chapter-3

## for-in

`for-in`是一种精准的迭代语句，可以用来枚举**对象**的属性，对于对象，推荐使用，而对于数组，推荐使用`for-of`。

**`for-in`迭代数组得到的是`string`类型：**

```javascript
let arr = [0,1,2,3,4];
for (temp in arr) {
  switch (temp) {
    case 0:
      console.log("0");
      break;
    case 1:
      console.log("0 and 1");
      break;
    case 2:
      console.log("2");
      break;
    default:
      console.log("default");
      break;
  }
  console.log(typeof(temp));
}
```

以上这段代码输出的是均为default。

改为`for-of`可达到预期。