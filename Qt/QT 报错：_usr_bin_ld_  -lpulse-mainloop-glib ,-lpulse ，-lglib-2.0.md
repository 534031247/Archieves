> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 https://blog.csdn.net/ipfpm/article/details/80702019 <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-e2445db1a8.css">

背景：重新安装了 Ubuntu16.04，将原来 QT 程序从 Ubuntu14（32 位）移植到 Ubuntu16，发现程序报错：

注意：如果 QT 中在 proj 中加了 multimedia、multimediawidgets，使用了 QCamera 就有可能出现该错误。这是由于没有找到链接库：

解决方法：

（1）获取 root 权限：

```
    su
```

（2）在 usr 目录下输入命令行：

```
find / -name libpulse.so*

cp /usr/lib/x86_64-linux-gnu/libpulse.so.0 /usr/lib/libpulse.so

在lib下就出现了libpulse.so

```

（3）在 usr 目录下输入命令行：

```
find / -name libpulse-mainloop-glib.so*

cp /usr/lib/x86_64-linux-gnu/libpulse-mainloop-glib.so.0.0.5 /usr/lib/libpulse-mainloop-glib.so

在lib下就出现了libpulse-mainloop-glib.so

```

（4）在 usr 目录下输入命令行：

```
find / -name libglib-2.0.so*

cp /lib/x86_64-linux-gnu/libglib-2.0.so.0 /usr/lib/libglib-2.0.so

在lib下就出现了libglib-2.0.so

```

转自：

https://blog.csdn.net/u013321104/article/details/79522611