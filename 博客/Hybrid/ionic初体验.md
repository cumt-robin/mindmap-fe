搞了一波`cordova`后，算是对`Hybrid`有了一点点微小的认知。为了快速开发，`ionic`无疑是更好的选择，它底层的打包和通信机制基于`cordova`实现，在上层实现了自己的`UI`组件，可以结合`Angular`或`React`使用，并且宣称将在未来支持`Vue`。
<!-- more -->

# 环境准备

如果已经安装了`cordova`，则单独安装`ionic`即可，否则需要一并安装。

```
npm install -g ionic cordova
```

# 创建项目

通过`start`命令来新建一个`ionic`项目。

```
ionic start my-app
```

并且可以支持传入模板，以及项目类型，具体参考[ionic start](https://ionicframework.com/docs/cli/commands/start)。

我们在这里创建一个基于`angular`的`tabs`导航的`app`。

```
ionic start myapp tabs --type=ionic-angular
```

当然也可以直接从一个更完善的模板开始。

```
ionic start myapp super --type=ionic-angular
```

这几种方式可以都试试看。

# 运行项目

## 在浏览器运行web版

在尝试`npm start`调用`ionic-app-scripts serve`启动项目时，发现报错找不到`@ionic/app-scripts`模块，尝试重新安装该模块，`node-gyp`模块又报了这个错：

```
Error: Can't find Python executable "python", you can set the PYTHON env variable.
```

查询[node-gyp]( https://www.npmjs.com/package/node-gyp/v/3.8.0 )后，官方提供了两种解决方案

![解决找不到python模块的问题](https://qncdn.wbjiang.cn/%E8%A7%A3%E5%86%B3%E6%89%BE%E4%B8%8D%E5%88%B0python%E6%A8%A1%E5%9D%97%E7%9A%84%E9%97%AE%E9%A2%98.png)

我采用了第一种方案：

```
npm install --global --production windows-build-tools
```

**ps:** 必须以系统管理员方式运行命令行。

接着重新安装一遍`@ionic/app-scripts`，然后重新运行项目，冇问题啦。

```
npm uninstall @ionic/app-scripts
npm install --save-dev @ionic/app-scripts
npm start
```

![ionic界面](https://qncdn.wbjiang.cn/ionic%E7%95%8C%E9%9D%A2.png)

## 支持android和ios

```she
ionic cordova platform add ios
ionic cordova platform add android
```

## android调试

首先检查下设备连接是否正常

```shell
D:\robin\frontend\hybrid\ionic\ionic-blog> adb devices
List of devices attached
5fdba1e7        device
```

使用`ionic cli`提供的命令运行`app`

```shell
// -l是--livereload的简写
ionic cordova run android -l
```

此时注意在手机上同意**“继续安装”**，否则是不会成功的。安装成功则可以看到成功的提示。

```
> cordova.cmd build android --device
[app-scripts] [16:05:33]  lint finished in 3.95 s
> native-run.cmd android --app platforms\android\app\build\outputs\apk\debug\app-debug.apk --device --forward 8100:8100 --forward 35729:35729 --forward 53703:53703
[native-run] Selected hardware device 5fdba1e7
[native-run] Forwarded device port 35729 to host port 35729
[native-run] Forwarded device port 8100 to host port 8100
[native-run] Forwarded device port 53703 to host port 53703
[native-run] Installing platforms\android\app\build\outputs\apk\debug\app-debug.apk...
[native-run] Starting application activity io.ionic.starter/io.ionic.starter.MainActivity...
[native-run] Run Successful
```

![ionic界面](https://qncdn.wbjiang.cn/ionic%E7%95%8C%E9%9D%A2.jpg)

此时还可以在`Chrome`浏览器上输入`chrome://inspect`进行调试。

![chrome inspect](https://qncdn.wbjiang.cn/ionic_chrome_inspect.png)

手机上的操作会同步到`Chrome`浏览器上。![ionic远程调试动图](https://qncdn.wbjiang.cn/ionic%E8%BF%9C%E7%A8%8B%E8%B0%83%E8%AF%95%E5%8A%A8%E5%9B%BE.gif)

并且还支持断点调试。

![ionic断点调试](https://qncdn.wbjiang.cn/ionic%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95.png)

## ios调试

`ios`就先不试了，没设备。。。

------

[首发链接](https://blog.csdn.net/weixin_41196185/article/details/102921606)

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)