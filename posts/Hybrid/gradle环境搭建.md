最近我在尝试了解跨平台技术的发展，首先则是想到了`cordova`。环境配置过程中有依赖`gradle`，下面简单记录了在`windos10`系统下搭建`gradle`环境的过程。

<!-- more -->

# 什么是gradle

> Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具。 

# 检查java环境

首先要检查是否正常安装了`java`环境。

```
C:\>java -version
java version "1.8.0_201"
Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.201-b09, mixed mode)
```

如果没安装，可以参考[jdk下载与安装简明教程](http://hexo.wbjiang.cn/jdk下载和安装简明教程.html)。

# 下载gradle二进制安装包

[v5.6.3版本下载链接]( https://gradle.org/next-steps/?version=5.6.3&format=bin )

# 安装和环境变量配置

首先在`C`盘新建一个` Gradle `目录，然后将安装包解压到该目录下，最终得到的目录是这样的。

```
C:\Gradle\gradle-5.6.3
```

然后我们需要给**环境变量-系统变量-Path**新增一项

```
C:\Gradle\gradle-5.6.3\bin
```

完成后，即可命令行检查下`gradle`是否安装配置正常。

```
C:\>gradle -v

------------------------------------------------------------
Gradle 5.6.3
------------------------------------------------------------

Build time:   2019-10-18 00:28:36 UTC
Revision:     bd168bbf5d152c479186a897f2cea494b7875d13

Kotlin:       1.3.41
Groovy:       2.5.4
Ant:          Apache Ant(TM) version 1.9.14 compiled on March 12 2019
JVM:          1.8.0_201 (Oracle Corporation 25.201-b09)
OS:           Windows 10 10.0 amd64
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)