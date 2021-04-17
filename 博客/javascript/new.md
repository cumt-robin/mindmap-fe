---
title: 面试官真的会问：new的实现以及无new实例化
tags:
  - 构造函数
thumbnail: http://qncdn.wbjiang.cn/new%E8%BF%98%E6%98%AF%E4%B8%8Dnew.png
keywords: '构造函数,Tusi,博客,前端,全栈,微信小程序'
date: 2020-07-16 13:32:47
categories: javascript
---

面试官很忙，但我不单纯是蹭热点，今天聊的主题绝对是面试中命中率很高的知识点。我在复习javascript函数这块知识时，注意到一个有意思的点，就是构造函数显式return，并由此引发了一波头脑风暴......

<!-- more -->

我们知道，如果不做特殊处理，new构造函数时会发生下面这几步。

- 首先创建一个新对象，这个新对象的`__proto__`属性指向构造函数的`prototype`属性
- 此时构造函数执行环境的`this`指向这个新对象
- 执行构造函数中的代码，一般是通过`this`给新对象添加新的成员属性或方法。
- 最后返回这个新对象。

下面我们来验证下：

```javascript
function Test() {
  console.log(JSON.stringify(this));
  console.log(this.__proto__.constructor === Test);
  this.name = 'jack';
  this.age = 18;
  console.log(JSON.stringify(this));
}
var a = new Test();
// Chrome控制台会输出以下内容
// {}
// true
// {"name":"jack","age":18}
```

这完全符合我们的认知，没毛病。

# 实现一个new

那么在认识到new实例化过程的几个关键步骤后，我们也能解答一道面试中常见的题目：如何实现一个new？

实现一个new也就意味着不能用new关键字，那么要完成这么一系列步骤，当然是通过函数实现了。

```javascript
// func是构造函数，...args是需要传给构造函数的参数
function myNew(func, ...args) {
  // 创建一个空对象，并且指定原型为func.prototype
  var obj = Object.create(func.prototype);
  // new构造函数时要执行函数，同时指定this
  func.call(obj, ...args);
  // 最后return这个对象
  return obj;
}
```

以这四个关键步骤作为指导思想，我们很快就写出了代码实现。从这一点我也能体会到思路的重要性，别当工具人，代码才是工具！

从实现逻辑上来看没什么问题，我们来验证下。

```javascript
function Test(name, age) {
  this.name = name;
  this.age = age;
}

myNew(Test, '小明', 18);
// Chrome控制台会输出以下内容
// Test {name: "小明", age: 18}
```

# 构造函数显式return

所谓显式return，就是在构造函数中主动return一个对象，这里说的对象不仅包括`Object`，也包含`Array`，`Date`等对象哦。

我们可以试一试：

```javascript
function Test() {
  this.name = 'jack';
  this.age = 18;
  return {
    content: '我有freestyle'
  }
}
new Test();
// Chrome控制台会输出以下内容
// {content: "我有freestyle"}
```

那么return一个普通类型数据有没有用呢？比如字符串，数字？试试便知。

```javascript
function Test() {
  this.name = 'jack';
  this.age = 18;
  return '我有freestyle'
}
new Test();
// Chrome控制台会输出以下内容
// Test {name: "jack", age: 18}
```

可以看到，当我们return一个普通类型数据时，不会影响结果，依然会返回new出来的这个新对象。

我们也应该知道，new构造函数就是为了创建对象，你return一个字符串之类的普通类型数据是没有任何意义的，所以我们的关注点应该是return一个特殊的对象。请接着往下看。

# 无new实例化

所谓“无new实例化”，就是指不通过new关键字实例化对象（当然，这里说的不通过new，只是调用层面的，底层还是用了new）。这一点我们使用jQuery的时候已经体验过了。

```javascript
// 实例化了一个jQuery对象，但是没有用到new
var ele = jQuery('<div>freestyle</div>');
```

那么这种黑科技是怎么实现的呢？

前面已经提到了，我们可以在构造函数中通过显式return来返回一个自定义的对象，那么这里就有发挥的空间了。我们通过一个简单的例子来感受下：

```javascript
function Shadow() {
  this.name = 'jack';
  this.age = 18;
}

function jQuery() {
  return new Shadow();
}

var obj1 = jQuery();
console.log(obj1)
// Chrome控制台会输出以下内容
// Shadow {name: "jack", age: 18}
```

`jQuery()`用了移花接木的障眼法完成了对象实例化，一手隐藏的`new Shadow()`让我们误以为不用`new`直接调用函数也能创建实例。

我们再来试下`new jQuery()`，会发现，“卧槽，怎么跟`jQuery()`执行结果一模一样！”

```javascript
var obj2 = new jQuery();
console.log(obj2)
// Chrome控制台会输出以下内容
// Shadow {name: "jack", age: 18}
```

这是因为new构造函数显式return了`new Shadow()`，这样返回的结果也就是`new Shadow()`实例化出来的对象，而不使用`new`直接调用`jQuery()`，只是把`jQuery()`当成一个普通的函数执行，其结果不言而喻是`new Shadow()`实例化出来的对象。

所以，这里`new jQuery()`和`jQuery()`是等价的。

虽然jQuery已经用得越来越少，但是其设计思路非常值得我们学习。那么jQuery到底妙在哪里？可以说是很多，链式操作，插件体系这些特色都是我们耳熟能详的。不扯太多了，就让我们来简单分析下jQuery实例化的过程。

我这里拿到了jQuery v1.12.4版本的代码，大概1W行，很舒服。

翻啊翻啊，翻到了第71行，看到了这么一串代码：

```javascript
jQuery = function( selector, context ) {
  return new jQuery.fn.init( selector, context );
}
```

这不就是我们熟悉的移花接木技术吗？`jQuery.fn.init`似乎就是上面例子中的`Shadow`。看着有点像了，但是还是要好好研究下。

## 为啥要搞个jQuery.fn?

jQuery.fn是jQuery.prototype的别名，是为了代码简洁的考虑。这一点参考源码第91行就可以知道。

```javascript
jQuery.fn = jQuery.prototype = {
// ......
```

## 移花接木如何保证原型指向？

我们知道，如果仅仅通过`new jQuery.fn.init(selector, context)`是存在一个问题的，问题就是得到的实例不是`jQuery`的实例，而是`jQuery.fn.init`的实例。那么如何处理这个问题呢？

我们翻到源码2866行，可以看到：

```javascript
init = jQuery.fn.init = function( selector, context, root ) {
  // 创建实例的具体逻辑
}
```

具体`init`方法怎么创建一个jQuery对象，做了哪些判断逻辑，这些都不是本文关注的重点。我们需要关注的是，jQuery是如何保证实例化的对象的原型指向是正确的？不然实例化的对象如何使用`jQuery.prototype`上面挂载的诸多方法呢，比如`this.show()`、`this.hide()`？

紧接着翻到2982行，我有了答案：

```javascript
init.prototype = jQuery.fn;
```

![牛逼](http://qncdn.wbjiang.cn/%E7%89%9B%E9%80%BC.gif)

妙啊，这一手修改原型指向的操作，完美解决了这个问题。这样一来，`new init()`得到的实例自然也是`jQuery`的实例。

```javascript
jQuery.prototype.init.prototype === jQuery.prototype; // true
var a = $('<div>123</div>')
a instanceof jQuery // true
a instanceof jQuery.fn.init // true
```

这样一来，我们可以得到一个基本的设计思路：

```javascript
function myModule(params) {
  return new myModule.fn.init(params);
}
myModule.fn = myModule.prototype = {
  constructor: myModule
}
myModule.fn.init = function(params) {
  // 可以对实例对象进行各种操作
}
myModule.fn.init.prototype = myModule.prototype;
```

在这个基础上，我们可以扩展静态方法和原型方法，这个myModule模块就变得越来越丰富。

# 最后

妙啊，一个构造函数，让我陷入了思考......扶我起来，我还能学！

![一起学前端吗](http://qncdn.wbjiang.cn/%E4%B8%80%E8%B5%B7%E5%AD%A6%E5%89%8D%E7%AB%AF%E5%90%97.jpg)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)