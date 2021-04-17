说实话，我从工作开始就一直在接触`babel`，然而对于`babel`并没有一个清晰的认识，只知道`babel`是用于编译`javascript`，让开发者能使用超前的`ES6+`语法进行开发。自己配置`babel`的时候，总是遇到很多困惑，下面我就以`babel@7`为例，重新简单认识下`babel`。
<!-- more -->

# 什么是babel

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

`babel`的配置文件一般是根目录下的`.babelrc`，`babel@7`目前已经支持`babel.config.js`，不妨用`babel.config.js`试试。

# 泰拳警告

![泰拳警告](https://qncdn.wbjiang.cn/%E6%B3%B0%E6%8B%B3%E8%AD%A6%E5%91%8A.jpg)

`babel`提供的基础能力是语法转换，或者叫语法糖转换。比如把箭头函数转为普通的`function`，而对于`ES6`新引入的全局对象是默认不做处理的，如`Promise`, `Map`, `Set`, `Reflect`, `Proxy`等。对于这些全局对象和新的`API`，需要用垫片`polyfill`处理，`core-js`有提供这些内容。

所以`babel`做的事情主要是：

1. 根据你的配置做语法糖解析，转换
2. 根据你的配置塞入垫片`polyfill`

如果不搞清楚这点，`babel`的文档看起来会很吃力！

# 必须掌握的概念

## plugins

`babel`默认不做任何处理，需要借助插件来完成语法的解析，转换，输出。

插件分为语法插件`Syntax Plugins`和转换插件`Transform Plugins`。

### 语法插件

语法插件仅允许`babel`解析语法，不做转换操作。我们主要关注的是转换插件。

### 转换插件

转换插件，顾名思义，负责的是语法转换。

> 转换插件将启用相应的语法插件，如果启用了某个语法的转换插件，则不必再另行指定相应的语法插件了。

语法转换插件有很多，从`ES3`到`ES2018`，甚至是一些实验性的语法和相关框架生态下的语法，都有相关的插件支持。

语法转换插件主要做的事情有：

利用`@babel/parser`进行词法分析和语法分析，转换为`AST` **-->** 利用`babel-traverse`进行`AST`转换（涉及添加，更新及移除节点等操作） **-->** 利用`babel-generator`生成目标环境`js`代码

### 插件简写

`babel@7`之前的缩写形式是这样的：

```javascript
// 完整写法
plugins: [
    "babel-plugin-transform-runtime"
]
// 简写形式
plugins: [
    "transform-runtime"
]
```

而在`babel@7`之后，由于`plugins`都归到了`@babel`目录下，所以简写形式也有所改变：

```java
// babel@7插件完整写法
plugins: [
    "@babel/plugin-transform-runtime"
]
// 简写形式，需要保留目录
plugins: [
    "@babel/transform-runtime"
]
```

### 插件开发

我们自己也可以开发插件，官网上的一个非常简单的小例子：

```javascript
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```

## presets

`preset`，意为“预设”，其实是一组`plugin`的集合。我的理解是，根据这项配置，`babel`会为你预设（或称为“内置”）好一些`ECMA`标准，草案，或提案下的语法或`API`，甚至是你自己写的一些语法规则。当然，这都是基于`plugin`实现的。

### 官方presets

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

### @babel/preset-env

`@babel/preset-env`提供了一种智能的预设，根据配置的`options`来决定支持哪些能力。

我们看看关键的`options`有哪些。

- targets

描述你的项目要支持的目标环境。写法源于开源项目[browserslist](https://github.com/browserslist/browserslist)。这项配置应该根据你需要兼容的浏览器而设置，不必与其他人一模一样。示例如下：

```javascript
"targets": {
  "browsers": ["> 1%", "last 2 versions", "not ie <= 9"]
}
```

- loose

可以直译为“松散模式”，默认为`false`，即为`normal`模式。简单地说，就是`normal`模式转换出来的代码更贴合`ES6`风格，更严谨；而`loose`模式更像我们平时的写法。以`class`写法举例：

我们先写个简单的`class`：

```javascript
class TestBabelLoose {
    constractor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

new TestBabelLoose('Tusi')
```

使用`normal`模式编译得到结果如下：

```javascript
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TestBabelLoose =
/*#__PURE__*/
function () {
  function TestBabelLoose() {
    _classCallCheck(this, TestBabelLoose);
  }

  _createClass(TestBabelLoose, [{
    key: "constractor",
    value: function constractor(name) {
      this.name = name;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return TestBabelLoose;
}();

new TestBabelLoose('Tusi');
```

而使用`loose`模式编译得到结果是这样的，是不是更符合我们用`prototype`实现类的写法？

```javascript
"use strict";

var TestBabelLoose =
/*#__PURE__*/
function () {
  function TestBabelLoose() {}

  var _proto = TestBabelLoose.prototype;

  _proto.constractor = function constractor(name) {
    this.name = name;
  };

  _proto.getName = function getName() {
    return this.name;
  };

  return TestBabelLoose;
}();

new TestBabelLoose('Tusi');
```

个人推荐配置`loose: false`，当然也要结合项目实际去考量哪种模式更合适。

- modules

可选值有：`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`，默认是`auto`

该配置将决定是否把`ES6`模块语法转换为其他模块类型。注意，`cjs`是`commonjs`的别名。

其实我一直有个疑惑，为什么我看到的开源组件中，基本都是设置的`modules: false`？后面终于明白了，原来这样做的目的是把转换模块类型的处理权交给了`webpack`，由`webpack`去处理这项任务。所以，如果你也使用`webpack`，那么设置`modules: false`就没错啦。

- useBuiltIns

可选值有：`"entry" | "usage" | false`，默认是`false`

该配置将决定`@babel/preset-env`如何去处理`polyfill`

`"entry"`

如果`useBuiltIns`设置为`"entry"`，我们需要安装`@babel/polyfill`，并且在入口文件引入`@babel/polyfill`，最终会被转换为`core-js`模块和`regenerator-runtime/runtime`。对了，`@babel/polyfill`也不会处理`stage <=3`的提案。

我们用一段包含了`Promise`的代码来做下测试：

```javascript
import "@babel/polyfill";

class TestBabelLoose {
    constractor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
    testPromise() {
        return new Promise(resolve => {
            resolve()
        })
    }
}
new TestBabelLoose('Tusi')
```

但是编译后，貌似引入了很多`polyfill`啊，一共149个，怎么不是按需引入呢？嗯...你需要往下看了。

```javascript
import "core-js/modules/es6.array.map";
import "core-js/modules/es6.map";
import "core-js/modules/es6.promise";
import "core-js/modules/es7.promise.finally";
import "regenerator-runtime/runtime";
// 此处省略了144个包。。。
```

`"usage"`

如果`useBuiltIns`设置为`"usage"`，我们无需安装`@babel/polyfill`，`babel`会根据你实际用到的语法特性导入相应的`polyfill`，有点按需加载的意思。

```javascript
// 上个例子中，如果改用useBuiltIns: 'usage'，最终转换的结果，只有四个模块
import "core-js/modules/es6.object.define-property";
import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es6.function.name";
```

配置`"usage"`时，常搭配`corejs`选项来指定`core-js`主版本号

```javascript
useBuiltIns: "usage",
corejs: 3
```

`false`

如果`useBuiltIns`设置为`false`，`babel`不会自动为每个文件加上`polyfill`，也不会把`import "@babel/polyfill"`转为一个个独立的`core-js`模块。

- `@babel/preset-env`还有一些配置，自己慢慢去折腾吧......

### stage-x

`stage-x`描述的是`ECMA`标准相关的内容。根据`TC39`（`ECMA`39号技术专家委员会）的提案划分界限，`stage-x`大致分为以下几个阶段：

- stage-0：`strawman`，还只是一种设想，只能由`TC39`成员或者`TC39`贡献者提出。
- stage-1：`proposal`，提案阶段，比较正式的提议，只能由`TC39`成员发起，这个提案要解决的问题须有正式的书面描述，一般会提出一些案例，以及`API`，语法，算法的雏形。
- stage-2：`draft`，草案，有了初始规范，必须对功能的语法和语义进行正式描述，包括一些实验性的实现，也可以提出一些待办事项。
- stage-3：`condidate`，候选，该提议基本已经实现，需要等待实践验证，用户反馈及验收测试通过。
- stage-4：`finished`，已完成，必须通过`Test262`验收测试，下一步就是纳入到`ECMA`标准中。比如一些`ES2016`，`ES2017`的语法就是通过这个阶段被合入`ECMA`标准中了。

有兴趣了解的可以关注[ecma262](https://github.com/tc39/ecma262)。

> 需要注意的是，babel@7已经移除了stage-x的preset，stage-4部分的功能已经被@babel/preset-env集成了，而如果你需要stage <= 3部分的功能，则需要自行通过plugins组装。

```
As of v7.0.0-beta.55, we've removed Babel's Stage presets.
Please consider reading our blog post on this decision at
https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
for more details. TL;DR is that it's more beneficial in the long run to explicitly add which proposals to use.
If you want the same configuration as before:
{
  "plugins": [
    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
}
```

### 自己写preset

如需创建一个自己的`preset`，只需导出一份配置即可，主要是通过写`plugins`来实现`preset`。此外，我们也可以在自己的`preset`中包含第三方的`preset`。

```javascript
module.exports = function() {
  return {
    // 增加presets项去包含别人的preset
    presets: [
      require("@babel/preset-env")
    ],
    // 用插件来包装成自己的preset
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC"
    ]
  };
}
```

# @babel/runtime

`babel`运行时，很重要的一个东西，它一定程度上决定了你产出的包的大小！一般适合于组件库开发，而不是应用级的产品开发。

## 说明

这里有两个东西要注意，一个是`@babel/runtime`，它包含了大量的语法转换包，会根据情况被按需引入。另一个是`@babel/plugin-transform-runtime`，它是插件，负责在`babel`转换代码时分析词法语法，分析出你真正用到的`ES6+`语法，然后在`transformed code`中引入对应的`@babel/runtime`中的包，实现按需引入。

举个例子，我用到了展开运算符`...`，那么经过`@babel/plugin-transform-runtime`处理后的结果是这样的：

```javascript
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(2);

var iterableToArray = __webpack_require__(3);

var nonIterableSpread = __webpack_require__(4);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
    
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(0);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);
```

## 安装和简单配置

`@babel/runtime`是需要按需引入到生产环境中的，而`@babel/plugin-transform-runtime`是`babel`辅助插件。因此安装方式如下：

```
npm i --save @babel/runtime
npm i --save-dev @babel/plugin-transform-runtime
```

配置时也挺简单：

```javascript
const buildConfig = {
    presets: [
        // ......
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ],
    // ......
}
```

## @babel/runtime和useBuiltIns: 'usage'有什么区别？

两者看起来都实现了按需加载的能力，但是实际上作用是不一样的。`@babel/runtime`处理的是语法支持，把新的语法糖转为目标环境支持的语法；而`useBuiltIns: 'usage'`处理的是垫片`polyfill`，为旧的环境提供新的全局对象，如`Promise`等，提供新的原型方法支持，如`Array.prototype.includes`等。如果你开发的是组件库，一般不建议处理`polyfill`的，应该由调用者去做这些支持，防止重复的`polyfill`。

- 开发组件时，如果仅使用`@babel/plugin-transform-runtime`

![@babel/runtime打包分析](https://qncdn.wbjiang.cn/babel-runtime.png)

- 加上`useBuiltIns: 'usage'`，多了很多不必要的包。

![@babel/runtime + useBuiltIns: 'usage'打包分析](https://qncdn.wbjiang.cn/babel-runtime%E4%BB%A5%E5%8F%8AuseBuiltIns.png)

# babel@7要注意的地方

最后简单地提一下使用`babel@7`要注意的地方，当然更详细的内容还是要看[babel官方](https://babeljs.io/docs/en/v7-migration)。

- `babel@7`相关的包命名都改了，基本是`@babel/plugin-xxx`, `@babel/preset-xxx`这种形式。这是开发插件体系时一个比较标准的命名和目录组织规范。
- 建议用`babel.config.js`代替`.babelrc`，这在你要支持不同环境时特别有用。
- `babel@7`已经移除了`stage-x`的`presets`，也不鼓励再使用`@babel/polyfill`。
- 不要再使用`babel-preset-es2015`, `babel-preset-es2016`等`preset`了，应该用`@babel/preset-env`代替。
- ......

# 结语

本人只是对`babel`有个粗略的认识，所以这是一篇`babel`入门的简单介绍，并没有提到深入的内容，可能也存在错误之处。自己翻来覆去也看过好几遍`babel`的文档了，一直觉得收获不大，也没理解到什么东西，在与`webpack`配合使用的过程中，还是有很多疑惑没搞懂的。其实错在自己不该在复杂的项目中直接去实践。在最近重新学习`webpack`和`babel`的过程中，我觉得，对于不是很懂的东西，我们不妨从写一个`hello world`开始，因为不是每个人都是理解能力超群的天才......

-----
[首发于掘金社区](https://juejin.im/post/5df82fbae51d455828472a06)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)