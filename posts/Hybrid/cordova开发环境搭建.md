最近我在尝试了解跨平台技术的发展，首先则是想到了`cordova`。本文简单记录下`cordova`环境搭建的过程。

<!-- more -->

# 安装cordova

首先是要`npm`全局安装`cordova`

```shell
npm install -g cordova
```

# 创建应用

安装的`cordova`类似于`create-react-app`这种脚手架，可以通过命令行直接创建应用

```shell
cordova create myapp
```

# 添加平台支持

`cordova`可以支持`ios`, `android`, `web`三端。

```shell
cordova platform add ios
cordova platform add android
cordova platform add browser
```

![cordova platforms](https://qncdn.wbjiang.cn/cordova%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81.png)

进入`android`目录下，可以看到很多`.java`文件，而`ios`目录下是很多的`object-c`文件，`browser`目录下则是熟悉的`web`工程。

并且可以看到，每个平台下都有一个`cordova`目录，我初步猜想，这应该是负责和不同平台通讯交互的`cordova`核心。

# 运行App

## Web

`web`端是最直观最简单的，直接运行如下命令即可。

```shell
cordova run browser
```

## Android

对于`Android`和`IOS`，我们则需要先检查相关环境是否安装正常。

```shell
$ cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: not installed
Failed to find 'ANDROID_HOME' environment variable. Try setting it manually.
Detected 'adb' command at C:\Windows\system32 but no 'platform-tools' directory found near.
Try reinstall Android SDK or update your PATH to include valid path to SDK\platform-tools directory.
Android target: not installed
android: Command failed with exit code ENOENT Error output:
'android' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
���������ļ���
Gradle: not installed
Could not find gradle wrapper within Android SDK. Could not find Android SDK directory.
Might need to install Android SDK or set up 'ANDROID_HOME' env variable.

Requirements check results for browser:

Requirements check results for ios:
Apple macOS: not installed
Cordova tooling for iOS requires Apple macOS
Some of requirements check failed
```

可以看到，我的电脑环境并不满足`android`和`ios`平台的要求。

首先我们来满足下`android`平台的环境要求。

### JDK

首先是`JDK`，可以通过`java`和`javac`命令来检查下。

```shell
C:\>java -version
java version "1.8.0_201"
Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.201-b09, mixed mode)
```

如果没安装，可以参考[jdk下载与安装简明教程](http://hexo.wbjiang.cn/jdk下载和安装简明教程.html)。

### Gradle

> Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具。 

具体安装过程可以参考[gradle环境搭建](http://hexo.wbjiang.cn/gradle环境搭建.html)。

### Android SDK

首先我们安装[Android Studio](https://developer.android.google.cn/studio)。根据安装指引，我们会安装好`Android SDK`。

在此安装过程中，遇到了一个报错：

```
Android SDK Tools, SDK Patch Applier v4 and 5 more  SDK components were not installed
```

感谢这位[大佬提供的解决方案](https://blog.csdn.net/qq_36784975/article/details/89096195)，迅速解决了问题，这里顺便记下`SDK`的安装目录。

```
C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk
```

接着我们需要在**环境变量-系统变量-Path**中新增两项：

```
C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\platform-tools
C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\tools

```

并且新增一项**系统变量ANDROID_HOME**，变量值为：

```
C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk

```

试运行命令`cordova run android`，出现了如下警告

```
$ cordova run android
Checking Java JDK and Android SDK versions
ANDROID_SDK_ROOT=undefined (recommended setting)
ANDROID_HOME=C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk (DEPRECATED)
Starting a Gradle Daemon (subsequent builds will be faster)

```

于是我又新增了一项**系统变量ANDROID_SDK_ROOT**，变量值与**ANDROID_HOME**一样。

重新跑`cordova run android`命令，首先看到警告如下：

```
> Configure project :app
Checking the license for package Android SDK Platform 28 in C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\licenses
Warning: License for package Android SDK Platform 28 not accepted.

```

上网一查，原来是没有同意相关协议。我们来到`C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\tools\bin`目录下运行命令行，输入`sdkmanager --licenses`，然后就会弹出一堆协议，没办法，无脑输入`y`同意吧。

再次运行`cordova run android`，发现了新的报错信息：

```
No target specified and no devices found, deploying to emulator
No emulator images (avds) found.
1. Download desired System Image by running: "C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\tools\android.bat" sdk
2. Create an AVD by running: "C:\Users\Jiang.Wenbin\AppData\Local\Android\Sdk\tools\android.bat" avd
HINT: For a faster emulator, use an Intel System Image and install the HAXM device driver

```

可以看到，是没有找到设备的原因。需要将手机连接到`PC`，并且打开开发者选项，允许`USB`调试。再次尝试，已经可以看到界面了。

![cordova app界面](https://qncdn.wbjiang.cn/cordova%20app%E7%95%8C%E9%9D%A2.jpg)

### Plugins

我们来试试调用一些原生`API`，比如调用原生`Dialog`， 调用相机等。我们先试下`Dialog`。

#### Dialog

首先需要插件：

```
cordova plugin add cordova-plugin-dialogs

```

接着我们在`deviceready`事件之后调用`Dialog`

```javascript
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    navigator.notification.alert(
        '欢迎欢迎!',  // message
        alertDismissed,         // callback
        '试下Dialog',            // title
        '好的'                  // buttonName
    );
}

function alertDismissed() {
    // 点击按钮后的回调
}

```

调试后发现弹出的中文乱码了，需要在`index.html`加个`meta`

```html
<meta charset="UTF-8">

```

![cordova_dialog](https://qncdn.wbjiang.cn/cordova_dialog.png)

#### Camera

接着我们试下调用相机，首先也是安装插件：

```
cordova plugin add cordova-plugin-camera

```

尝试调用相机拍照，并将得到的照片通过`img`元素显示出来：

```javascript
// Application Constructor
initialize: function() {
    const _this = this;
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	// 点击按钮打开相机
    document.querySelector('#btnOpenCamera').addEventListener('click', function() {
        _this.openCamera()
    })
},
openCamera: function() {
    const cameraOptions = {
        // 默认输出格式为base64
        destinationType: Camera.DestinationType.DATA_URL,
        // 输出png格式
        encodingType: Camera.EncodingType.PNG
    };

    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

    // 相机拍照成功
    function cameraSuccess(base64Str) {
        console.log(base64Str)
        // 给图片元素赋值src
        document.querySelector('#captureImg').src = prefixBase64PNG(base64Str)
    }

    function cameraError(err) {
        console.error(err)
    }

    function prefixBase64PNG(base64Str) {
        return 'data:image/png;base64,' + base64Str;
    }
}

```

效果如下：

![cordova_camera](https://qncdn.wbjiang.cn/cordova_camera.jpg)

## IOS

还没钱买`IOS`设备，尴尬。。。

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)