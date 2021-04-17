这段时间我试着通过思维导图来总结知识点，主要关注的是一些相对重要或理解难度较高的内容。下面是同系列文章：

- [「思维导图学前端 」6k字一文搞懂Javascript对象，原型，继承](https://juejin.im/post/6844904194097299463)
- [「思维导图学前端 」初中级前端值得收藏的正则表达式知识点扫盲](https://juejin.im/post/6850037267365855239)

如果您需要换个角度看闭包，请直接打开[解读闭包，这次从ECMAScript词法环境，执行上下文说起](https://juejin.im/post/6858052418862235656)。

本文总结了javascript中函数的常见知识点，包含了基础概念，**闭包**，**this指向问题**，高阶函数，**柯里化**等，**手写代码**那部分也是满满的干货，无论您是想复习准备面试，还是想深入了解原理，本文都应该有你想看的点，总之还是值得一看的。

<!-- more -->

老规矩，先上思维导图。

![函数思维导图](http://qncdn.wbjiang.cn/%E5%87%BD%E6%95%B0.png)

# 什么是函数

> 一般来说，一个函数是可以通过外部代码调用的一个“子程序”（或在递归的情况下由内部函数调用）。像程序本身一样，一个函数由称为函数体的一系列语句组成。值可以传递给一个函数，函数将返回一个值。

函数首先是一个对象，并且在javascript中，函数是一等对象（first-class object）。函数可以被执行（**callable**，拥有内部属性[[Call]]），这是函数的本质特性。除此之外，函数可以**赋值给变量**，也可以**作为函数参数**，还可以**作为另一个函数的返回值**。

# 函数基本概念

## 函数名

函数名是函数的标识，如果一个函数不是匿名函数，它应该被赋予函数名。

- 函数命名需要符合**javascript标识符**规则，必须以字母、下划线_或美元符$开始，后面可以跟数字，字母，下划线，美元符。
- 函数命名不能使用javascript保留字，保留字是javascript中具有特殊含义的标识符。
- 函数命名应该语义化，尽量采用动宾结构，小驼峰写法，比如`getUserName()`，`validateForm()`, `isValidMobilePhone()`。
- 对于构造函数，我们通常写成大驼峰格式（因为构造函数与类的概念强关联）。

下面是一些不成文的约定，不成文代表它不必遵守，但是我们按照这样的约定来执行，会让开发变得更有效率。

- `__xxx__`代表非标准的方法。
- `_xxx`代表私有方法。

## 函数参数

### 形参

形参是函数定义时约定的参数列表，由一对圆括号`()`包裹。

在MDN上有看到，一个函数最多可以有`255`个参数。

然而形参太多时，使用者总是容易在引用时出错。所以对于数量较多的形参，一般推荐把所有参数作为属性或方法整合到一个对象中，各个参数作为这个对象的属性或方法来使用。举个例子，微信小程序的提供的API基本上是这种调用形式。

```javascript
wx.redirectTo(Object object)
```

调用示例如下：

```javascript
wx.redirectTo({
  url: '/article/detail?id=1',
  success: function() {},
  fail: function() {}
})
```

形参的数量可以由函数的`length`属性获得，如下所示。

```javascript
function test(a, b, c) {}
test.length; // 3
```

### 实参

实参是调用函数时传入的，实参的值在函数执行前被确定。

javascript在函数定义时并不会约定参数的数据类型。如果你期望函数调用时传入正确的数据类型，你必须在函数体中对入参进行数据类型判断。

```javascript
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error("参数必须是数字类型")
  }
}
```

好在Typescript提供了数据类型检查的能力，这一定程度上防止了意外情况的发生。

实参的数量可以通过函数中`arguments`对象的`length`属性获得，如下所示。

实参数量不一定与形参数量一致。

```javascript
function test(a, b, c) {
  var argLength = arguments.length;
  return argLength;
}
test(1, 2); // 2
```

### 默认参数

函数参数的默认值是`undefined`，如果你不传入实参，那么实际上在函数执行过程中，相应参数的值是`undefined`。

ES6也支持在函数声明时设置参数的默认值。

```javascript
function add(a, b = 2) {
    return a + b;
}
add(1); // 3
```

在上面的`add`函数中，参数`b`被指定了默认值`2`。所以，即便你不传第二个参数`b`，也能得到一个预期的结果。

假设一个函数有多个参数，我们希望不给中间的某个参数传值，那么这个参数值必须显示地指定为`undefined`，否则我们期望传给后面的参数的值会被传到中间的这个参数。

```javascript
function printUserInfo(name, age = 18, gender) {
  console.log(`姓名：${name}，年龄：${age}，性别：${gender}`);
}
// 正确地使用
printUserInfo('Bob', undefined, 'male');
// 错误，'male'被错误地传给了age参数
printUserInfo('Bob', 'male');
```

PS：注意，如果你希望使用参数的默认值，请一定传`undefined`，而不是`null`。

当然，我们也可以在函数体中判断参数的数据类型，防止参数被误用。

```javascript
function printUserInfo(name, age = 18, gender) {
  if (typeof arguments[1] === 'string') {
    age = 18;
    gender = arguments[1];
  }
  console.log(`姓名：${name}，年龄：${age}，性别：${gender}`);
}

printUserInfo('bob', 'male'); // 姓名：bob，年龄：18，性别：male
```

这样一来，函数的逻辑也不会乱。

### 剩余参数

> 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

剩余参数通过剩余语法`...`将多个参数聚合成一个数组。

```javascript
function add(a, ...args) {
  return args.reduce((prev, curr) => {
    return prev + curr
  }, a)
}
```

剩余参数和`arguments`对象之间的区别主要有三个：

- 剩余参数只包含那些没有对应形参的实参，而`arguments`对象包含了传给函数的所有实参。
- `arguments`对象不是一个真正的数组，而剩余参数是真正的`Array`实例，也就是说你能够在它上面直接使用所有的数组方法，比如`sort`，`map`，`forEach`或`pop`。而`arguments`需要借用`call`来实现，比如`[].slice.call(arguments)`。
- `arguments`对象还有一些附加的属性（如`callee`属性）。

剩余语法和展开运算符看起来很相似，然而从功能上来说，是完全相反的。

> 剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。

### arguments

函数的实际参数会被保存在一个类数组对象`arguments`中。

类数组（ArrayLike）对象具备一个非负的`length`属性，并且可以通过从`0`开始的索引去访问元素，让人看起来觉得就像是数组，比如`NodeList`，但是类数组默认没有数组的那些内置方法，比如`push`, `pop`, `forEach`, `map`。

我们可以试试，随便找一个网站，在控制台输入：

```javascript
var linkList = document.querySelectorAll('a')
```

会得到一个`NodeList`，我们也可以通过数字下标去访问其中的元素，比如`linkList[0]`。

但是`NodeList`不是数组，它是类数组。

```javascript
Array.isArray(linkList); // false
```

回到主题，`arguments`也是类数组，`arguments`的`length`由**实参的数量**决定，而不是由形参的数量决定。

```javascript
function add(a, b) {
  console.log(arguments.length);
  return a + b;
}
add(1, 2, 3, 4);
// 这里打印的是4，而不是2
```

`arguments`也是一个和严格模式有关联的对象。

- 在**非严格模式**下，`arguments`里的元素和函数参数都是指向同一个值的引用，对`arguments`的修改，会直接影响函数参数。

```javascript
function test(obj) {
  arguments[0] = '传入的实参是一个对象，但是被我变成字符串了'
  console.log(obj)
}
test({name: 'jack'})
// 这里打印的是字符串，而不是对象
```

- 在**严格模式**下，`arguments`是函数参数的副本，对`arguments`的修改不会影响函数参数。但是`arguments`不能重新被赋值，关于这一点，我在[解读闭包，这次从ECMAScript词法环境，执行上下文说起](https://juejin.im/post/6858052418862235656)这篇文章中解读**不可变绑定**时有提到。在严格模式下，也不能使用`arguments.caller`和`arguments.callee`，限制了对调用栈的检测能力。

## 函数体

函数体（FunctionBody）是函数的主体，其中的函数代码(function code)由一对花括号`{}`包裹。函数体可以为空，也可以由任意条javascript语句组成。

## 函数的调用形式

大体来说，函数的调用形式分为以下四种：

### 作为普通函数

函数作为普通函数被调用，这是函数调用的常用形式。

```javascript
function add(a, b) {
  return a + b;
}
add(); // 调用add函数
```

作为普通函数调用时，如果在**非严格模式**下，函数执行时，`this`指向全局对象，对于浏览器而言则是`window`对象；如果在**严格模式**下，`this`的值则是`undefined`。

### 作为对象的方法

函数也可以作为对象的成员，这种情况下，该函数通常被称为对象方法。当函数作为对象的方法被调用时，`this`指向该对象，此时便可以通过`this`访问对象的其他成员变量或方法。

```javascript
var counter = {
  num: 0,
  increase: function() {
    this.num++;
  }
}
counter.increase();
```

### 作为构造函数

函数配合`new`关键字使用时就成了构造函数。构造函数用于实例化对象，构造函数的执行过程大致如下：

1. 首先创建一个新对象，这个新对象的`__proto__`属性指向构造函数的`prototype`属性。
2. 此时构造函数的`this`指向这个新对象。
3. 执行构造函数中的代码，一般是通过`this`给新对象添加新的成员属性或方法。
4. 最后返回这个新对象。

实例化对象也可以通过一些技巧来简化，比如在构造函数中显示地`return`另一个对象，jQuery很巧妙地利用了这一点。具体分析详见[面试官真的会问：new的实现以及无new实例化](https://juejin.im/post/6850037282319204360)。

### 通过call, apply调用

`apply`和`call`是函数对象的原型方法，挂载于`Function.prototype`。利用这两个方法，我们可以显示地绑定一个`this`作为调用上下文，同时也可以设置函数调用时的参数。

`apply`和`call`的区别在于：提供参数的形式不同，`apply`方法接受的是一个参数**数组**，`call`方法接受的是参数**列表**。

```javascript
someFunc.call(obj, 1, 2, 3)
someFunc.apply(obj, [1, 2, 3])
```

注意，在非严格模式下使用`call`或者`apply`时，如果第一个参数被指定为`null`或`undefined`，那么函数执行时的`this`指向全局对象（浏览器环境中是`window`）；如果第一个参数被指定为原始值，该原始值会被包装。这部分内容在下文中的手写代码会再次讲到。

`call`是用来实现继承的重要方法。在子类构造函数中，通过`call`来调用父类构造函数，以使对象实例获得来自父类构造函数的属性或方法。

```javascript
function Father() {
  this.nationality = 'Han';
};
Father.prototype.propA = '我是父类原型上的属性';
function Child() {
  Father.call(this);
};
Child.prototype.propB = '我是子类原型上的属性';
var child = new Child();
child.nationality; // "Han"
```

# call, apply, bind

`call`，`apply`，`bind`都可以绑定`this`，区别在于：`apply`和`call`是绑定`this`后直接调用该函数，而`bind`会返回一个新的函数，并不直接调用，可以由程序员决定调用的时机。

`bind`的语法形式如下：

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

`bind`的`arg1, arg2, ...`是给新函数预置好的参数（预置参数是可选的）。当然新函数在执行时也可以继续追加参数。

# 手写call, apply, bind

提到`call`，`apply`，`bind`总是无法避免**手写代码**这个话题。手写代码不仅仅是为了应付面试，也是帮助我们理清思路和深入原理的一个好方法。手写代码**一定不要抄袭**，如果实在没思路，可以参考下别人的代码整理出思路，再自己按照思路独立写一遍代码，然后验证看看有没有缺陷，这样才能有所收获，否则忘得很快，只能短时间应付应付。

那么如何才能顺利地手写代码呢？首先是要清楚一段代码的作用，可以从官方对于它的定义和描述入手，同时还要注意一些特殊情况下的处理。

就拿`call`来说，`call`是函数对象的原型方法，它的作用是绑定`this`和参数，并执行函数。调用形式如下：

```javascript
function.call(thisArg, arg1, arg2, ...)
```

那么我们慢慢来实现它，将我们要实现的函数命名为`myCall`。首先`myCall`是一个函数，接受的第一个参数`thisArg`是目标函数执行时的`this`的值，从第二个可选参数`arg1`开始的其他参数将作为目标函数执行时的实参。

这里面有很多细节要考虑，我大致罗列了一下：

1. 要考虑是不是严格模式。如果是非严格模式，对于`thisArg`要特殊处理。
2. 如何判断严格模式？
3. `thisArg`被处理后还要进行非空判断，然后考虑是以方法的形式调用还是以普通函数的形式调用。
4. 目标函数作为方法调用时，如何不覆盖对象的原有属性？

实现代码如下，请仔细看我写的注释，这是主要的思路！

```javascript
// 首先apply是Function.prototype上的一个方法
Function.prototype.myCall = function() {
  // 由于目标函数的实参数量是不定的，这里就不写形参了
  // 实际上通过arugments对象，我们能拿到所有实参
  // 第一个参数是绑定的this
  var thisArg = arguments[0];
  // 接着要判断是不是严格模式
  var isStrict = (function(){return this === undefined}())
  if (!isStrict) {
    // 如果在非严格模式下，thisArg的值是null或undefined，需要将thisArg置为全局对象
    if (thisArg === null || thisArg === undefined) {
      // 获取全局对象时兼顾浏览器环境和Node环境
      thisArg = (function(){return this}())
    } else {
      // 如果是其他原始值，需要通过构造函数包装成对象
      var thisArgType = typeof thisArg
      if (thisArgType === 'number') {
       thisArg = new Number(thisArg)
      } else if (thisArgType === 'string') {
        thisArg = new String(thisArg)
      } else if (thisArgType === 'boolean') {
        thisArg = new Boolean(thisArg)
      }
    }
  }
  // 截取从索引1开始的剩余参数
  var invokeParams = [...arguments].slice(1);
  // 接下来要调用目标函数，那么如何获取到目标函数呢？
  // 实际上this就是目标函数，因为myCall是作为一个方法被调用的，this当然指向调用对象，而这个对象就是目标函数
  // 这里做这么一个赋值过程，是为了让语义更清晰一点
  var invokeFunc = this;
  // 此时如果thisArg对象仍然是null或undefined，那么说明是在严格模式下，并且没有指定第一个参数或者第一个参数的值本身就是null或undefined，此时将目标函数当成普通函数执行并返回其结果即可
  if (thisArg === null || thisArg === undefined) {
    return invokeFunc(...invokeParams)
  }
  // 否则，让目标函数成为thisArg对象的成员方法，然后调用它
  // 直观上来看，可以直接把目标函数赋值给对象属性，比如func属性，但是可能func属性本身就存在于thisArg对象上
  // 所以，为了防止覆盖掉thisArg对象的原有属性，必须创建一个唯一的属性名，可以用Symbol实现，如果环境不支持Symbol，可以通过uuid算法来构造一个唯一值。
  var uniquePropName = Symbol(thisArg)
  thisArg[uniquePropName] = invokeFunc
  // 返回目标函数执行的结果
  return thisArg[uniquePropName](...invokeParams)
}
```

写完又思考了一阵，我突然发现有个地方考虑得有点多余了。

```javascript
// 如果在非严格模式下，thisArg的值是null或undefined，需要将thisArg置为全局对象
if (thisArg === null || thisArg === undefined) {
  // 获取全局对象时兼顾浏览器环境和Node环境
  thisArg = (function(){return this}())
} else {
```

其实这种情况下不用处理`thisArg`，因为代码执行到该函数后面部分，目标函数会被作为普通函数执行，那么`this`自然指向全局对象！所以这段代码可以删除了！

接着来测试一下`myCall`是否可靠，我写了一个简单的例子：

```javascript
function test(a, b) {
  var args = [].slice.myCall(arguments)
  console.log(arguments, args)
}
test(1, 2)

var obj = {
  name: 'jack'
};
var name = 'global';
function getName() {
  return this.name;
}
getName();
getName.myCall(obj);
```

我不敢保证我写的这个`myCall`方法没有bug，但也算是考虑了很多情况了。就算是在面试过程中，面试官主要关注的就是你的思路和考虑问题的全面性，如果写到这个程度还不能让面试官满意，那也无能为力了......

理解了手写`call`之后，手写`apply`也自然触类旁通，只要注意两点即可。

- `myApply`接受的第二个参数是数组形式。
- 要考虑实际调用时不传第二个参数或者第二个参数不是数组的情况。

直接上代码：

```javascript
Function.prototype.myApply = function(thisArg, params) {
  var isStrict = (function(){return this === undefined}())
  if (!isStrict) {
    var thisArgType = typeof thisArg
    if (thisArgType === 'number') {
     thisArg = new Number(thisArg)
    } else if (thisArgType === 'string') {
      thisArg = new String(thisArg)
    } else if (thisArgType === 'boolean') {
      thisArg = new Boolean(thisArg)
    }
  }
  var invokeFunc = this;
  // 处理第二个参数
  var invokeParams = Array.isArray(params) ? params : [];
  if (thisArg === null || thisArg === undefined) {
    return invokeFunc(...invokeParams)
  }
  var uniquePropName = Symbol(thisArg)
  thisArg[uniquePropName] = invokeFunc
  return thisArg[uniquePropName](...invokeParams)
}
```

用比较常用的`Math.max`来测试一下：

```javascript
Math.max.myApply(null, [1, 2, 4, 8]);
// 结果是8
```

接下来就是手写`bind`了，首先要明确，`bind`与`call`, `apply`的不同点在哪里。

- `bind`返回一个新的函数。
- 这个新的函数可以预置参数。

好的，按照思路开始写代码。

```javascript
Function.prototype.myBind = function() {
  // 保存要绑定的this
  var boundThis = arguments[0];
  // 获得预置参数
  var boundParams = [].slice.call(arguments, 1);
  // 获得绑定的目标函数
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  // 返回一个新的函数
  return function() {
    // 获取执行时传入的参数
    var restParams = [].slice.call(arguments);
    // 合并参数
    var allParams = boundParams.concat(restParams)
    // 新函数被执行时，通过执行绑定的目标函数获得结果，并返回结果
    return boundTargetFunc.apply(boundThis, allParams)
  }
}
```

本来写到这觉得已经结束了，但是翻到一些资料，都提到了手写`bind`需要支持`new`调用。仔细一想也对，`bind`返回一个新的函数，这个函数被作为构造函数使用也是很有可能的。

我首先思考的是，能不能直接判断一个函数是不是以构造函数的形式执行的呢？如果能判断出来，那么问题就相对简单了。

于是我想到构造函数中很重要的一点，那就是**在构造函数中，this指向对象实例**。所以，我利用`instanceof`改了一版代码出来。

```javascript
Function.prototype.myBind = function() {
  var boundThis = arguments[0];
  var boundParams = [].slice.call(arguments, 1);
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  function fBound () {
    var restParams = [].slice.call(arguments);
    var allParams = boundParams.concat(restParams)
    // 通过instanceof判断this是不是fBound的实例
    var isConstructor = this instanceof fBound;
    if (isConstructor) {
      // 如果是，说明是通过new调用的（这里有bug，见下文），那么只要把处理好的参数传给绑定的目标函数，并通过new调用即可。
      return new boundTargetFunc(...allParams)
    } else {
      // 如果不是，说明不是通过new调用的
      return boundTargetFunc.apply(boundThis, allParams)
    }
  }
  return fBound
}
```

最后看了一下MDN提供的[bind函数的polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)，发现思路有点不一样，于是我通过一个实例进行对比。

```javascript
function test() {}
var fBoundNative = test.bind()
var obj1 = new fBoundNative()
var fBoundMy = test.myBind()
var obj2 = new fBoundMy()
var fBoundMDN = test.mdnBind()
var obj3 = new fBoundMDN()
```

![bind效果对比](https://qncdn.wbjiang.cn/bind%E6%95%88%E6%9E%9C%E5%AF%B9%E6%AF%94.png)

我发现我的写法看起来竟然更像原生`bind`。瞬间怀疑自己，但一下子却没找到很明显的bug......

终于我还是意识到了一个很大的问题，`obj1`是`fBoundNative`的实例，`obj3`是`fBoundMDN`的实例，但`obj2`不是`fBoundMy`的实例（实际上`obj2`是`test`的实例）。

```javascript
obj1 instanceof fBoundNative; // true
obj2 instanceof fBoundMy; // false
obj3 instanceof fBoundMDN; // true
```

存在这个问题麻烦就大了，假设我要在`fBoundMy.prototype`上继续扩展原型属性或方法，`obj2`是无法继承它们的。所以最直接有效的方法就是用继承的方法来实现，虽然不能达到原生`bind`的效果，但已经够用了。于是我参考MDN改了一版。

```javascript
Function.prototype.myBind = function() {
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  var boundThis = arguments[0];
  var boundParams = [].slice.call(arguments, 1);
  function fBound () {
    var restParams = [].slice.call(arguments);
    var allParams = boundParams.concat(restParams)
    return boundTargetFunc.apply(this instanceof fBound ? this : boundThis, allParams)
  }
  fBound.prototype = Object.create(boundTargetFunc.prototype || Function.prototype)
  return fBound
}
```

这里面最重要的两点：**处理好原型链关系**，以及**理解bind中构造实例的过程**。

- **原型链处理**

```javascript
fBound.prototype = Object.create(boundTargetFunc.prototype || Function.prototype)
```

这一行代码中用了一个`||`运算符，`||`的两端充分考虑了`myBind`函数的两种可能的调用方式。

1. **常规的函数绑定**

```javascript
function test(name, age) {
  this.name = name;
  this.age = age;
}
var bound1 = test.myBind('小明')
var obj1 = new bound1(18)
```

这种情况把`fBound.prototype`的原型指向`boundTargetFunc.prototype`，完全符合我们的思维。

2. **直接使用Function.prototype.myBind**

```javascript
var bound2 = Function.prototype.myBind()
var obj2 = new bound2()
```

这相当于创建一个新的函数，绑定的目标函数是`Function.prototype`。这里必然有朋友会问了，`Function.prototype`也是函数吗？是的，请看！

```javascript
typeof Function.prototype; // "function"
```

虽然我还不知道第二种调用方式存在的意义，但是存在即合理，既然存在，我们就支持它。

- **理解bind中构造实例的过程**

首先要清楚`new`的执行过程，如果您还不清楚这一点，可以看看我写的这篇[面试官真的会问：new的实现以及无new实例化](https://juejin.im/post/6850037282319204360)。

还是之前那句话，先要判断是不是以构造函数的形式调用的。核心就是这：

```javascript
this instanceof fBound
```

我们用一个例子再来分析下`new`的过程。

```javascript
function test(name, age) {
  this.name = name;
  this.age = age;
}
var bound1 = test.myBind('小明')
var obj1 = new bound1(18)
obj1 instanceof bound1 // true
obj1 instanceof test // true
```

1. 执行构造函数`bound1`，实际上是执行`myBind`执行后返回的新函数`fBound`。首先会创建一个新对象`obj1`，并且`obj1`的非标准属性`__proto__`指向`bound1.prototype`，其实就是`myBind`执行时声明的`fBound.prototype`，而`fBound.prototype`的原型指向`test.prototype`。所以到这里，原型链就串起来了！
2. 执行的构造函数中，`this`指向这个`obj1`。
3. 执行构造函数，由于`fBound`是没有实际内容的，执行构造函数本质上还是要去执行绑定的那个目标函数，本例中也就是`test`。因此如果是以构造函数形式调用，我们就把实例对象作为`this`传给`test.apply`。
4. 通过执行`test`，对象实例被挂载了`name`和`age`属性，一个崭新的对象就出炉了！

最后附上[Raynos大神写的bind实现](https://github.com/Raynos/function-bind/blob/master/implementation.js)，我感觉又受到了“暴击”！有兴趣钻研`bind`终极奥义的朋友请点开链接查看源码！

![](https://qncdn.wbjiang.cn/%E5%85%83%E6%B0%94%E6%BB%A1%E6%BB%A1.jpg)

# this指向问题

分析`this`的指向，首先要确定当前执行代码的环境。

## 全局环境中的this指向

全局环境中，this指向全局对象（视宿主环境而定，浏览器是window，Node是global）。

## 函数中的this指向

在上文中介绍**函数的调用形式**时已经比较详细地说过`this`指向问题了，这里再简单总结一下。

函数中`this`的指向取决于函数的调用形式，在一些情况下也受到严格模式的影响。

- 作为普通函数调用：严格模式下，`this`的值是`undefined`，非严格模式下，`this`指向全局对象。
- 作为方法调用：`this`指向所属对象。
- 作为构造函数调用：`this`指向实例化的对象。
- 通过call, apply, bind调用：如果指定了第一个参数`thisArg`，`this`的值就是`thisArg`的值（如果是原始值，会包装为对象）；如果不传`thisArg`，要判断严格模式，严格模式下`this`是`undefined`，非严格模式下`this`指向全局对象。

# 函数声明和函数表达式

撕了这么久代码，让大脑休息一会儿，先看点轻松点的内容。

## 函数声明

函数声明是**独立的函数语句**。

```javascript
function test() {}
```

函数声明存在提升（Hoisting）现象，如变量提升一般，对于同名的情况，函数声明优于变量声明（前者覆盖后者，我说的是**声明阶段**哦）。

## 函数表达式

函数表达式不是独立的函数语句，常作为表达式的一部分，比如赋值表达式。

函数表达式可以是命名的，也可以是匿名的。

```javascript
// 命名函数表达式
var a = function test() {}
// 匿名函数表达式
var b = function () {}
```

匿名函数就是没有函数名的函数，它不能单独使用，只能作为表达式的一部分使用。匿名函数常以**IIFE**（立即执行函数表达式）的形式使用。

```javascript
(function(){console.log("我是一个IIFE")}())
```

# 闭包

关于闭包，我已经写了一篇超详细的文章去分析了，是个人原创总结的干货，建议直接打开[解读闭包，这次从ECMAScript词法环境，执行上下文说起](https://juejin.im/post/6858052418862235656)。

PS：阅读前，您应该对ECMAScript5的一些术语有一些简单的了解，比如Lexical Environment, Execution Context等。

# 纯函数

- 纯函数是具备幂等性（对于相同的参数，任何时间执行纯函数都将得到同样的结果），它不会引起副作用。

- 纯函数与外部的关联应该都来源于函数参数。如果一个函数直接依赖了外部变量，那它就不是纯函数，因为外部变量是可变的，那么纯函数的执行结果就不可控了。

```javascript
// 纯函数
function pure(a, b) {
  return a + b;
}
// 非纯函数
function impure(c) {
  return c + d
}
var d = 10;
pure(1, 2); // 3
impure(1); // 11
d = 20;
impure(1); // 21
pure(1, 2); // 3
```

# 惰性函数

相信大家在兼容事件监听时，都写过这样的代码。

```javascript
function addEvent(element, type, handler) {
  if (window.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (window.attachEvent){
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}
```

仔细看下，我们会发现，每次调用`addEvent`，都会做一次`if-else`的判断，这样的工作显然是重复的。这个时候就用到惰性函数了。

> 惰性函数表示函数执行的分支只会在函数第一次调用的时候执行。后续我们所使用的就是这个函数执行的结果。

利用惰性函数的思维，我们可以改造下上述代码。

```javascript
function addEvent(element, type, handler) {
  if (window.addEventListener) {
    addEvent = function(element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent){
    addEvent = function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    }
  } else {
    addEvent = function(element, type, handler) {
      element['on' + type] = handler;
    }
  }
  addEvent(element, type, handler);
}
```

这代码看起来有点low，但是它确实减少了重复的判断。在这种方式下，函数第一次执行时才确定真正的值。

我们还可以利用**IIFE**提前确定函数真正的值。

```javascript
var addEvent = (function() {
  if (window.addEventListener) {
    return function(element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent){
    return function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    }
  } else {
    return function(element, type, handler) {
      element['on' + type] = handler;
    }
  }
}())
```

# 高阶函数

函数在javascript中是一等公民，函数可以作为**参数**传给其他函数，这让函数的使用充满了各种可能性。

不如来看看维基百科中高阶函数（High-Order Function）的定义：

> 在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：
>
> 1. 接受一个或多个函数作为输入
> 2. 输出一个函数

看到这，大家应该都意识到了，平时使用过很多高阶函数。数组的一些高阶函数使用得尤为频繁。

```javascript
[1, 2, 3, 4].forEach(function(item, index, arr) {
  console.log(item, index, arr)
})
[1, 2, 3, 4].map(item => `小老弟${item}`)
```

可以发现，传入`forEach`和`map`的就是一个函数。我们自己也可以封装一些复用的高阶函数。

我们知道`Math.max`可以求出参数列表中最大的值。然而很多时候，我们需要处理的数据并不是`1, 2, 3, 4`这么简单，而是对象数组。

假设有这么一个需求，存在一个数组，数组元素都是表示人的对象，我们想从数组中选出年纪最大的人。

这个时候，就需要一个高阶函数来完成。

```javascript
/**
 * 根据求值条件判断数组中最大的项
 * @param {Array} arr 数组
 * @param {String|Function} iteratee 返回一个求值表达式，可以根据对象属性的值求出最大项，比如item.age。也可以通过自定义函数返回求值表达式。
 */
function maxBy(arr, iteratee) {
    let values = [];
    if (typeof iteratee === 'string') {
        values = arr.map(item => item[iteratee]);
    } else if (typeof iteratee === 'function') {
        values = arr.map((item, index) => {
            return iteratee(item, index, arr);
        });
    }
    const maxOne = Math.max(...values);
    const maxIndex = values.findIndex(item => item === maxOne);
    return arr[maxIndex];
}
```

利用这个高阶函数，我们就可以求出数组中年纪最大的那个人。

```javascript
var list = [
  {name: '小明', age: 18},
  {name: '小红', age: 19},
  {name: '小李', age: 20}
]
// 根据age字段求出最大项，结果是小李。
var maxItem = maxBy(list, 'age');
```

我们甚至可以定义更复杂的求值规则，比如我们需要根据一个字符串类型的属性来判定优先级。这个时候，就必须传一个自定义的函数作为参数了。

```javascript
const list = [
  {name: '小明', priority: 'middle'},
  {name: '小红', priority: 'low'},
  {name: '小李', priority: 'high'}
]
const maxItem = maxBy(list, function(item) {
  const { priority } = item
  const priorityValue = priority === 'low' ? 1 : priority === 'middle' ? 2 : priority === 'high' ? 3 : 0
  return priorityValue;
});
```

`maxBy`接受的参数最终都应该能转化为一个`Math.max`可度量的值，否则就没有可比较性了。

要理解这样的高阶函数，我们可以认为**传给高阶函数的函数就是一个中间件，它把数据预处理好了，然后再转交给高阶函数继续运算**。

PS：写完这句总结，突然觉得挺有道理的，反手给自己一个赞！

![](http://qncdn.wbjiang.cn/%E7%9C%BC%E7%A5%9E%E6%9A%97%E7%A4%BA.gif)

# 柯里化

说柯里化之前，首先抛出一个疑问，如何实现一个`add`函数，使得这个`add`函数可以灵活调用和传参，支持下面的调用示例呢？

```javascript
add(1, 2, 3) // 6
add(1) // 1
add(1)(2) // 3
add(1, 2)(3) // 6
add(1)(2)(3) // 6
add(1)(2)(3)(4) // 10
```

要解答这样的疑问，还是要先明白什么是柯里化。

> 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

这段解释看着还是挺懵逼的，不如举个例子：

本来有这么一个求和函数`dynamicAdd()`，接受任意个参数。

```javascript
function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
```

现在需要通过柯里化把它变成一个新的函数，这个新的函数预置了第一个参数，并且可以在调用时继续传入剩余参数。

看到这，我觉得有点似曾相识，预置参数的特性与`bind`很相像。那么我们不如用`bind`的思路来实现。

```javascript
function curry(fn, firstArg) {
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    var restArgs = [].slice.call(arguments)
    // 参数合并，通过apply调用原函数
    return fn.apply(this, [firstArg, ...restArgs])
  }
}
```

接着我们通过一些例子来感受一下柯里化。

```javascript
// 柯里化，预置参数10
var add10 = curry(dynamicAdd, 10)
add10(5); // 15
// 柯里化，预置参数20
var add20 = curry(dynamicAdd, 20);
add20(5); // 25
// 也可以对一个已经柯里化的函数add10继续柯里化，此时预置参数10即可
var anotherAdd20 = curry(add10, 10);
anotherAdd20(5); // 25
```

可以发现，柯里化是在一个函数的基础上进行变换，得到一个新的预置了参数的函数。最后在调用新函数时，实际上还是会调用柯里化前的原函数。

并且柯里化得到的新函数可以继续被柯里化，这看起来有点像**俄罗斯套娃**的感觉。

![](http://qncdn.wbjiang.cn/%E5%A5%97%E5%A8%83.jpg)

实际使用时也会出现柯里化的变体，**不局限于只预置一个参数**。

```javascript
function curry(fn) {
  // 保存预置参数
  var presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    var restArgs = [].slice.call(arguments)
    // 参数合并，通过apply调用原函数
    return fn.apply(this, [...presetArgs, ...restArgs])
  }
}
```

其实`Function.protoype.bind`就是一个柯里化的实现。不仅如此，很多流行的库都大量使用了柯里化的思想。

实际应用中，被柯里化的原函数的参数可能是定长的，也可能是不定长的。

## 参数定长的柯里化

假设存在一个原函数`fn`，`fn`接受三个参数`a`, `b`, `c`，那么函数`fn`最多被柯里化三次（**有效地绑定参数算一次**）。

```javascript
function fn(a, b, c) {
  return a + b + c
}
var c1 = curry(fn, 1);
var c2 = curry(c1, 2);
var c3 = curry(c2, 3);
c3(); // 6
// 再次柯里化也没有意义，原函数只需要三个参数
var c4 = curry(c3, 4);
c4();
```

也就是说，我们可以**通过柯里化缓存的参数数量，来判断是否到达了执行时机**。那么我们就得到了一个柯里化的通用模式。

```javascript
function curry(fn) {
  // 获取原函数的参数长度
  const argLen = fn.length;
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    if (allArgs.length >= argLen) {
      // 如果参数够了，就执行原函数
      return fn.apply(this, allArgs)
    } else {
      // 否则继续柯里化
      return curry.call(null, fn, ...allArgs)
    }
  }
}
```

这样一来，我们的写法就可以支持以下形式。

```javascript
function fn(a, b, c) {
  return a + b + c;
}
var curried = curry(fn);
curried(1, 2, 3); // 6
curried(1, 2)(3); // 6
curried(1)(2, 3); // 6
curried(1)(2)(3); // 6
curried(7)(8)(9); // 24
```

## 参数不定长的柯里化

解决了上面的问题，我们难免会问自己，假设原函数的参数不定长呢，这种情况如何柯里化？

首先，我们需要理解参数不定长是指函数声明时不约定具体的参数，而在函数体中通过`arguments`获取实参，然后进行运算。就像下面这种。

```javascript
function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
```

回到最开始的问题，怎么支持下面的所有调用形式？

```javascript
add(1, 2, 3) // 6
add(1) // 1
add(1)(2) // 3
add(1, 2)(3) // 6
add(1)(2)(3) // 6
add(1)(2)(3)(4) // 10
```

思考了一阵，我发现在**参数不定长**的情况下，要同时支持`1~N`次调用还是挺难的。`add(1)`在一次调用后可以直接返回一个值，但它也可以作为函数接着调用`add(1)(2)`，甚至可以继续`add(1)(2)(3)`。那么我们实现`add`函数时，到底是返回一个函数，还是返回一个值呢？这让人挺犯难的，我也不能预测这个函数将如何被调用啊。

而且我们可以拿上面的成果来验证下：

```javascript
curried(1)(2)(3)(4);
```

运行上面的代码会报错：**Uncaught TypeError: curried(...)(...)(...) is not a function**，因为执行到`curried(1)(2)(3)`，结果就不是一个函数了，而是一个值，一个值当然是不能作为函数继续执行的。

所以如果要支持参数不定长的场景，**已经柯里化的函数在执行完毕时不能返回一个值，只能返回一个函数；同时要让JS引擎在解析得到的这个结果时，能求出我们预期的值。**

大家看了这个可能还是不懂，好，说人话！我们实现的`curry`应该满足：

1. 经`curry`处理，得到一个新函数，这一点不变。

```javascript
// curry是一个函数
var curried = curry(add);
```

2. 新函数执行后仍然返回一个结果函数。

```javascript
// curried10也是一个函数
var curried10 = curried(10);
var curried30 = curried10(20);
```

3. 结果函数可以被Javascript引擎解析，得到一个预期的值。

```javascript
curried10; // 10
```

好，关键点在于3，如何让Javascript引擎按我们的预期进行解析，这就回到Javascript基础了。在解析一个函数的原始值时，会用到`toString`。

我们知道，`console.log(fn)`可以把函数fn的源码输出，如下所示：

```javascript
console.log(fn)
ƒ fn(a, b, c) {
  return a + b + c;
}
```

那么我们只要重写`toString`，就可以巧妙地实现我们的需求了。

```javascript
function curry(fn) {
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  function curried () {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    return curry.call(null, fn, ...allArgs)
  }
  // 重写toString
  curried.toString = function() {
    return fn.apply(null, presetArgs)
  }
  return curried;
}
```

这样一来，魔性的`add`用法就都被支持了。

```javascript
function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
var add = curry(dynamicAdd);
add(1)(2)(3)(4) // 10
add(1, 2)(3, 4)(5, 6) // 21
```

至于为什么是重写`toString`，而不是重写`valueOf`，这里留个悬念，大家可以想一想，也欢迎与我交流！

## 柯里化总结

柯里化是一种**函数式编程**思想，实际上在项目中可能用得少，或者说用得不深入，但是如果你掌握了这种思想，也许在未来的某个时间点，你会用得上！

大概来说，柯里化有如下特点：

- **简洁代码**：柯里化应用在较复杂的场景中，有简洁代码，可读性高的优点。
- **参数复用**：公共的参数已经通过柯里化预置了。
- **延迟执行**：柯里化时只是返回一个预置参数的新函数，并没有立刻执行，实际上在满足条件后才会执行。
- **管道式流水线编程**：利于使用函数组装管道式的流水线工序，不污染原函数。

# 小结

本文是笔者回顾函数知识点时总结的一篇非常详细的文章。在理解一些晦涩的知识模块时，我加入了一些个人解读，相信对于想要深究细节的朋友会有一些帮助。如果您觉得这篇文章有所帮助，请无情地关注点赞支持一下吧！同时也欢迎加我微信`laobaife`一起交流学习。

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)