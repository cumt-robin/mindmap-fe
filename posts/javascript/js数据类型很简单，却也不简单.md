最近脑子里有冒出“多看点书”的想法，但我个人不是很喜欢翻阅纸质书籍，另一方面也是因为我能抽出来看书的时间比较琐碎，所以就干脆用**app**看电子书了（如果有比较完整的阅读时间，还是建议看纸质书籍，排版看起来更舒服点）。考虑到平时工作遇到的大部分问题还是**javascript**强相关的，于是我选择从《Javascript权威指南第6版》开始。

<!-- more -->

![Javascript权威指南第6版](https://s1.ax1x.com/2020/05/10/Y1LwPU.jpg)

# 数据类型有哪些？

`javascript`的数据类型分为两大类，一类是原始类型(primitive type)，一类是对象类型(object type)。

## 原始类型

原始类型又称为基本类型，分为`Number`, `String`, `Boolean`, `Undefined`, `Null`几类。比较特殊的是，`undefined`是`Undefined`类型中的唯一一个值；同样地，`null`是`Null`类型中的唯一一个值。

除此之外，`ES6`引入了一个比较特殊的原始类型`Symbol`，用于表示一个独一无二的值，具体使用方法可以看阮一峰老师的[ECMAScript6入门](https://es6.ruanyifeng.com/#docs/symbol "ECMAScript6入门")，或者直接翻阅[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol "MDN Symbol")，我平时看**MDN**比较多，感觉比较权威，**API**也很完善。

为什么说`Symbol`是原始类型，而不是对象类型呢？因为我们知道，大部分程序员都是没有对象的，那么要想找到女朋友，最快的办法就是`new`一个。

```javascript
const options = {
    '性格': '好',
    '颜值': '高',
    '对我': '好'
}
const gf = new GirlFriend(options) // new一个女朋友
```

![皮一下](https://s1.ax1x.com/2020/04/24/JDQcUH.jpg)

好了，不皮了，回到正题，意思就是，`Symbol`是没有构造函数`constructor`的，不能通过`new Symbol()`获得实例。

但是获取`symbol`类型的值是通过调用`Symbol`函数得到的。

```javascript
const symbol1 = Symbol('Tusi')
```

`Symbol`值是唯一的，所以下面的等式是不成立的。

```javascript
Symbol(1) === Symbol(1) // false
```

## 对象类型

对象类型也叫引用类型，简单地理解呢，对象就是键值对`key:value`的集合。常见的对象类型有`Object`, `Array`, `Function`, `Date`, `RegExp`等。

除了这些，`Javascript`还有蛮蛮多的全局对象，具体见[JavaScript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects "JavaScript 标准内置对象")。但是全局对象并不意味着它就是一种对象类型，就比如`JSON`是一个全局对象，但是它不是一种类型，这一点要搞清楚。

前面说了，对象可以`new`出来，所以对象类型都有构造函数，`Object`类型对应的构造函数是`Object()`，`Array`类型对应的构造函数是`Array()`，不再赘述。

```javascript
var obj = new Object() // 不过我们一般也不会这么写一个普通对象
var arr1 = new Array(1) // 创建一个length是1的空数组
var arr2 = new Array(1, 2) // 创建数组[1, 2]
```

## 栈内存和堆内存

> 栈内存的优势是，存取速度比堆内存要快，充分考虑这一点，其实是可以优化代码性能的。

### 栈内存

原始类型是按值访问的，其值存储在栈内存中，所占内存大小是已知的或是有范围的；

对基本类型变量的重新赋值，其本质上是进行压栈操作，写入新的值，并让变量指向一块栈顶元素（大概意思是这样，但是`v8`等引擎有没有做这方面的优化，就要细致去看了）

```javascript
var a = 1; // 压栈，1成为栈顶元素，其值赋给变量a
a = 2; // 压栈，2成为栈顶元素，并赋值给变量a(内存地址变了)
```

### 堆内存

而对象类型是按引用访问的，通过指针访问对象。

指针是一个地址值，类似于基本类型，存储于栈内存中，是变量访问对象的中间媒介。

而对象本身存储在堆内存中，其占用内存大小是可变的，未知的。

举例如下：

```javascript
var b = { name: 'Tusi' }
```

运行这行代码，会在堆内存中开辟一段内存空间，存储对象`{name: 'Tusi'}`，同时声明一个指针，其值为上述对象的内存地址，指针赋值给引用变量`b`，意味着`b`引用了上述对象。

对象可以新增或删除属性，所以说对象类型占用的内存大小一般是未知的。

```javascript
b.age = 18; // 对象新增了age属性
```

那么，按引用访问是什么意思呢？

我的理解是：对引用变量进行对象操作，其本质上改变的是引用变量所指向的堆内存地址中的对象本身。

这就意味着，如果有两个或两个以上的引用变量指向同一个对象，那么对其中一个引用变量的对象操作，会影响指向该对象的其他引用变量。

```javascript
var b = { name: 'Tusi' }; // 创建对象，变量b指向该对象
var c = b; // 声明变量c，指向与b一致
b.age = 18; // 通过变量b修改对象
// 产生副作用，c受到影响
console.log(c); // {name: "Tusi", age: 18}
```

考虑到对象操作的副作用，我们会在业务代码中经常使用深拷贝来规避这个问题。

# 数据类型的判断

判断数据类型是非常重要的基础设施之一，那么如何判断数据类型呢？请接着往下看。

## typeof

`javascript`本身提供了`typeof`运算符，可以辅助我们判断数据类型。

> `typeof`操作符返回一个字符串，表示未经计算的操作数的类型。

`typeof`的运算结果如下，引用自[MDN typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof "MDF typeof")

| 数据类型                                                   | 运算结果       |
| ---------------------------------------------------------- | -------------- |
| Undefined                                                  | "undefined"    |
| Null                                                       | "object"       |
| Boolean                                                    | "boolean"      |
| Number                                                     | "number"       |
| String                                                     | "string"       |
| Symbol                                                     | "symbol"       |
| Function                                                   | "function"     |
| 其他对象                                                   | "object"       |
| 宿主对象（由JS环境提供，如Nodejs有global，浏览器有window） | 取决于具体实现 |

可以看到，`typeof`能帮我们判断出大部分的数据类型，但是要注意的是：

1. `typeof null`的结果也是`"object"`
2. 对象的种类很多，`typeof`得到的结果无法判断出数组，普通对象，其他特殊对象

那么如何准确地知道一个变量的数据类型呢？

## 结合instanceof

> `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

利用`instanceof`，我们可以判断一个对象是不是某个构造函数的实例。那么结合`typeof`，我们可以封装一个基本的判断数据类型的函数。

基本思想是：首先看`typeof`是不是返回`"object"`，如果不是，说明是普通数据类型，那么直接返回`typeof`运算结果即可；如果是，则需要先把`null`这个坑货摘出来，然后依次判断其他对象类型。

```javascript
function getType(val) {
    const type = typeof val;
    if (type === 'object') {
        if (val === null) {
            // null不是对象，所以不能用instanceof判断
            return 'null'
        } else if (val instanceof Array) {
            return 'array'
        } else if (val instanceof Date) {
            return 'date'
        } else if (// 其他对象的instanceof判断) {
            return 'xxx'
        } else if (val instanceof Object) {
            // 所有对象都是Object的实例，所以放最后
            return 'object'
        }
    } else {
        return type
    }
}
// 测试下
getType(Symbol(1)) // "symbol"
getType(null) // "null"
getType(new Date()) // "date"
getType([1, 2, 3]) // "array"
getType({}) // "object"
```

但是，要把常用的对象类型都列举出来也是有点麻烦的，所以也不算一个优雅的方法。

## 终极神器toString

有没有终极解决方案？当然是有的。但是，不是标题中的`toString`，而是`Object.prototype.toString`。用上它，不仅上面的数据类型都能被判断出来，而且也可以判断`ES6`引入的一些新的对象类型，比如`Map`, `Set`等。

```javascript
// 利用了Object.prototype.toString和正则表达式的捕获组
function getType(val) {
    return Object.prototype.toString.call(val).replace(/\[object\s(\w+)\]/, '$1').toLowerCase();
}

getType(new Map()) // "map"
getType(new Set()) // "set"
getType(new Promise((resolve, reject) => {})) // "promise"
```

为什么普通的调用`toString`不能判断数据类型，而`Object.prototype.toString`可以呢？

因为`Object`是基类，而各个派生类，如`Date`， `Array`等在继承`Object`的时候，一般都重写(`overwrite`)了`toString`方法，用以表达自身业务，从而失去了判断类型的能力。

# 装箱和拆箱

> 首先解释一下什么是装箱和拆箱，把原始类型转换为对应的对象类型的操作称为装箱，反之是拆箱。

## 装箱

我们知道，只有对象才可以拥有属性和方法，但是我们在使用一些基本类型数据的时候，却可以直接调用它们的一些属性或方法，这是怎么回事呢？

```javascript
var a = 1;
a.toFixed(2); // "1.00"

var b = 'I love study';
b.length; // 12
b.substring(2, 6); // "love"
```

其实在读取一些基本类型数据的属性或方法时，`javascript`会创建临时对象（也称为“包装对象”），通过这个临时对象来读取属性或方法。以上代码等价于：

```javascript
var a = 1;
var aObj = new Number(a);
aObj.toFixed(2); // "1.00"

var b = 'I love study';
var bObj1 = new String(b);
bObj1.length; // 12
var bObj2 = new String(b);
bObj2.substring(2, 6); // "love"
```

临时对象是只读的，可以理解为它们在发生读操作后就销毁了，所以不能给它们定义新的属性，也不能修改它们现有的属性。

```
var c = '123';
c.name = 'jack'; // 给临时对象加新属性是无效的
c.name; // undefined
c.length; // 3
c.length = 2; // 修改临时对象的属性值，是无效的
c.length; // 3
```

> 我们也可以显示地进行装箱操作，即通过`String()`, `Number()`, `Boolean()`构造函数来显示地创建包装对象。

```javascript
var b = 'I love study';
var bObj = new String(b);
```

## 拆箱

对象的拆箱操作是通过`valueOf`和`toString`完成的，且看下文。

# 类型的转换

`javascript`在某些场景会自动执行类型转换操作，而我们也会根据业务的需要进行数据类型的转换。类型的转换规则如下：

![类型转换规则](https://s1.ax1x.com/2020/05/10/Y3YUi9.png)

## 对象到原始值的转换

### toString

`toString()`是默认的对象到字符串的转换方法。

```javascript
var a = {};
a.toString(); // "[object Object]"
```

但是很多类都自定义了`toString()`方法，举例如下：

- Array：将数组元素用逗号拼接成字符串作为返回值。

```javascript
var a = [1, 2, 3];
a.toString(); // 1,2,3
```

- Function：返回一个字符串，字符串的内容是函数源代码。
- Date：返回一个日期时间字符串。

```javascript
var a = new Date();
a.toString(); // "Sun May 10 2020 11:19:29 GMT+0800 (中国标准时间)"
```

- RegExp：返回表示正则表达式直接量的字符串。

```javascript
var a = /\d+/;
a.toString(); // "/\d+/"
```

### valueOf

`valueOf()`会默认地返回对象本身，包括`Object`, `Array`, `Function`, `RegExp`。

日期类`Date`重写了`valueOf()`方法，返回一个1970年1月1日以来的毫秒数。

```javascript
var a = new Date();
a.toString(); // 1589095600419
```

### 对象 --> 布尔值

从上表可见，对象（包括数组和函数）转换为布尔值都是`true`。

### 对象 --> 字符串

对象转字符串的基本规则如下：

- 如果对象具有`toString()`方法，则调用这个方法。如果它返回字符串，则作为转换的结果；如果它返回其他原始值，则将原始值转为字符串，作为转换的结果。
- 如果对象没有`toString()`方法，或`toString()`不返回原始值（不返回原始值这种情况好像没见过，一般是自定义类的`toString()`方法吧），那么`javascript`会调用`valueOf()`方法。如果存在`valueOf()`方法并且`valueOf()`方法返回一个原始值，`javascript`将这个值转换为字符串（如果这个原始值本身不是字符串），作为转换的结果。
- 否则，`javascript`无法从`toString()`或`valueOf()`获得一个原始值，会抛出异常。

### 对象 --> 数字

与对象转字符串的规则类似，只不过是优先调用`valueOf()`。

- 如果对象具有`valueOf()`方法，且`valueOf()`返回一个原始值，则`javascript`将这个原始值转换为数字（如果原始值本身不是数字），作为转换结果。
- 否则，如果对象有`toString()`方法且返回一个原始值，`javascript`将这个原始值转换为数字，作为转换结果。
- 否则，`javascript`将抛出一个类型错误异常。

## 显示转换

使用`String()`, `Number()`, `Boolean()`函数强制转换类型。

```javascript
var a = 1;
var b = String(a); // "1"
var c = Boolean(a); // true
```

## 隐式转换

在不同的使用场景中，`javascript`会根据实际情况进行类型的隐式转换。举几个例子说明下。

### 加法运算符+

我们比较熟悉的运算符有算术运算符`+`, `-`, `*`, `/`，其中比较特殊的是`+`。因为加法运算符`+`可以用于数字加法，也可以用于字符串连接，所以加法运算符的两个操作数可能是类型不一致的。

当两个操作数类型不一致时，加法运算符`+`会有如下的运算规则。

- 如果其中一个运算符是对象，则会遵循对象到原始值的转换规则，对于非日期对象来说，对象到原始值的转换基本上是对象到数字的转换，所以首先调用`valueOf()`，然而大部分对象的`valueOf()`返回的值都是对象本身，不是一个原始值，所以最后也是调用`toString()`去获得原始值。对于日期对象来说，会使用对象到字符串的转换，所以首先调用`toString()`。

```javascript
1 + {}; // "1[object Object]"
1 + new Date(); // "1Sun May 10 2020 22:53:24 GMT+0800 (中国标准时间)"
```

- 在进行了对象到原始值的转换后，如果加法运算符`+`的其中一个操作数是字符串的话，就将另一个操作数也转换为字符串，然后进行字符串连接。

```javascript
var a = {} + false; // "[object Object]false"

var b = 1 + []; // "1"
```

- 否则，两个操作数都将转换为数字（或者NaN），然后进行加法操作。

```javascript
var a = 1 + true; // 2

var b = 1 + undefined; // NaN

var c = 1 + null; // 1
```

### [] == ![]

还有个很经典的例子，就是`[] == ![]`，其结果是`true`。一看，是不是觉得有点懵，一个值的求反竟然还等于这个值！其实仔细分析下过程，就能发现其中的奥秘了。

1. 首先，我们要知道运算符的优先级是这样的，一元运算符`!`的优先级高于关系运算符`==`。

![js运算符优先级](https://s1.ax1x.com/2020/05/10/Y843KP.png)

2. 所以，右侧的`![]`首先会执行，而逻辑非运算符`!`会首先将其操作数转为布尔值，再进行求反。`[]`转为布尔值是`true`，所以`![]`的结果是`false`。此时的比较变成了`[] == false`。
3. 根据比较规则，如果`==`的其中一个值是`false`，则将其转换为数字`0`，再与另一个操作数比较。此时的比较变成了`[] == 0`。
4. 接着，再参考比较规则，如果一个值是对象，另一个值是数字或字符串，则将对象转为原始值，再进行比较。左侧的`[]`转为原始值是空字符串`""`，所以此时的比较变成了`"" == 0`。
5. 最后，如果一个值是数字，另一个是字符串，先将字符串转换为数字，再进行比较。空字符串会转为数字`0`，`0`与`0`自然是相等的。

搞懂了这个问题，也可以分析下为什么`{} == !{}`的结果是`false`了，这个就比较简单了。

看到这里，你还觉得数据类型是简答的知识点吗？有兴趣深究的朋友可以翻阅下[ES5的权威解释](http://es5.github.io/#x11.9.1 "ES5官方注解")。

# 最后

数据类型是`javascript`中非常重要的一部分，搞清楚数据类型的基本知识点，对于学习`javascript`的后续知识点多有裨益。

另外，写笔记其实对思考问题很有帮助，就算只是总结很简单的基础知识，也是多有助益。

以上内容是个人笔记和总结，难免有错误或遗漏之处，欢迎留言交流。

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)