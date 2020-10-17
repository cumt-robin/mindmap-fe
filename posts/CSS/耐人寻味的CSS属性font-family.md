`font-family`是一个网站用户体验的第一入口，非常有必要花功夫来研究一下。我们首先需要了解衬线字体和无衬线字体，接着了解中英文的常用字体及其适用性。

<!-- more -->

# 衬线字体

衬线（`serif`）的笔画有粗有细的变化，在每一笔画上都自有风格，笔画末端会有修饰，强调艺术感，适合用于博客，旅游，文化，艺术类网站。

# 无衬线字体

无衬线（`sans-serif`）的字体工整方正，给人正式的感觉，适合政务类，企业类网站使用。

# 中文字体

## Windows

- `simsun`，宋体，也是`windows`下大部分浏览器的默认字体，`font-size`较大时清晰度不佳。
- `Microsoft Yahei`，无衬线字体，微软雅黑，是微软委托中国方正设计的一款中文字体。

## Mac OS

- `STHeiti`，华文黑体，`OS X 10.6`之前的简体中文系统界面默认字体，也是目前`Chrome`游览器下的默认字体。
- `STXihei`，华文细黑，比`STHeiti`文字更细。
- `Heiti SC`，黑体-简，从 `OS X 10.6` 开始，黑体-简代替华文黑体用作简体中文系统界面默认字体，显示效果不错，但是喇叭口设计遭人诟病。
- `Hiragino Sans GB`，冬青黑体，清新的专业印刷字体，小字号时足够清晰，拥有很多人的追捧。
- `PingFang SC`，苹方，在`Mac OS X EL Capitan`上，苹果为中国用户打造，去掉了为人诟病的喇叭口。

## Linux

- `WenQuanYi Micro Hei`，文泉驿微米黑，`Linux`最佳简体中文字体。

# 英文字体

## Windows

- `Arial`，无衬线西文字体，显示效果一般。
- `Tahoma`，无衬线字体，显示效果比`Arial`要好。
- `Verdana`，无衬线字体，优点在于它在小字上仍结构清晰端整、阅读辨识容易。

## Mac OS

- `Times New Roman`，衬线字体，`Mac`平台`Safari`下默认的字体。
- `Helvetica`、`Helvetica Neue`，被广泛使用。
- `San Francisco`，与苹方一样，`mac os`最新的西文字体。

# font-family设置原则

- 西文优先：西文字体中大多不包含中文，西文优先，中文紧随其后，这样就不会影响到中文字体的选择。
- 从新到旧：优先体验最好的字体，向下兼容。
- 兼容多种操作系统：考虑`windows, mac os, android, linux`等系统。
- 补充字体族：最后根据衬线`serif`或无衬线`sans-serif`来补充字体族，当所有设置的字体都找不到时，让操作系统有选择字体的方向。

# font-family推荐

```css
font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, "Hiragino Sans GB", "Heiti SC", Arial, "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)