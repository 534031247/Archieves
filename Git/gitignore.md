# .gitignore

​	今天给张方舟的大作业添加（实际上是copy）了一个传输文件的功能，编译运行确认无误后，看到目录下果然又生成了很多 根本不需要的提交文件，从github官网上找了一份Qt的.gitignore文件拿来用。

​	终端输入`git status`的时候，发现根本没有生效，网上查了一下原因：

> .gitignore只能忽略那些原来**没有被 track 的文件**，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的。
> 解决方法是先把本地缓存删除，然后再提交。

```bash
git rm -r --cached .
git add .
git commit -m 'We really don't want Git to track this anymore!'
```



## Note

.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
