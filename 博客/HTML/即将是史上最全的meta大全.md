本文的目的是搜集当前主流的`meta`配置，方便开发者快速开发调试。在这里不会做各种`meta`的深入分析，只是简单的介绍，让大家知道有这个东西。

<!-- more -->

# meta简述

- `meta`用于描述 `HTML` 文档的元数据。通常用于指定网页的描述，关键词，作者及其他元数据。
- 元数据可以被使用浏览器（如何显示内容或加载页面），搜索引擎（关键词），或其他 `Web` 服务调用。
- `meta`从一定程度上影响`seo`。

# meta支持哪些属性

| 属性       | 值                                                           | 描述                                              |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------- |
| charset    | *character_set*                                              | 定义文档的字符编码。                              |
| content    | *text*                                                       | 定义与 http-equiv 或 name 属性相关的元信息。      |
| http-equiv | content-type<br/>default-style<br/>refresh                   | 把 content 属性关联到 HTTP 头部。                 |
| name       | application-name<br/>author<br/>description<br/>generator<br/>keywords | 把 content 属性关联到一个名称。                   |
| scheme     | *format/URI*                                                 | HTML5不支持。 定义用于翻译 content 属性值的格式。 |

# http-equiv

`meta`标签上的`http-equiv`属性与`http`头部信息相关，而且是响应头，因为`html`本质上是通过服务器响应得到的。`http-equiv`用于伪装 `HTTP` 响应头部信息。那么`http-equiv`有哪些类型呢？让我们一起看下。

| 值               | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| cache-control    | 控制文档的缓存机制。允许的值如下：<br/>`public`：所有内容都将被缓存(客户端和代理服务器都可缓存)<br/>`private`：内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存)<br/>`no-cache`：不缓存，前提是通过服务器的缓存验证机制，如过期，内容改变等校验规则<br/>`no-store`：所有内容都不会被缓存到缓存或 `Internet` 临时文件中<br/>**（设置了貌似无效，还是说不会出现在响应头吗？哪位大神可以解释下）** |
| content-language | 响应体的语言。如`zh-CN`, `en-US`等<br/>**（设置了貌似无效）** |
| content-type     | 返回内容的`MIME`类型                                         |
| date             | 原始服务器消息发出的时间，`GMT`时间格式                      |
| expires          | 响应过期的日期和时间，`GMT`时间格式<br/>`<meta http-equiv="expires" content="Fri, 30 Dec 2011 12:00:00 GMT">`<br/>**（设置了貌似无效）** |
| last-modified    | 请求资源的最后修改时间，`GMT`时间格式<br/>**（设置了貌似无效）** |
| location         | 用来重定向接收方到非请求`URL`的位置来完成请求或标识新的资源<br/>**（设置了貌似无效）** |
| refresh          | 定义间隔多久后刷新页面。单位是秒。                           |
| set-cookie       | 创建一个 `cookie` ，包含 `cookie` 名，`cookie` 值，过期时间。<br/>**（设置了貌似无效）** |
| window-target    | 用来防止别人在框架里调用自己的页面。<br/>`<meta http-equiv="Window-target" content="_top">`<br/>**（设置了貌似无效）** |
| Pragma           | 向后兼容只支持 `HTTP/1.0` 协议的缓存服务器，那时候 `HTTP/1.1` 协议中的 `Cache-Control` 还没有出来。<br/>`<meta http-equiv="Pragma" content="no-cache">`<br/>**（设置了貌似无效）** |

**注意：**以上都是在`chrome`浏览器最新版本， `vue dev`环境下测试的，不代表所有浏览器和服务器表现。

# 常见meta

1. 指定字符编码

   ```html
   <meta charset="UTF-8">
   ```

2. `IE`杀手，推荐所有前端工程师采用，让我们干掉`IE`的市场份额。

   ```html
   <!-- renderer适用于国产双内核浏览器 -->
   <!-- 使用Blink（Webkit） -->
   <meta name="renderer" content="webkit">
   <!-- IE兼容模式，使用ie低版本兼容 -->
   <meta name="renderer" content="ie-comp">
   <!-- IE标准模式，使用ie高版本兼容 -->
   <meta name="renderer" content="ie-stand">
   <!-- force-rendering适用于其他双内核浏览器 -->
   <meta name="force-rendering" content="webkit">
   <!-- 强化对IE的兼容性，强制IE使用最新版标准模式渲染或者使用Chrome Frame渲染 -->
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
   ```

3. `viewport`常见设置，一般适用于移动端。视口宽度设为理想宽度，禁止缩放。

   ```html
   <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
   ```

4. `meta`三剑客

   ```html
   <meta name="description" content="Tusi博客,专注大前端技术架构与分享,关注用户体验">
   <meta name="keyword" content="Tusi博客,web前端,nodejs全栈,响应式,用户体验">
   <meta name="author" content="Tusi">
   ```

5. `UC`浏览器私有`meta`

   ```html
   <!-- 横屏/竖屏 -->
   <meta name="screen-orientation" content="landscape|portrait">
   <!-- 全屏 -->
   <meta name="full-screen" content="yes">
   <!-- 缩放不出滚动条 -->
   <meta name="viewport" content="uc-fitscreen=yes|no">
   <!-- 排版，fitscreen简化页面，适合阅读省流量，standard模式和标准浏览器一致 -->
   <meta name="layoutmode" content="fitscreen|standard" 
   <!-- 夜间模式的启用和禁用 -->
   <meta name="nightmode" content="enable|disable"/>
   <!-- 强制图片显示 -->
   <meta name="imagemode" content="force"/>
   <!-- 强制图片显示，只作用于单图 -->
   <img src="..." show="force">
   <!-- 应用模式,默认全屏，禁止长按菜单，禁止手势，标准排版，以及强制图片显示。 -->
   <meta name="browsermode" content="application">
   ```

6. `QQ`浏览器`X5`内核私有`meta`（现在微信内置浏览器的内核也是`X5`哦）

   ```html
   <!-- 横屏/竖屏 -->
   <meta name="x5-orientation" content="landscape|portrait">
   <!-- 全屏 -->
   <meta name="x5-fullscreen" content="true">
   <!-- 应用模式 -->
   <meta name="x5-page-mode" content="app">
   ```

7. 苹果机适配

   ```html
   <!-- "添加到主屏幕“后，全屏显示 -->
   <meta name="apple-touch-fullscreen" content="yes">
   <!-- 隐藏菜单栏和状态栏，类似于应用模式 -->
   <meta name="apple-mobile-web-app-capable" content="yes|no">
   <!-- 设置状态栏颜色，貌似只有default白色，black黑色，black-translucent灰色半透明 -->
   <meta name=”apple-mobile-web-app-status-bar-style” content=black”>
   <!-- 取消电话号码识别，防止误触拨号 -->
   <meta name="format-detection" content="telephone=no">
   ```

8. 其他优化和适配手段

   ```html
   <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
   <meta name="HandheldFriendly" content="true">
   
   <!-- 微软的老式浏览器 -->
   <meta name="MobileOptimized" content="320">
   
   <!-- windows phone 点击无高光 -->
   <meta name="msapplication-tap-highlight" content="no">
   
   <!-- robots 用来告诉搜索机器人哪些页面需要被检索 -->
   <!-- index 搜索引擎抓取这个页面 -->
   <!-- noindex 搜索引擎不抓取这个页面 -->
   <!-- follow 抓取外链 -->
   <!-- nofollow 不抓取外链 -->
   <meta name="robots" content="index,follow">
   <meta name="robots" content="index,nofollow">
   <meta name="robots" content="noindex,follow">
   <meta name="robots" content="noindex,nofollow">
   
   <!-- referrer 控制http请求头的referer，暂时没想到什么实际应用场景 -->
   <!-- no-referrer 不发referer -->
   <!-- origin 只发送origin部分 -->
   <!-- no-referrer-when-downgrade 默认值，当目的地是先验安全的(https->https)则发送origin作为 referrer，但是当目的地是较不安全的(https->http)时则不发送referrer -->。
   <!-- origin-when-crossorigin 在同源请求下，发送完整的URL(不含查询参数)，其他情况下则仅发送当前文档的origin -->
   <!-- unsafe-URL 在同源请求下，发送完整的URL(不含查询参数) -->
   origin-when-crossorigin
   <meta name="referrer" content="no-referrer">
   
   <!-- og: Open Graph Protocol，一种友好的配置，让自己的网站在社交网络分享中更得心应手，更多的配置可以去自行搜索 -->
   <!-- og:type 告诉SNS，我这是一个什么类型的网站 -->
   <meta property=”og:type” content=”article”/>
   <!-- og:title 告诉SNS，分享时告诉用户我这个网站的标题是什么，别自己瞎搞个标题 -->
   <meta property=”og:title” content=”Tusi博客”/>
   <meta property=”og:url” content=”https://blog.wbjiang.cn”/>
   <!-- og:image 缩略图 -->
   <meta property=”og:image” content=”/static/imgs/thumbnail.png”/>
   <meta property=”og:description” content=”专注于大前端技术架构与分享，关注用户体验”/>
   ```


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)