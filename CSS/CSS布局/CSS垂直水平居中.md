# CSS垂直水平居中

**首先都要设置`position`为`absolute`**



## 知道宽高

1. ```css
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   margin: auto;
   ```

2. ```css
   top: 0;
   left: 0;
   margin-left: 负的宽度的一半
   margin-top: 负的高度的一半
   ```



## 不知道宽高

```css
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```



## 使用flex

略