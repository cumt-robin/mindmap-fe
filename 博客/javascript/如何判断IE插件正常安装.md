项目中用到了一个第三方的`ie ocx`控件，而经常遇到客户和测试小伙伴反馈相关功能无法正常使用，也没有友好提示。考虑到这个问题，必须要有一个`ie ocx`控件的检查机制。

<!-- more -->

# 检查原理

创建`ActiveXObject`对象去检查`ocx`控件

```javascript
let newObj = new ActiveXObject(servername, typename[, location]) 
```

# 参数问题

看起来很简单的，但是用起来我懵逼了，应用程序对象名称`servername`这个参数怎么填呢？

插件供应商只提供了控件安装包，示例程序，`clsid`

```html
<object id="NetVideo" classid="clsid:27E1A157-6A29-48AE-86C2-14591D90B4D4"></object>
```

于是我想应该可以从`clsid`入手研究。

## 什么是clsid

> class identifier（类标识符）也称为CLASSID或CLSID，是与某一个类对象相联系的唯一标记(UUID)。一个准备创建多个对象的类对象应将其CLSID注册到系统注册数据库的任务表中，以使客户能够定位并装载与该对象有关的可执行代码。

以上摘自百度百科，可以看到`clsid`跟`uuid`是类似的原理，用来进行插件的唯一标识。

## 根据clsid怎么查到servername

在`MDN`上搜索`ActiveXObject`词条，可以看到这么一句：

> 您可以在`HKEY_CLASSES_ROOT`注册注册表项中识别主机PC上的`servername.typename的`值。

哦，可以看到是从注册表中去查的。于是我运行`regedit`打开注册表查看，虽然知道是在`HKEY_CLASSES_ROOT`目录下，但是这也太多了吧，怎么找得到？

![注册表HKEY_CLASSES_ROOT](https://qncdn.wbjiang.cn/%E6%B3%A8%E5%86%8C%E8%A1%A8HKEY_CLASSES_ROOT.png)

当然还是要靠搜索功能，于是我根据`clsid`的值`27E1A157-6A29-48AE-86C2-14591D90B4D4`进行查找

![搜索clsid](https://qncdn.wbjiang.cn/%E6%90%9C%E7%B4%A2clsid.png)

搜索时间有点长，但是最终还是查到了，位置如下：

`计算机\HKEY_CLASSES_ROOT\SDS_CMSCtrl.SDS_CMSCtrlCtrl.1`

![ocx插件在注册表的位置](https://qncdn.wbjiang.cn/ocx%E6%8F%92%E4%BB%B6%E5%9C%A8%E6%B3%A8%E5%86%8C%E8%A1%A8%E7%9A%84%E4%BD%8D%E7%BD%AE.png)

于是我猜想，`servername`应该就是`SDS_CMSCtrl.SDS_CMSCtrlCtrl.1`。经测试，果不其然。检查代码如下：

```javascript
try {
  const ocx = new ActiveXObject('SDS_CMSCtrl.SDS_CMSCtrlCtrl.1')
  console.log(ocx)
} catch (error) {
  this.$alert('您还未安装视频插件！', '提示')
}
```

这样一来，如果用户没有安装插件，马上能够得到提示，perfect！

![ocx未安装的友好提示](https://qncdn.wbjiang.cn/ocx%E6%9C%AA%E5%AE%89%E8%A3%85%E7%9A%84%E5%8F%8B%E5%A5%BD%E6%8F%90%E7%A4%BA.png)

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)