一直以来就想在写文章时，能以文本形式（而不是截图）附上项目的目录结构，今天终于知道怎么操作了，在这分享一下。

<!-- more -->

# Linux

首先说下Linux上输出目录结构的方法。

## yum安装tree

需要支持tree命令，首先是要安装tree包的。

```shell
yum -y install tree
```

然后在你的项目目录下执行tree命令即可

![linux目录结构](http://qncdn.wbjiang.cn/linux%E6%A0%91%E7%BB%93%E6%9E%84.png)

还可以输出带颜色的结构

```
tree -C
```

![带颜色的](http://qncdn.wbjiang.cn/linux%E7%9B%AE%E5%BD%95%E6%A0%91%E5%B8%A6%E9%A2%9C%E8%89%B2.png)

# Windows

不需要特意安装什么，直接输入命令：

```
tree /f
```

![windows tree命令](http://qncdn.wbjiang.cn/windowstree%E5%91%BD%E4%BB%A4.png)

更多参数请参考[Windows Commands / tree](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/tree)

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)
