---
title: 写给自己的Object和Function的3个灵魂拷问
tags:
  - 原型
  - 函数
thumbnail: http://qncdn.wbjiang.cn/%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%81%B5%E9%AD%82%E6%8B%B7%E9%97%AE.png
keywords: '原型,函数,Tusi,博客,前端,全栈,微信小程序'
date: 2020-08-07 14:12:21
categories: javascript
---

最近在研究函数和原型链这块内容时，我遇到了不少疑惑，对自己而言，这些疑惑可以算得上是灵魂拷问吧。在一步步探究和查证的过程中，我也许理解了一部分，也许还是什么都没懂吧，以文记之，只求能收获二三分。不知这里面有没有你遇到的疑惑呢？一起来看下吧！

<!-- more -->

# Object和Function谁是谁的实例

## Object instanceof Function

`instanceof`检查的是右操作数的`prototype`属性是否在左操作数的原型链上。

首先`Object`是一个对象类型的构造函数，而函数的构造函数是谁，当然是函数的鼻祖`Function`。所以`Object`是`Function`的实例这一点还是比较容易理解的。

```javascript
Object.__proto__ === Function.prototype;
// true
```

其实通过下面的代码也可以侧面证明`Object`是`Function`的实例。

```javascript
Object.constructor === Function;
// true
```

## Function instanceof Object

`Function`反过来又是`Object`的实例，这又该如何理解呢？我们知道，除去`null`这种情况，原型链的顶端是`Object.prototype`，这一定程度上说明了javascript中所有的引用类型都是由`Object.prototype`构造而来。

按照我们一般的思路来看，实例的原型可以通过构造函数的`prototype`属性来访问。那么这里的实例主角是谁？没错，是`Function`，那么`Function`有构造函数吗？显然，在我们认知的javascript中，`Function`本身就是函数的构造器，自然是没有`Function`的构造函数的，有的话，那也是`V8`引擎干的事了吧。

那么没有构造函数就不配有原型了吗？答案是否定的。还记得我在[「思维导图学前端 」6k字一文搞懂Javascript对象，原型，继承](https://juejin.im/post/5ee9ac91f265da02aa2e751e "「思维导图学前端 」6k字一文搞懂Javascript对象，原型，继承")中提到的`Object.create()`方法吗？通过`Object.create()`可以直接创建一个新对象，并可以指定现有的对象作为这个新对象的原型，此过程并没有构造函数参与进来。你想啊，连`ES5`暴露给我们的API都能这么做，那么在实现`V8`等js引擎的过程当然也可以这么做。

所以，`Function`也有原型，也就是`Function.__proto__`。那么`Function.__proto__`到底指向哪里？我们可以从下面这个语句中发现端倪。

```javascript
Function.__proto__ === Function.prototype;
// true
```

上面的表达式的结果是`true`。震惊，`Function.__proto__`竟然是`Function.prototype`！

而`Function.prototype`的原型就是`Object.prototype`。这一点可以从下面的语句中得到验证！

```javascript
Function.prototype.__proto__ === Object.prototype;
// true
```

由于从`Function`到`Object.prototype`存在这样一段原型链关系，所以`Function instanceof Object`也是成立的。

![原型链](http://qncdn.wbjiang.cn/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

## Object instanceof Object

从上面我们已经知道`Object instanceof Function`和`Function instanceof Object`都是成立的。根据这些已知结果，我们很容易推断出`Object instanceof Object`也是成立的。这是因为`Object`是`Function`的实例，`Function`是`Object`的实例，显然`Object`也是`Object`的实例。

```javascript
Object instanceof Object; // true
```

## Function instanceof Function

有了以上的推论过程，我们自然也能理解`Function instanceof Function`是成立的。

# Function.prototype是一个函数？

```javascript
Function.prototype;
// ƒ () { [native code] }

// 以下代码可以正常执行
Function.prototype();
```

`Function.prototype()`可以执行，不会报错，说明`Function.prototype`真的是一个函数。

```javascript
typeof Function.prototype; // "function"
```

还有个有意思的地方，就是：

```javascript
Function.prototype.constructor === Function;
// true
```

666，`Function`的原型指向`Function.prototype`，而`Function.prototype`的构造器反过来又是`Function`，有内味了！

> 回头想了一下，这是原型三角关系，思考这部分的时候有点被绕进去了，小题大做了。

# Function和Object鸡生蛋蛋生鸡？

有了上面这些复杂的关系，我们不免要问问自己，到底是先有`Object`还是`Function`？

我也尝试从V8源码去找一些线索，但是恕我太菜，学校教的C++基本忘光了，从源码中完全找不到思路。[V8的官方文档](https://v8.dev/docs "V8的官方文档")也没有说这些东西（可能是我没找到吧）。

于是我找了一些分析这个问题的文章，大概有了一些认知。重要的事情说三遍：

只是认知，不是答案！

只是认知，不是答案！

只是认知，不是答案！

毕竟我也没找到直接甩V8源码进行分析的文章，如果有大佬知道这方面资源，还望分享一下链接，感谢！

OK，总体的认知是这样的，加了一些我的理解在里面，希望对你有所帮助！

- V8先构造了`Object`的原型[[Prototype]]，简称OP，初始化其内部属性，但不包括其行为。这里有必要猜想一下，这里说的“内部属性”应该是OP在V8引擎中的属性，因为我看`Object.prototype`基本上是没有属性的，只有方法。而行为，则代表方法。
- 基于OP构造了`Function`的原型[[Prototype]]，简称FP，初始化其内部属性，但不包括其行为。
- 将FP的原型[[Prototype]]指向OP。
- 创建各种内置引用类型如`Object`, `Function`, `Array`, `Date`等。
- 将各个内置引用类型的[[Prototype]]指向FP。
- 将`Function`的`prototype`属性指向FP。
- 将`Object`的`prototype`属性指向OP。
- 用`Function`实例化OP，FP，`Object`的**行为**并挂载。这里别看错了，是实例化行为，也就是把OP，FP，`Object`的方法创建好，然后挂载到相应对象上。
- 用`Object`实例化**除了**`Object`及`Function`**之外**的其他内置引用类型的`prototype`属性对象。**除了之外**这四个字是一个要关注的重点，另一个重点就是要理解`prototype`是一个对象，所以用`Object`实例化。
- 用`Function`实例化**除了**`Object`及`Function`**之外**的其他内置引用类型的`prototype`属性对象的行为并挂载。我们知道，`prototype`是一个对象，在上一步被创建了，`prototype`对象下会有很多方法，比如数组的`push()`方法，就是在这个时候被创建的。而方法当然是用`Function`实例化。
- 实例化内置对象Math以及Global对象。

上面说的[[Prototype]]指的是一个对象的原型，与我们所熟知的`prototype`是有区别的，`prototype`只是一个属性，是指向原型的一个引用。

理清[[Prototype]]和`prototype`的关系后，再仔细去想想，你会发现上面说的这些步骤是有道理的。慢慢品味吧！

所以严格上来说，`Function`和`Object`没有创建时间上的先后顺序关系，与它们相比，先出现的也是它们的原型[[Prototype]]。而在它们的原型中，先有的是`Object`的原型，后有的是`Function`的原型。

`Function`和`Object`没有所谓的鸡生蛋和蛋生鸡的关系，它们之间是一种互相成就的关系。

灵魂拷问总是让人难以回答，啰嗦了一番，不知道我懂了没，也不知道在座的各位懂了没......

可以参考的资料有：

- [ECMAScript5注解](https://es5.github.io/ "ECMAScript5注解")

- [高能！typeof Function.prototype 引发的先有 Function 还是先有 Object 的探讨](https://segmentfault.com/a/1190000005754797 "高能！typeof Function.prototype 引发的先有 Function 还是先有 Object 的探讨")

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)