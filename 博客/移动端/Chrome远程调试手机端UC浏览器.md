今天在手机`UC`上发现我的一个网页打不开，而在`PC`上是正常的，因此需要通过`Chrome`远程调试手机端`UC`浏览器查下问题，折腾了老久才弄好。

<!-- more -->

# 获取 Google USB 驱动程序

1. 首先将手机通过`USB`接口与`PC`连接

2. 接着要确认手机`USB`驱动程序是不是正常，可以在设备管理器中查看，如果设备左侧没有黄色感叹号，则说明正常。

   ![查看设备驱动状态](http://qncdn.wbjiang.cn/%E6%9F%A5%E7%9C%8B%E8%AE%BE%E5%A4%87%E9%A9%B1%E5%8A%A8%E7%8A%B6%E6%80%81.png)

   

   如果不正常就需要手动安装了，给个链接：[获取 Google USB 驱动程序](https://developer.android.com/studio/run/win-usb.html?hl=zh-cn)



# 开发者选项

1. 打开手机的开发者选项

   进入手机中 **我的设备 -> 全部参数**，连续7次点击版本号，以`Redmi K20 Pro`为例，是点击`MIUI版本`七次。

   ![连续点击版本号七次](http://qncdn.wbjiang.cn/%E7%82%B9%E5%87%BB%E7%89%88%E6%9C%AC%E5%8F%B7%E4%B8%83%E6%AC%A1.png)

   接着就可以进入 **更多设置 -> 开发者选项** 中开启开发者选项了。

   ![开启开发者选项](http://qncdn.wbjiang.cn/%E5%BC%80%E5%90%AF%E5%BC%80%E5%8F%91%E8%80%85%E9%80%89%E9%A1%B9.png)

2. 允许USB调试

   接着滚动到下方 **调试** 处，允许 **USB调试**。

   ![允许USB调试](http://qncdn.wbjiang.cn/%E5%85%81%E8%AE%B8USB%E8%B0%83%E8%AF%95.png)

# 开始调试

1. 打开`chrome://inspect/`，开启`Discover USB devices`

   ![chrome inspect](http://qncdn.wbjiang.cn/chrome%20inspect%E7%95%8C%E9%9D%A2.png)

2. 使用`UC`开发版访问需要调试的网页

3. 点击`chrome`上对应网页的`inspect`打开调试界面。

   ![调试Elements](http://qncdn.wbjiang.cn/%E8%B0%83%E8%AF%95uc%E6%89%8B%E6%9C%BA%E7%AB%AFElements.png)

4. 也可以断点调试，基本上与`chrome PC`端调试无异。

   ![断点调试](http://qncdn.wbjiang.cn/%E8%BF%9C%E7%A8%8B%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95.png)



# 建议

其实最重要的应该是`fanqiang`吧，如果遇到无法调试，报`HTTP 404`这类的问题，基本上是要`fanqiang`了。^_^


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)