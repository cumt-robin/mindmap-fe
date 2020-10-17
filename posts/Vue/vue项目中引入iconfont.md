对于前端而言，图标的发展可谓日新月异。从`img`标签，到雪碧图，再到字体图标，`svg`，甚至`svg`也有了类似于雪碧图的方案`svg-sprite-loader`。<!-- more -->雪碧图没有什么好讲的了，只是简单地利用了`background-position`来做图标定位。今天咱们先聊聊怎么使用字体图标和`svg`图标。其实字体图标也不陌生了，`bootstrap`，`font-awesome`，`element-ui`等`UI`库都基本标配了字体图标。

# 简单说下原理

`unicode`预留了`E000-F8FF`范围作为私有保留区域，这个区间的`unicode`码非常适合做字体图标，前端根据`unicode`码就能显示对应的图标。

# vue项目引入iconfont

## 1. 在iconfont新建项目

![iconfont新建项目](http://qncdn.wbjiang.cn/iconfont%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

注：这里修正一下，前缀应该是`test-icon-`。

## 2. 添加图标至项目

![添加图标至项目](http://qncdn.wbjiang.cn/%E6%B7%BB%E5%8A%A0%E5%9B%BE%E6%A0%87%E8%87%B3%E9%A1%B9%E7%9B%AE.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

## 3. 使用iconfont

### Unicode方式（不推荐）

#### 在线使用

- `index.scss`中引入在线字体

```
@font-face {
    font-family: 'iconfont';  /* project id 1254715 */
    src: url('//at.alicdn.com/t/font_1254715_s1khj1whikd.eot');
    src: url('//at.alicdn.com/t/font_1254715_s1khj1whikd.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1254715_s1khj1whikd.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1254715_s1khj1whikd.woff') format('woff'),
    url('//at.alicdn.com/t/font_1254715_s1khj1whikd.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1254715_s1khj1whikd.svg#iconfont') format('svg');
}
```

- 页面中使用

  使用时很不友好，使用的是`unicode`码表示，使用图标还必须去`iconfont`项目去查询下`unicode`码。

```
<template>
    <div>
        <i class="iconfont">&#xe7ee;</i>
        <i class="iconfont">&#xe7ed;</i>
        <i class="iconfont">&#xe7ec;</i>
        <i class="iconfont">&#xe7eb;</i>
    </div>
</template>
```

效果图如下：

![iconfont效果图](http://qncdn.wbjiang.cn/iconfont%E6%95%88%E6%9E%9C%E5%9B%BE.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

#### 本地使用

有时候网络不是那么给力的，或者是内网环境，那么就不要考虑用在线引用的方式了。

1. 本地使用需要先将字体库下载并放到项目中。

![iconfont项目下载](http://qncdn.wbjiang.cn/unicode%E4%B8%8B%E8%BD%BD%E8%87%B3%E6%9C%AC%E5%9C%B0.png)

2. 在全局样式文件中定义如下代码

   ```
   @font-face {
     font-family: "iconfont";
     src: url('../fonts/iconfont.eot'); /* IE9*/
     src: url('../fonts/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
     url('../fonts/iconfont.woff') format('woff'), /* chrome, firefox */
     url('../fonts/iconfont.woff2') format('woff2'), /* chrome, firefox */
     url('../fonts/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
     url('../assets/fonts/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
   }
   
   .iconfont {
     font-family: "iconfont" !important;
     font-size: 16px;
     font-style: normal;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
   ```

![unicode方式本地引用iconfont](http://qncdn.wbjiang.cn/unicode%E6%96%B9%E5%BC%8F%E6%9C%AC%E5%9C%B0%E5%BC%95%E7%94%A8iconfont.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

3. 使用方式

   与在线引用方式是一样的，都是使用`unicode`码去展示图标。

   ```
   <template>
       <i class="iconfont">&#xe7ee;</i>
   </template>
   ```

#### 总结

- 兼容性最好，支持`ie6+`，及所有现代浏览器。
- 支持按字体的方式去动态调整图标大小，颜色等等。
- 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。

### Font class方式（较友好）

一种更友好的封装，类似于`font-awesome`，我们只要使用`class`，就可以调用图标了。其原理就是利用`before`伪元素来显示图标。

#### 在线使用

超级简单，只要在线生成代码，引用在线的`css`文件即可使用。

![复制在线fontclass的css文件路径](http://qncdn.wbjiang.cn/%E5%9C%A8%E7%BA%BF%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87%E4%BB%A3%E7%A0%81.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

在`index.html`中引用它。

```html
<link rel="stylesheet" href="//at.alicdn.com/t/font_1261797_48wm20jf8z.css">
```

项目中就可以使用字体图标了。

```html
<template>
    <i class="iconfont cl-icon-fold"></i>
    <i class="iconfont cl-icon-delete-solid"></i>
</template>
```

#### 本地使用

与`unicode`方式类似，下载代码到本地。因为我是用`scss`管理样式的，需要在下载的代码中提取出关键部分。除了引用字体库，还要将其中的`iconfont.css`中定义的`before`伪元素全部复制到自己的`scss`文件中。

```
@font-face {
  font-family: "iconfont";
  src: url('../fonts/iconfont.eot'); /* IE9*/
  src: url('../fonts/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../fonts/iconfont.woff') format('woff'), /* chrome, firefox */
  url('../fonts/iconfont.woff2') format('woff2'), /* chrome, firefox */
  url('../fonts/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../assets/fonts/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 列了一部分举例
.cl-icon-user:before {
  content: "\e64b";
}

.cl-icon-video:before {
  content: "\e66b";
}

.cl-icon-pause:before {
  content: "\e7bd";
}

.cl-icon-orgnazation:before {
  content: "\e61b";
}
```

#### 总结

- 兼容性良好，支持`ie8+`，及所有现代浏览器。
- 相比于`unicode`语意明确，书写更直观。可以很容易分辨这个`icon`是什么。
- 因为使用`class`来定义图标，所以当要替换图标时，只需要修改`class`里面的`unicode`引用。
- 不过因为本质上还是使用的字体，所以多色图标还是不支持的。

#### 建议

由于加了新的图标需要重新在`iconfont.cn`重新生成代码，所以这种方式也不算很方便，但是相对于`unicode`还是高级不少。根据我的经验，建议在调试时，不要每次图标更新，就下载到本地更换。应该先使用在线使用的方式，调试完毕确认无误后，再下载到本地使用，这样对于效率提升有很大帮助。

### symbol方式（支持多色图标）

`svg`的`symbol`提供了类似于雪碧图的功能，让`svg`的使用变得更简单，也可以满足做图标系统的需求。可以参考[张大大博客](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)了解更多关于`svg symbol`的知识。

#### 在线使用

首先在`iconfont`项目中选择`symbol`方式，并在线生成`js`代码

![在线svg symbol代码](http://qncdn.wbjiang.cn/%E5%9C%A8%E7%BA%BFsvg%20symbol%E4%BB%A3%E7%A0%81.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

然后在`index.html`中引入这个js文件

```html
<script src="//at.alicdn.com/t/font_1254715_oewlgci0ut.js"></script>
```

这个`js`的作用是在文档中生成`svg symbol`

![1562638406124](http://qncdn.wbjiang.cn/symbol%E6%A0%87%E7%AD%BE.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

最后就可以在页面中通过`use`标签使用`svg`图标了。`xlink:href`的值设置为对应的`symbol`的`id`即可。

```html
<svg aria-hidden="true">
    <use xlink:href="#test-icon-word-ext"></use> 
</svg>
```

效果如下：

![多色svg效果图](http://qncdn.wbjiang.cn/%E5%A4%9A%E8%89%B2svg%E6%95%88%E6%9E%9C%E5%9B%BE.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

多色图标还是酷！

#### 本地使用

本地使用也是一样的道理，主要是依赖这个在线生成的`js`文件，将在线`js`文件的链接在浏览器空标签中打开，就可以得到其内容，然后复制内容，自己命名一个`js`文件，并把它放在本地项目静态资源目录下，引用即可。

![symbol的js文件](http://qncdn.wbjiang.cn/symbol%E7%9A%84js%E6%96%87%E4%BB%B6.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

```html
<script src="./static/js/symbols.js"></script>
```

#### 图标自动管理（必看）

即使使用了`symbol`方式，当设计小姐姐新增图标时，我们还是无法避免重新生成图标代码。那么有没有更优雅的解决方案呢？答案是有的。`svg-sprite-loader` + `require.context`。

`svg-sprite-loader`网上已经有太多文章了。

关于`require.context`，我倒是有一点自己的理解。请查看[一张图带你了解webpack的require.context](http://blog.wbjiang.cn/article/169)。

#### 总结

- 支持多色图标了，不再受单色限制。
- 支持丰富的`css`属性进行定制。
- 兼容性较差，支持 `ie9+`,及现代浏览器。
- 浏览器渲染`svg`的性能一般，还不如`png`。


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)