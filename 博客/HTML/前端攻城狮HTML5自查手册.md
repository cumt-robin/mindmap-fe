HTML5自2014年发布以来，已经有快5个年头了。但是很多人对H5有哪些新特性，兼容性如何仍然是一头雾水的。为了让自己以后方便查阅，本文整理一下H5的相关知识点，不做深入的探讨，错误之处还请指正！

<!-- more -->

# HTML5标签上的改动

[HTML 5 参考手册](http://www.w3school.com.cn/html5/html5_reference.asp)

## 废弃或不支持的标签

 - <code>&lt;acronym&gt;</code>

定义首字母缩略词。HTML5 不支持 <code>&lt;acronym&gt;</code> 标签。请使用 <code>&lt;abbr&gt;</code> 标签代替它。

- <code>&lt;applet&gt;</code>

可以嵌入Java语言编写的小应用程序。HTML5 不支持 <code>&lt;applet&gt;</code> 标签。请使用 <code>&lt;object&gt;</code> 标签代替它。在 HTML 4.01 中，<code>&lt;applet&gt;</code> 元素 已废弃。

- <code>&lt;basefont&gt;</code>

只有 IE 9 和更早版本的 IE 浏览器支持 <code>&lt;basefont&gt;</code> 标签。应该避免使用该标签。在 HTML 4.01 中，<code>&lt;basefont&gt;</code> 元素 已废弃。

- <code>&lt;big&gt;</code>

用来制作更大的文本。HTML5 不支持 <code>&lt;big&gt;</code> 标签。请用 CSS 代替。

- <code>&lt;center&gt;</code>

对其所包括的文本进行水平居中。在 HTML 4.01 中，<code>&lt;center&gt;</code> 元素 已废弃

- <code>&lt;dir&gt;</code>

被用来定义目录列表，类似ul，ol。在 HTML 4.01 中，<code>&lt;dir&gt;</code> 元素 已废弃。

- <code>&lt;font&gt;</code>

规定文本的字体、字体尺寸、字体颜色。在 HTML 4.01 中，<code>&lt;font&gt;</code> 元素 已废弃。

- <code>&lt;frame&gt;</code>

定义 <frameset> 中的子窗口（框架），必须放在<code>&lt;frameset&gt;</code>标签中，且不能与<code>&lt;body&gt;</code>共存。HTML5 不支持 <code>&lt;frame&gt;</code> 标签。

- <code>&lt;frameset&gt;</code>

定义一个框架集，被用来组织一个或者多个<code>&lt;frame&gt;</code>元素。每个<code>&lt;frame&gt;</code>有各自独立的文档。HTML5 不支持<code>&lt;frameset&gt;</code>标签。

- <code>&lt;isindex&gt;</code>

使浏览器显示一个对话框，提示用户输入单行文本，该特性已经从 Web 标准中删除。

- <code>&lt;noframes&gt;</code>

可为那些不支持框架的浏览器显示文本。HTML5 不支持 <code>&lt;noframes&gt;</code>标签。

```
<frameset cols="25%,50%,25%">
  <frame src="frame_a.htm">
  <frame src="frame_b.htm">
  <frame src="frame_c.htm">
  <noframes>Sorry, your browser does not handle frames!</noframes>
</frameset>
```

- <code>&lt;strike&gt;</code>

定义加删除线文本。在 HTML 4.01 中，<code>&lt;strike&gt;</code> 元素 已废弃。HTML5 不支持 <code>&lt;strike&gt;</code> 标签。请用 <code>&lt;del&gt;</code> 标签代替。

- <code>&lt;tt&gt;</code>

定义打字机文本。HTML5 不支持<code>&lt;tt&gt;</code>标签。请用 CSS 代替。

## 新增的标签

IE 9+、Firefox、Opera、Chrome 和 Safari 都支持新增的大部分 H5 标签。

### 结构标签

- <code>&lt;main&gt;</code>

规定文档的主要内容。在一个文档中，不能出现一个以上的 <code>&lt;main&gt;</code> 元素。<code>&lt;main&gt;</code> 元素不能是以下元素的后代：<code>&lt;article&gt;</code>、<code>&lt;aside&gt;</code>、<code>&lt;footer&gt;</code>、<code>&lt;header&gt;</code> 或 <code>&lt;nav&gt;</code>。所有浏览器都支持<code>&lt;main&gt;</code>标签，除了 Internet Explorer。

- <code>&lt;article&gt;</code>

定义独立的内容，内容本身必须是有意义的且必须是独立于文档的其余部分。比如：论坛帖子，博客文章，新闻故事，评论。

- <code>&lt;aside&gt;</code>

常用作侧边栏。

- <code>&lt;section&gt;</code>

定义了文档的某个区域。比如章节、头部、底部或者文档的其他区域。

- <code>&lt;header&gt;</code>

定义文档或者文档的一部分区域的页眉。

- <code>&lt;hgroup&gt;</code>

被用来对标题元素进行分组。

- <code>&lt;footer&gt;</code>

定义文档或者文档的一部分区域的页脚。

- <code>&lt;nav&gt;</code>

定义导航链接的部分。

### 媒体标签

- <code>&lt;audio&gt;</code>

定义声音，比如音乐或其他音频流。支持的3种文件格式：MP3、Wav、Ogg。

- <code>&lt;video&gt;</code>

定义视频，比如电影片段或其他视频流。支持三种视频格式：MP4、WebM、Ogg。

- <code>&lt;track&gt;</code>

为媒体元素（比如 <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code>）规定外部文本轨道。IE 10、Opera 和 Chrome 浏览器支持 <code>&lt;track&gt;</code> 标签，其他浏览器不支持。

- <code>&lt;source&gt;</code>

为媒体元素（比如 <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code>）定义媒体资源。

### 其他标签

- <code>&lt;canvas&gt;</code>

画布，可以绘制丰富的图形，赋予了html更多想象的空间。

- <code>&lt;datalist&gt;</code>

配合<code>&lt;option&gt;</code>标签制作下拉列表，与<code>&lt;select&gt;</code>不同的一点是，<code>&lt;datalist&gt;</code>支持输入，模糊匹配。

- <code>&lt;details&gt;</code>

类似于折叠面板的一个控件，规定了用户可见的或者隐藏的需求的补充细节。<code>&lt;summary&gt;</code>标签可以为 <code>&lt;details&gt;</code> 定义标题。标题是可见的，用户点击标题时，会显示出 <code>&lt;details&gt;</code>。目前，只有 Chrome 和 Safari 6 支持 <code>&lt;details&gt;</code> 标签。

- <code>&lt;summary&gt;</code>

与<code>&lt;details&gt;</code>标签配合使用。只有 Chrome 和 Safari 6 支持 <code>&lt;summary&gt;</code> 标签。

- <code>&lt;embed&gt;</code>

定义了一个容器，用来嵌入外部应用或者互动程序（插件），例如flash等。

- <code>&lt;figure&gt;</code>

规定独立的流内容（图像、图表、照片、代码等等）。

- <code>&lt;figcaption&gt;</code>

<code>&lt;figcaption&gt;</code>元素被用来为<code>&lt;figure&gt;</code>元素定义标题。

- <code>&lt;mark&gt;</code>

定义带有记号的文本。请在需要突出显示文本时使用<code>&lt;mark&gt;</code> 标签。

- <code>&lt;meter&gt;</code>

定义度量衡。仅用于已知最大和最小值的度量。不能作为一个进度条来使用。Firefox、Opera、Chrome 和 Safari 6 支持 <code>&lt;meter&gt;</code> 标签。IE不支持该标签。

- <code>&lt;progress&gt;</code>

定义运行中的任务进度（进程）。有value和max属性。

- <code>&lt;output&gt;</code>

作为计算结果输出显示(比如执行脚本的输出)。配合两个<code>&lt;input&gt;</code>使用，可实时求和。Internet Explorer 浏览器不支持 <code>&lt;output&gt;</code> 标签。

- <code>&lt;ruby&gt;</code>

定义 ruby 注释（中文注音或字符）。

- <code>&lt;rp&gt;</code>

在 ruby 注释中使用，以定义不支持 ruby 元素的浏览器所显示的内容。

- <code>&lt;rt&gt;</code>

定义字符（中文注音或字符）的解释或发音。

- <code>&lt;time&gt;</code>

定义公历的时间（24 小时制）或日期，时间和时区偏移是可选的。用datetime属性对标签中的文字作时间解释。

- <code>&lt;bdi&gt;</code>

允许您设置一段文本，使其脱离其父元素的文本方向设置。具体应用不详。

### 让IE8及以下版本也支持H5新标签

我们经常会用到<code>&lt;main&gt;</code>、<code>&lt;article&gt;</code>、<code>&lt;aside&gt;</code>、<code>&lt;footer&gt;</code>、<code>&lt;header&gt;</code> 、<code>&lt;nav&gt;</code>来进行页面布局，那么如何解决IE8及以下版本支持这些标签呢？只要利用createElement让浏览器识别这些标签，并在css中给他们设置一些属性即可，比如<code>display:block</code>。现成的解决方案就是[<code>htmlshiv.js</code>](https://github.com/aFarkas/html5shiv)。

```
<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<![endif]-->
```

如果有打印需求，则需要<code>html5shiv-printshiv.js</code>，它包含 <code>html5shiv.js</code> 的全部功能，并且额外支持 IE6-8 网页打印时 HTML5 元素样式化。

# HTML5属性上的改动

## 新增的属性

IE 9+、Firefox、Opera、Chrome 和 Safari 都支持新增的大部分 H5 属性，特殊情况会在每一项处有说明。

[HTML5标准属性](http://www.w3school.com.cn/html5/html5_ref_standardattributes.asp)

- <code>contenteditable</code>

规定是否允许用户编辑内容。可用于制作富文本等功能。兼容性较好，见下图。
![contenteditable兼容性良好](http://qncdn.wbjiang.cn/contenteditable%E5%85%BC%E5%AE%B9%E6%80%A7%E8%89%AF%E5%A5%BD.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)
- <code>contextmenu</code>

规定了元素的上下文菜单。当用户右击元素时将显示上下文菜单。<code>contextmenu</code> 属性的值是需要打开的<code>&lt;menu&gt;</code>元素的 id。兼容性不好，目前只有 Firefox 浏览器支持 <code>contextmenu</code> 属性。

- <code>data-*</code>

管理自定义属性。自定义属性可通过元素的dataset进行访问。如ele.dataset.customAttr。

兼容性见下图，IE6~8也支持data-*，但是不能通过dataset访问，必须用getAttribute访问。
![h5自定义属性兼容性](http://qncdn.wbjiang.cn/h5%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E5%85%BC%E5%AE%B9%E6%80%A7.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

- <code>draggable</code>

规定元素是否可拖动。链接和图像默认是可拖动的。
```
<element draggable="true|false|auto">
```

主要关注的内容有属性<code>draggable</code>，事件<code>ondragstart</code>，事件<code>ondragover</code>，事件<code>ondrop</code>，数据属性<code>dataTransfer</code>，以及<code>dataTransfer</code>下的两个方法<code>setData</code>和<code>getData</code>。

简单demo可以参考[HTML5拖放教程](http://www.runoob.com/html/html5-draganddrop.html)。

- <code>hidden</code>

hidden 属性规定对元素进行隐藏。IE兼容性不太好，避免使用，用css替代即可。
![hidden属性兼容性](http://qncdn.wbjiang.cn/hidden%E5%85%BC%E5%AE%B9%E6%80%A7.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)
- <code>spellcheck</code>

规定是否对元素内容进行拼写检查。启用后会对单词进行拼写检查，不正确的单词会有波浪线提示。
Internet Explorer 10, Firefox, Opera, Chrome, 和 Safari 浏览器支持 spellcheck 属性。

```
<element spellcheck="true|false">
```

## 更丰富的表单

### input支持更多type

 HTML5 中的新类型：color、date、datetime、datetime-local、month、week、time、email、number、range、search、tel 和 url。其实也是一种语义化的表现。

|值| 描述 |
|--|--|
| color |  定义拾色器。兼容性很差，对IE，Edge，Safari等浏览器不友好，详细情况见[兼容性](https://www.caniuse.com/#search=color)|
| date |  定义 date 控件（包括年、月、日，不包括时间）。[兼容性](https://www.caniuse.com/#search=date)很差。|
| datetime |  定义 date 和 time 控件（包括年、月、日、时、分、秒、几分之一秒，基于 UTC 时区）。[兼容性](https://www.caniuse.com/#search=datetime)很差。|
| datetime-local |  定义 date 和 time 控件（包括年、月、日、时、分、秒、几分之一秒，不带时区）。[兼容性](https://www.caniuse.com/#search=datetime-local)很差。|
| month |  定义 month 和 year 控件（不带时区）。[兼容性](https://www.caniuse.com/#search=month)很差。|
| week |  定义 week 和 year 控件（不带时区）。[兼容性](https://www.caniuse.com/#search=week)很差。|
| time |  定义用于输入时间的控件（不带时区）。[兼容性](https://www.caniuse.com/#search=time)很差。|
| email | 定义用于 e-mail 地址的字段。会对邮箱进行格式检查。支持IE10以上，详细情况见[兼容性](https://www.caniuse.com/#search=email)|
| number |  定义用于输入数字的字段。在各个浏览器上有一些[差异](https://www.caniuse.com/#search=number)![number兼容性](http://qncdn.wbjiang.cn/number%E5%85%BC%E5%AE%B9%E6%80%A7.png?imageMogr2/auto-orient/blur/1x0/quality/75\|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10) |
| range |  定义滑块。支持IE10以上，详细情况见[兼容性](https://www.caniuse.com/#search=range)|
| search |  定义用于输入搜索字符串的文本字段。支持IE10以上，但是在UI表现上与text没有差别。[查看详情](https://www.caniuse.com/#search=search)|
| tel |  定义用于输入电话号码的字段。支持IE10以上，详细情况见[兼容性](https://www.caniuse.com/#search=tel)|
| url |  定义用于输入 URL 的字段。会对url进行格式检查。支持IE10以上，详细情况见[兼容性](https://www.caniuse.com/#search=url)|

### 其他表单控件属性

|属性| 描述 |
|--|--|
| placeholder |  可描述输入字段预期值的简短的提示信息，支持IE10以上，适用于下面的 input 类型：text、search、url、tel、email 和 password。|
| autofocus |  页面加载时自动获得焦点，支持IE10以上。|
| multiple |  规定允许用户输入到 input 元素的多个值。适用于以下 input 类型：email 和 file。常见于上传文件时选择多个文件。|
| form |  规定 input 元素所属的一个或多个表单的 id 列表，以空格分隔。可以实现将 input 放在 form 标签外部。但是不支持IE。|
| required |  规定必需在提交表单之前填写输入字段，支持IE10以上。|
| maxlength |  规定 input 元素中允许的最大字符数，适用于text类型。|
| minlength |  规定 input 元素中允许的最小字符数，适用于text类型。|
| max |  规定 input 元素的最大值，max 和 min 属性适用于以下 input 类型：number、range、date、datetime、datetime-local、month、time 和 week。支持IE10以上，不支持firefox，其中IE10不支持max用于date 和 time类型。|
| min |  规定 input 元素的最小值。|
| pattern |  规定 input 元素的正则表达式校验。适用于下面的 input 类型：text、search、url、tel、email 和 password。应该配合 title 属性提示用户。|

# HTML5其他新特性

支持IE9+

## 音视频

|标签| 描述 |
|--|--|
| source |  为媒体元素（比如 video 和 audio）定义媒体资源。主要定义其 src 属性和 type 属性，src 规定媒体文件的 URL，type 规定媒体资源的 MIME 类型。|
| audio |  定义音频。对mp3文件的兼容性最好。![audio媒体支持](http://qncdn.wbjiang.cn/audio%E5%AA%92%E4%BD%93%E6%94%AF%E6%8C%81.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)|
| video |  定义视频。对MP4文件的兼容性最好。![video媒体支持](http://qncdn.wbjiang.cn/video%E5%AA%92%E4%BD%93%E6%94%AF%E6%8C%81.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)|

## 画布canvas

可以说是前端高级部分了，这里一言难尽，慢慢学习吧。支持IE9+。与之相关的svg也是支持IE9+。

## Web存储

主要包括sessionStorage和localStorage，操作的API都类似，区别是sessionStorage是会话级存储，localStorage是持久化存储。兼容性挺好，支持IE8+。

## 地理定位geolocation

navigator下的一个属性，鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。支持IE9+。

## HTML5 Application Cache

实现网页离线访问的利器。支持IE10+。相关的最新技术还有PWA等。

## Web Worker

让js也能做多线程的事情，相关内容可以参考[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)上也有比较详细的解释。

## HTML 5 服务器发送事件 EventSource

EventSource 接口用于接收服务器发送的事件。它通过HTTP连接到一个服务器，以text/event-stream 格式接收事件, 不关闭连接(即长连接)。兼容性不是很好，IE和Edge直接废了。不过有一个兼容方案 [event-source-polyfill](https://www.npmjs.com/package/event-source-polyfill)。

## HTML5 WebSocket

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。对IE10+能较好兼容，对于不兼容的浏览器，也有很多优雅降级方案，一般是降级成ajax轮询等，像[socket.io](https://socket.io/)。

## 通知接口Notification

Notifications API 的通知接口用于向用户显示桌面通知。查看[具体用法](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)。[兼容性](https://www.caniuse.com/#search=Notification)不是很好，但是用起来网站的逼格高不少，如果是IE就直接放弃吧。


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)