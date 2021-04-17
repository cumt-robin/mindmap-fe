对于x年经验的前端仔来说，项目也做了好些个了，各个场景也接触过一些。但是假设真的要跟面试官敞开来撕原理，还是有点慌的。看到很多大神都在手撕各种框架原理还是有点羡慕他们的技术实力，羡慕不如行动，先踏踏实实啃基础。嗯...今天来聊聊闭包！

讲闭包的文章可能大家都看了几十篇了吧，而且也能发现，一些文章（我没说全部）行文都是一个套路，基本上都在关注两个点，什么是闭包，闭包举例，很有搬运工的嫌疑。我看了这些文章之后，一个很大的感受是：如果让我给别人讲解闭包这个知识点，我能说得清楚吗？我的依据是什么？可信度有多大？我觉得我是怀疑我自己的，否定三连估计是妥了。

<!-- more -->

![好像懂了吗](http://qncdn.wbjiang.cn/%E4%B8%8D%E4%BD%A0%E6%B2%A1%E6%87%82.png)

不同的阶段做不同的事，当有一些基础后，我们还是可以适当地研究下原理，不要浮在问题表面！那么技术水平一般的我们，应该怎么办，怎么从这些杂乱的文章中突围？我觉得一个办法是从一些比较权威的文档上去找线索，比如ES规范，MDN，维基百科等。

关于**闭包**（closure），总是有着不同的解释。

第一种说法是，闭包是由**函数**以及声明该函数的**词法环境**组合而成的。这个说法来源于[MDN-闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)。

另外一种说法是，闭包是指有权访问另外一个函数作用域中的变量的函数。

从我的理解来看，我认为第一个说法是正确的，闭包不是一个函数，而是函数和词法环境组成的。那么第二种说法对不对呢？我觉得它说对了一半，在闭包场景下，确实存在一个函数有权访问另外一个函数作用域中的变量，但闭包不是函数。

这就完了吗？显然不是！解读闭包，这次我们刨根究底（吹下牛逼）！

本文会直接从**ECMAScript5规范**入手解读JS引擎的部分内部实现逻辑，基于这些认知再来重新审视**闭包**。

回到主题，上文提到的**词法环境**（Lexical Environment）到底是什么？

# 词法环境

我们可以看看ES5规范第十章（可执行代码和执行上下文）中的第二节[词法环境](http://es5.github.io/#x10.2)是怎么说的。

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. 

词法环境是一种规范类型（specification type），它定义了标识符和ECMAScript代码中的特定变量及函数之间的联系。

问题来了，规范类型（specification type）又是什么？specification type是Type的一种。从ES5规范中可以看到Type分为**language types**和**specification types**两大类。

![类型示意图](http://qncdn.wbjiang.cn/ES5%E8%A7%84%E8%8C%83Type.png)

language types是语言类型，我们熟知的类型，也就是使用ECMAScript的程序员们可以操作的数据类型，包括`Undefined`, `Null`, `Number`, `String`, `Boolean`和`Object`。

而规范类型（specification type）是一种更抽象的**元值**（meta-values），用于在算法中描述ECMAScript的语言结构和语言类型的具体语义。

> A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types.

至于元值是什么，我觉得可以理解为**元数据**，而元数据是什么意思，可以简单看看这篇知乎[什么是元数据？为何需要元数据？](https://www.zhihu.com/question/20679872/answer/681988497)

总的来说，**元数据是用来描述数据的数据**。这一点就可以类比于，高级语言总要用一个更底层的语言和数据结构来描述和表达。这也就是JS引擎干的事情。

大致理解了规范类型是什么后，我们不免要问下：规范类型（specification type）包含什么？

> The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record. 

看到这里我好似明白了些什么，原来**词法环境**（Lexical Environment）和**环境记录**（Environment Record）都是一种**规范类型**（specification type），果然是更底层的概念。

先抛开`List`, `Completion`, `Property Descriptor`, `Property Identifier`等规范类型不说，我们接着看词法环境（Lexical Environment）这种规范类型。

下面这句解释了词法环境到底包含了什么内容：

> A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment.

词法环境包含了一个**环境记录**（Environment Record）和一个**指向外部词法环境的引用**，而这个引用的值可能为null。

一个词法环境的结构如下：

```
Lexical Environment
  + Outer Reference
  + Environment Record
```

Outer Reference指向外部词法环境，这也说明了词法环境是一个链表结构。简单画个结构图帮助理解下！

![词法环境链表示意图](http://qncdn.wbjiang.cn/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83%E9%93%BE%E8%A1%A8%E7%BB%93%E6%9E%84%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

> Usually a Lexical Environment is associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a WithStatement, or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated.

通常，词法环境与ECMAScript代码的某些特定语法结构（如**FunctionDeclaration**，**WithStatement**或**TryStatement**的**Catch**子句）相关联，并且每次评估此类代码时都会创建一个新的词法环境。

PS：evaluated是evaluate的过去分词，从字面上解释就是评估，而评估代码我觉得不是很好理解。我个人的理解是，评估代码代表着**JS引擎在解释执行javascript代码**。

我们知道，执行函数会创建新的词法环境。

我们也认同，with语句会“延长”作用域（实际上是调用了NewObjectEnvironment，创建了一个新的词法环境，词法环境的环境记录是一个对象环境记录）。

以上这些是我们比较好理解的。那么catch子句对词法环境做了什么？虽然try-catch平时用得还比较多，但是关于词法环境的细节很多人都不会注意到，包括我！

我们知道，catch子句会有一个错误对象`e`

```javascript
function test(value) {
  var a = value;
  try {
    console.log(b);
    // 直接引用一个不存在的变量，会报ReferenceError
  } catch(e) {
    console.log(e, arguments, this)
  }
}
test(1);
```

在`catch`子句中打印`arguments`，只是为了证明`catch`子句不是一个函数。因为如果`catch`是一个函数，显然这里打印的`arguments`就不应该是`test`函数的`arguments`。既然`catch`不是一个函数，那么凭什么可以有一个仅限在`catch`子句中被访问的错误对象`e`？

答案就是`catch`子句使用NewDeclarativeEnvironment创建了一个新的词法环境（catch子句中词法环境的外部词法环境引用指向函数test的词法环境），然后通过CreateMutableBinding和SetMutableBinding将标识符e与新的词法环境的环境记录关联上。

有人会说，`for`循环中的`initialization`部分也可以通过`var`定义变量，和`catch`子句有什么本质区别吗？要注意的是，在ES6之前是没有块级作用域的。在`for`循环中通过`var`定义的变量原则上归属于所在函数的词法环境。如果`for`语句不是用在函数中，那么其中通过`var`定义的变量就是属于全局环境（The Global Environment）。

**with语句和catch子句中建立了新的词法环境**这一结论，证据来源于上文中一句话“a new Lexical Environment is created each time such code is evaluated.”具体细节也可以看看[12.10 The with Statement](http://es5.github.io/#x12.10)和[12.14 The try Statement](https://es5.github.io/#x12.14)。

# Environment Record

了解了词法环境（Lexical Environment），接下来就说说词法环境中的**环境记录**(Environment Record)吧。环境记录与我们使用的变量，函数息息相关，可以说环境记录是它们的底层实现。

规范描述环境记录的内容太长，这儿就不全部复制了，请直接打开[ES5规范第10.2.1节](https://es5.github.io/#x10.2.1)阅读。

> There are two kinds of Environment Record values used in this specification: declarative environment records and object environment records. // 省略一大段

从规范中我们可以看到环境记录(Environment Record)分为两种：

- **declarative environment records** 声明式环境记录
- **object environment records** 对象环境记录

ECMAScript规范约束了声明式环境记录和对象环境记录都必须实现环境记录类的一些公共的抽象方法，即便他们在具体实现算法上可能不同。

这些公共的抽象方法有：

- HasBinding(N)
- CreateMutableBinding(N, D)
- SetMutableBinding(N,V, S)
- GetBindingValue(N,S)
- DeleteBinding(N)
- ImplicitThisValue()

声明式环境记录还应该实现两个特有的方法：

- CreateImmutableBinding(N)
- InitializeImmutableBinding(N,V)

关于不可变绑定（ImmutableBinding），在规范中有这么一段比较细致的场景描述：

> If strict is true, then Call env’s CreateImmutableBinding concrete method passing the String "arguments" as the argument.<br>
Call env’s InitializeImmutableBinding concrete method passing "arguments" and argsObj as arguments.<br>
Else,Call env’s CreateMutableBinding concrete method passing the String "arguments" as the argument.<br>
Call env’s SetMutableBinding concrete method passing "arguments", argsObj, and false as arguments.

也就是说，只有严格模式下，才会对函数的arguments对象使用不可变绑定。应用了不可变绑定（ImmutableBinding）的变量意味着不能再被重新赋值，举个例子：

非严格模式下可以改变arguments的指向：

```javascript
function test(a, b) {
  arguments = [3, 4];
  console.log(arguments, a, b)
}
test(1, 2)
// [3, 4] 1 2
```

而在严格模式下，改变arguments的指向会直接报错：

```javascript
"use strict";
function test(a, b) {
  arguments = [3, 4];
  console.log(arguments, a, b)
}
test(1, 2)
// Uncaught SyntaxError: Unexpected eval or arguments in strict mode
```

要注意，我这里说的是**改变arguments的指向**，而不是**修改arguments**。`arguments[2] = 3`这种操作在严格模式下是不会报错的。

所以不可变绑定（ImmutableBinding）约束的是引用不可变，而不是约束引用指向的对象不可变。

## declarative environment records

在我们使用**变量声明**，**函数声明**，**catch子句**时，就会在JS引擎中建立对应的声明式环境记录，它们直接将identifier bindings与ECMAScript的language values关联到一起。

## object environment records

对象环境记录（object environment records），包含Program, WithStatement，以及后面说到的全局环境的环境记录。它们将identifier bindings与某些对象的属性关联到一起。

看到这里，我自己就想问下：**identifier bindings**是啥？

看了ES5规范中提到的环境记录(Environment Record)的抽象方法后，我有了一个大致的答案。

先简单看一下javascript变量取值和赋值的过程：

```javascript
var a = 1;
console.log(a);
```

我们在给变量`a`初始化并赋值`1`的这样一个步骤，其实体现在JS引擎中，是执行了**CreateMutableBinding**（创建可变绑定）和**SetMutableBinding**（设置可变绑定的值）。

而在对变量`a`取值时，体现在JS引擎中，是执行了**GetBindingValue**（获取绑定的值），这些执行过程中会有一些断言和判断，也会牵涉到严格模式的判断，具体见[10.2.1.1 Declarative Environment Records](https://es5.github.io/#immutable-binding)。

这里也省略了一些步骤，比如说**GetIdentifierReference**, **GetValue(V)**, **PutValue(V)** 等。

按我的理解，identifier bindings就是JS引擎中维护的一组**绑定关系**，可以与javascript中的**标识符**关联起来。

# The Global Environment

全局环境（The Global Environment）是一个特殊的词法环境，在ECMAScript代码执行之前就被创建。全局环境中的环境记录(Environment Record)是一个对象环境记录（object environment record），它被绑定到一个**全局对象**（Global Object）上，体现在**浏览器环境**中，与Global Object关联的就是**window对象**。

全局环境是一个**顶层的词法环境**，因此全局环境不再有外部词法环境，或者说它的外部词法环境的引用是null。

在[15.1 The Global Object](https://es5.github.io/#x15.1)一节也解释了Global Object的一些细节，比如为什么不能`new Window()`，为什么在不同的宿主环境中全局对象会有很大区别......

# 执行上下文

看了这些我们还是没有一个全盘的把握去解读**闭包**，不如接着看看**执行上下文**。在我之前的理解中，上下文应该是一个环境，包含了代码可访问的变量。当然，这显然还不够全面。那么上下文到底是什么？

> When control is transferred to ECMAScript executable code, control is entering an execution context. Active execution contexts logically form a stack. The top execution context on this logical stack is the running execution context.

当程序控制转移到**ECMAScript可执行代码**（executable code）时，就进入了一个执行上下文（execution context），执行上下文是一个逻辑上的**堆栈结构**（Stack）。堆栈中最顶层的执行上下文就是正在运行的执行上下文。

很多人对**可执行代码**可能又有疑惑了，javascript不都是可执行代码吗？不是的，比如**注释**（Comment），**空白符**（White Space）就不是可执行代码。

> An execution context contains whatever state is necessary to track the execution progress of its associated code.

执行上下文包含了一些状态（state），这些状态用于跟踪与之关联的代码的执行进程。每个执行上下文都有这些**状态组件**（Execution Context State Components）。

- **LexicalEnvironment**：词法环境
- **VariableEnvironment**：变量环境
- **ThisBinding**：与执行上下文直接关联的this关键字

## 执行上下文的创建

我们知道，解释执行global code或使用eval function，调用函数都会创建一个新的执行上下文，执行上下文是堆栈结构。

> When control enters an execution context, the execution context’s ThisBinding is set, its VariableEnvironment and initial LexicalEnvironment are defined, and declaration binding instantiation (10.5) is performed. The exact manner in which these actions occur depend on the type of code being entered.

当控制程序进入执行上下文时，会发生下面这3个动作：

1. this关键字的值被设置。
2. 同时VariableEnvironment（不变的）和initial LexicalEnvironment（可能会变，所以这里说的是initial）被定义。
3. 然后执行声明式绑定初始化操作。

以上这些动作的执行细节取决于代码类型（分为**global code**, **eval code**, **function code**三类）。

PS：通常情况下，VariableEnvironment和LexicalEnvironment在初始化时是一致的，VariableEnvironment不会再发生变化，而LexicalEnvironment在代码执行的过程中可能会变化。

那么进入global code，eval code，function code时，执行上下文会发生什么不同的变化呢？感兴趣的可以仔细阅读下[10.4 Establishing an Execution Context](http://es5.github.io/#x10.4)。

# 词法环境的链表结构

回顾一下上文，上文中提到，词法环境是一个链表结构。

![词法环境链表示意图](http://qncdn.wbjiang.cn/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83%E9%93%BE%E8%A1%A8%E7%BB%93%E6%9E%84%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

众所周知，在理解闭包的时候，很多人都会提到**作用域链**（Scope Chain）这么一个概念，同时会引出**VO**（变量对象）和**AO**（活动对象）这些概念。然而我在阅读ECMAScript规范时，通篇没有找到这些关键词。我就在想，词法环境的链表结构是不是他们说的作用域链？VO，AO是不是已经过时的概念？但是这些概念又好像成了“权威”，一搜相关的文章，都在说VO, AO，我真的也要这样去理解吗？

在ECMAScript中，找到[8.6.2 Object Internal Properties and Methods](http://es5.github.io/#x10.4)一节中的**Table 9 Internal Properties Only Defined for Some Objects**，的确存在[[Scope]]这么一个内部属性，按照Scope单词的意思，[[Scope]]不就是函数作用域嘛！

在这个Table中，我们可以明确看到[[Scope]]的Value Type Domain一列的值是**Lexical Environment**，这说明[[Scope]]就是一种**词法环境**。我们接着看看Description：

> A lexical environment that defines the environment in which a Function object is executed. Of the standard built-in ECMAScript objects, only Function objects implement [[Scope]].

仔细看下，[[Scope]]是**函数对象被执行时所在的环境**，而且只有函数实现了[[Scope]]属性，这意味着[[Scope]]是函数特有的属性。

所以，我是不是可以理解为：作用域链（Scope Chain）就是**函数执行时能访问的词法环境链**。而广义上的词法环境链表不仅包含了作用域链，还包括WithStatement和Catch子句中的词法环境，甚至包含ES6的Block-Level词法环境。这么看来，ECMAScript是非常严谨的！

而VO，AO这两个相对陈旧的概念，由于没有官方的解释，所以基本上是“一千个读者，一千个哈姆雷特”了，我觉得可能这样理解也行：

- VO是词法分析（Lexical Parsing）阶段的产物
- AO是代码执行（Execution）阶段的产物

ES5及ES6规范中是没有这样的字眼的，所以干脆忘掉VO, AO吧！

# 闭包

## 什么是闭包？

文章最开始提到了**闭包是由函数和词法环境组成**。这里再引用一段维基百科的闭包解释佐证下。

> 在计算机科学中，闭包（英语：Closure），又称词法闭包（Lexical Closure）或函数闭包（function closures），是在支持头等函数的编程语言中实现词法绑定的一种技术。闭包在实现上是一个结构体，它存储了一个函数（通常是其入口地址）和一个关联的环境（相当于一个符号查找表）。环境里是若干对符号和值的对应关系，它既要包括约束变量（该函数内部绑定的符号），也要包括自由变量（在函数外部定义但在函数内被引用），有些函数也可能没有自由变量。闭包跟函数最大的不同在于，当捕捉闭包的时候，它的自由变量会在捕捉时被确定，这样即便脱离了捕捉时的上下文，它也能照常运行。

这是站在计算机科学的角度解释什么是闭包，当然这同样适用于javascript！

里面提到了一个词“**自由变量**”，也就是闭包词法环境中我们重点关注的变量。

## Chrome如何定义闭包？

Chrome浏览器似乎已经成为了前端的标准，那么在Chrome浏览器中，是如何判定闭包的呢？不妨来探索下！

```javascript
function test() {
  var a = 1;
  function increase() {
    debugger;
    var b = 2;
    a++;
    return a;
  };
  increase();
}
test();
```

![闭包1](https://qncdn.wbjiang.cn/chrome%E9%97%AD%E5%8C%851.png)

我把debugger置于内部函数`increase`中，调试时我们直接看右侧的高亮部分，可以发现，Scope中存在一个Closure（闭包），Closure的名称是外部函数`test`的函数名，闭包中的变量`a`是在函数`test`中定义的，而变量`b`是作为本地变量处于`Local`中。

PS: 关于本地变量，可以参见[localEnv](http://es5.github.io/#x10.4.3)。

假设我在外部函数`test`中再定义一个变量`c`，但是在内部函数`increase`中不引用它，会怎么样呢？

```javascript
function test() {
  var a = 1;
  var c = 3; // c不在闭包中
  function increase() {
    debugger;
    var b = 2;
    a++;
    return a;
  };
  increase();
}
test();
```

经验证，内部函数`increase`执行时，变量`c`没有在闭包中。

我们还可以验证，如果内部函数`increase`不引用任何外部函数`test`中的变量，就不会产生闭包。

所以到这里，我们可以下这样一个结论，**闭包产生的必要条件**是：

1. 存在函数嵌套；
2. 嵌套的内部函数必须引用在外部函数中定义的变量；
3. 嵌套的内部函数必须被执行。

## 面试官最喜欢问的闭包

在面试过程中，我们通常被问到的闭包场景是：内部函数引用了外部函数的变量，并且作为外部函数的返回值。这是一种特殊的闭包，举个例子看下：

```javascript
function test() {
  var a = 1;
  function increase() {
    a++;
  };
  function getValue() {
    return a;
  }
  return {
    increase,
    getValue
  }
}
var adder = test();
adder.increase(); // 自增1
adder.getValue(); // 2
adder.increase();
adder.getValue(); // 3
```

在这个例子中，我们发现，每调用一次`adder.increase()`方法后，`a`的值会就会比上一次增加`1`，也就是说，变量`a`被保持在内存中没有被释放。

那么这种现象背后到底是怎么回事呢？

## 闭包分析

既然闭包涉及到内存问题，那么不得不提一嘴V8的GC（垃圾回收）机制。

我们从书本上了解最多的GC策略就是引用计数，但是现代主流VM（包括V8, JVM等）都不采用引用计数的回收策略，而是采用可达性算法。

引用计数让人比较容易理解，所以常见于教材中，但是可能存在对象相互引用而无法释放其内存的问题。而可达性算法是从GC Roots对象（比如全局对象window）开始进行搜索存活（可达）对象，不可达对象会被回收，存活对象会经历一系列的处理。

关于V8 GC的一些算法细节，有一篇文章讲得特别好，作者是洗影，非常建议去看看，已附在文末的参考资料中。

而在我们关注的这种特殊闭包场景下，之所以闭包变量会保持在内存中，是因为闭包的词法环境没有被释放。我们先来分析下执行过程。

```javascript
function test() {
  var a = 1;
  function increase() {
    a++;
  };
  function getValue() {
    return a;
  }
  return {
    increase,
    getValue
  }
}
var adder = test();
adder.increase();
adder.getValue();
```

1. 初始执行global code，创建全局执行上下文，随之设置`this`关键词的值为`window`对象，创建全局环境（Global Environment）。全局对象下有`adder`, `test`等变量和函数声明。

![](http://qncdn.wbjiang.cn/%E5%88%9D%E5%A7%8B%E5%8C%96global%20code.png)

2. 开始执行`test`函数，进入`test`函数执行上下文。在`test`函数执行过程中，声明了变量`a`，函数`increase`和`getValue`。最终返回一个对象，该对象的两个属性分别引用了函数`increase`和`getValue`。

![](http://qncdn.wbjiang.cn/%E8%BF%9B%E5%85%A5test%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87.png)

3. 退出`test`函数执行上下文，`test`函数的执行结果赋值给变量`adder`，当前执行上下文恢复成全局执行上下文。

![](http://qncdn.wbjiang.cn/%E9%80%80%E5%87%BAtest%E4%B8%8A%E4%B8%8B%E6%96%87.png)

4. 调用`adder`的`increase`方法，进入`increase`函数的执行上下文，执行代码使变量`a`自增`1`。

![](http://qncdn.wbjiang.cn/%E6%89%A7%E8%A1%8Cincrease%E5%87%BD%E6%95%B0.png)

5. 退出`increase`函数的执行上下文。
6. 调用`adder`的`getValue`方法，其过程与调用`increase`方法的过程类似。

对整个执行过程有了一定认识后，我们似乎也很难解释为什么闭包中的变量`a`不会被GC回收。只有一个事实是很清楚的，那就是每次执行`increase`和`getValue`方法时，都依赖函数`test`中定义的变量`a`，但仅凭这个事实作为理由显然也是不具有说服力。

这里不妨抛出一个问题，代码是如何解析`a`这个标识符的呢？

通过阅读规范，我们可以知道，解析标识符是通过`GetIdentifierReference(lex, name, strict)`，其中`lex`是词法环境，`name`是标识符名称，`strict`是严格模式的布尔型标志。

那么在执行函数`increase`时，是怎么解析标识符`a`的呢？我们来分析下！

1. 首先，让`lex`的值为函数`increase`的`localEnv`（函数的本地环境），通过`GetIdentifierReference(lex, name, strict)`在`localEnv`中解析标识符`a`。
2. 根据[GetIdentifierReference](http://es5.github.io/#x10.2.2.1)的执行逻辑，在`localEnv`并不能解析到标识符`a`（因为`a`不是在函数`increase`中声明的，这很明显），所以会转到`localEnv`的外部词法环境继续查找，而这个外部词法环境其实就是`increase`函数的内部属性[[Scope]]（这一点我是从仔细看了多遍规范定义得出的），也就是`test`函数的`localEnv`的“**阉割版**”。
3. 回到执行函数`test`那一步，执行完函数`test`后，函数`test`中`localEnv`中的其他变量的binding都能在后续GC的过程中被释放，唯独`a`的binding不能被释放，因为还有其他词法环境（`increase`函数的内部属性[[Scope]]）会引用`a`。
4. 闭包的词法环境和函数`test`执行时的`localEnv`是不一样的。函数`test`执行时，其`localEnv`会完完整整地重新初始化一遍，而退出函数`test`的执行上下文后，闭包词法环境只保留了其环境记录中的一部分bindings，这部分bindings会被其他词法环境引用，所以我称之为“阉割版”。

这里可能会有朋友提出一个疑问（我也这样问过我自己），为什么`adder.increase()`是在全局执行上下文中被调用，它执行时的外部词法环境仍然是`test`函数的`localEnv`的“阉割版”？

这就要回到外部词法环境引用的定义了，外部词法环境引用指向的是**逻辑上包围内部词法环境的词法环境**！

> The outer reference of a (inner) Lexical Environment is a reference to the Lexical Environment that logically surrounds the inner Lexical Environment.

## 闭包的优缺点

网上的文章关于这一块还是讲得挺详细的，本文就不再举例了。总的来说，闭包有这么一些优点：

- 变量常驻内存，对于实现某些业务很有帮助，比如计数器之类的。
- 架起了一座桥梁，让函数外部访问函数内部变量成为可能。
- 私有化，一定程序上解决命名冲突问题，可以实现私有变量。

闭包是双刃剑，也存在这么一个比较明显的缺点：

- 存在这样的可能，变量常驻在内存中，其占用内存无法被GC回收，导致内存溢出。

# 小结

本文从ECMAScript规范入手，一步一步揭开了闭包的神秘面纱。首先从闭包的定义了解到词法环境，从词法环境又引出环境记录，外部词法环境引用和执行上下文等概念。在对VO, AO等旧概念产生怀疑后，我选择了从规范中寻找线索，最终有了头绪。解读闭包时，我寻找了多方资料，从计算机科学的闭包通用定义入手，将一些关键概念映射到javascript中，结合GC的一些知识点，算是有了答案。

写这篇文章花了不少时间，因为涉及到ECMAScript规范，一些描述必须客观严谨。解读过程必然存在主观成分，如有错误之处，还望指出！

最后，非常建议大家在有空的时候多多阅读ECMAScript规范。阅读语言规范是一个很好的解惑方式，能让我们更好地理解一门语言的基本原理。就比如假设我们不清楚某个运算符的执行逻辑，那么直接看语言规范是最稳妥的！

结尾附上一张可以帮助你理解ECMAScript规范的图片。

![](http://qncdn.wbjiang.cn/ES5%E8%A7%84%E8%8C%83%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84_%E6%97%8B%E8%BD%AC.png)

如果方便的话，帮我点个赞哟，谢谢！欢迎加我微信`laobaife`交流，技术会友，闲聊亦可。

# 参考资料

- [ECMAScript规范](https://es5.github.io/)
- [维基百科：一等对象（First-class object）](https://baike.hk.xileso.top/wiki/%E7%AC%AC%E4%B8%80%E9%A1%9E%E7%89%A9%E4%BB%B6)
- [维基百科：头等函数（first-class function）](https://baike.hk.xileso.top/baike-%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)
- [维基百科：闭包](https://zh.wikipedia.org/wiki/%E9%97%AD%E5%8C%85_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))
- [解读 V8 GC Log（二）: 堆内外内存的划分与 GC 算法](https://developer.aliyun.com/article/592880)
- [主流的垃圾回收机制都有哪些?](https://www.zhihu.com/question/32373436)
- [V8 内存浅析](https://zhuanlan.zhihu.com/p/33816534)
- [垃圾回收机制中，引用计数法是如何维护所有对象引用的？](https://www.zhihu.com/question/32373436)
- [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)