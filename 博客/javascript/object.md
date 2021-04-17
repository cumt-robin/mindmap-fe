# 前言

去年开始我给自己画了一张知识体系的思维导图，用于规划自己的学习范围和方向。但是我犯了一个大错，我的思维导图只是一个全局的蓝图，而在学习某个知识点的时候没有系统化，知识太过于零散，另一方面也很容易遗忘，回头复习时没有一个提纲，整体的学习效率不高。意识到这一点，我最近开始用思维导图去学习和总结具体的知识点，效果还不错。

<!-- more -->

试想一下，一张思维导图的某个端点是另一张思维导图，这样串起来的知识链条是多么“酸爽”！当然，YY一下就好了，我保证你没有足够的时间给所有知识点都画上思维导图，挑重点即可。

![](http://qncdn.wbjiang.cn/%E6%9D%A5%E7%BB%99%E6%88%91%E7%94%BB100%E5%BC%A0.jpg)

# 提纲思路

当我们要研究一个问题或者知识点时，关注点无非是：

1. 是什么？

2. 做什么？

3. 为什么？

很明显，搞懂“是什么”是最最基础的，而这部分却很重要。万丈高楼平地起，如果连基础都不清楚，何谈应用实践（“做什么”），更加也不会理解问题的本质（“为什么”）。

而要整理一篇高质量的思维导图，必须充分利用“总-分”的思路，首先要形成一个基本的提纲，然后从各个方面去延伸拓展，最后得到一棵较为完整的知识树。分解知识点后，在细究的过程中，你可能还会惊喜地发现一个知识点的各个组成部分之间的关联，对知识点有一个更为饱满的认识。

梳理提纲需要对知识点有一个整体的认识。如果是学习比较陌生的领域知识，我的策略是从相关书籍或官方文档的目录中提炼出提纲。

下面以我复习`javascript`对象这块知识时的一些思路为例说明。

# javascript对象

在复习`javascript`对象这块知识时，我从过往的一些使用经验，书籍，文档资料中提炼出了这么几个方面作为提纲，分别是：

- 对象的分类

- 对象的三个重要概念：类，原型，实例

- 创建对象的方法

- 对象属性的访问和设置

- 原型和继承

- 静态方法和原型方法

由此展开得到了这样一个思维导图：

![js对象](http://qncdn.wbjiang.cn/Object.png)

## 对象的分类

对象主要分为这么三大类：

- **内置对象**：ECMAScript规范中定义的类或对象，比如`Object`, `Array`, `Date`等。

- **宿主对象**：由javascript解释器所嵌入的宿主环境提供。比如浏览器环境会提供`window`，`HTMLElement`等浏览器特有的宿主对象。Nodejs会提供`global`全局对象

- **自定义对象**：由javascript开发者自行创建的对象，用以实现特定业务。就比如我们熟悉的Vue，它就是一个自定义对象。我们可以对Vue这个对象进行实例化，用于生成基于Vue的应用。

## 对象的三个重要概念

### 类

javascript在ES6之前没有`class`关键字，但这不影响javascript可以实现面向对象编程，javascript的类名对应构造函数名。

在ES6之前，如果我们要定义一个类，其实是借助函数来实现的。

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() { 
  console.log(this.name + ': hello!');
}

var person = new Person('Faker');
person.sayHello();
```

ES6明确定义了`class`关键字。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(this.name + ': hello!');
  }
}

var person = new Person('Faker');
person.sayHello();
```

### 原型

原型是类的核心，用于定义类的属性和方法，这些属性和方法会被实例继承。

定义原型属性和方法需要用到构造函数的`prototype`属性，通过`prototype`属性可以获取到原型对象的引用，然后就可以扩展原型对象了。

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sexList = ['man', 'woman'];
Person.prototype.sayHello = function() {
  console.log(this.name + ': hello!');
}
```

### 实例

类是抽象的概念，相当于一个模板，而实例是类的具体表现。就比如`Person`是一个类，而根据`Person`类，我们可以实例化多个对象，可能有小明，小红，小王等等，类的实例都是一个个独立的个体，但是他们都有共同的原型。

```javascript
var xiaoMing = new Person('小明');
var xiaoHong = new Person('小红');

// 拥有同一个原型
Object.getPrototypeOf(xiaoMing) === Object.getPrototypeOf(xiaoHong); // true
```

## 如何创建对象

### 对象直接量

对象直接量也称为对象字面量。直接量就是不需要实例化，直接写键值对即可创建对象，堪称“简单粗暴”。

```javascript
var xiaoMing = { name: '小明' };
```

每写一个对象直接量相当于创建了一个新的对象。即使两个对象直接量看起来一模一样，它们指向的堆内存地址也是不一样的，而对象是按引用访问的，所以这两个对象是不相等的。

```javascript
var xiaoMing1 = { name: '小明' };
var xiaoMing2 = { name: '小明' };
xiaoMing1 === xiaoMing2; // false
```

### new 构造函数

可以通过关键词`new`调用javascript对象的构造函数来获得对象实例。比如：

1. 创建内置对象实例

```javascript
var o = new Object();
```

2. 创建自定义对象实例

```javascript
function Person(name) {
  this.name = name;
};
new Person('Faker');
```

### Object.create

`Object.create`用于创建一个对象，接受两个参数，使用语法如下；

```javascript
Object.create(proto[, propertiesObject]);
```

第一个参数`proto`用于指定新创建对象的原型；

第二个参数`propertiesObject`是新创建对象的属性名及属性描述符组成的对象。

`proto`可以指定为`null`，但是意味着新对象的原型是`null`，它不会继承`Object`的方法，比如`toString()`等。

`propertiesObject`参数与`Object.defineProperties`方法的第二个参数格式相同。

```javascript
var o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting o.bar to", value);
    }
  }
});
```

## 属性查询和设置

### 属性查询

属性查询也可以称为属性访问。在javascript中，对象属性查询非常灵活，支持点号查询，也支持字符串索引查询（之所以说是“字符串索引”，是因为写法看起像数组，索引是字符串而不是数字）。

通过点号加属性名访问属性的行为很像一些静态类型语言，如java，C等。属性名是javascript标识符，必须直接写在属性访问表达式中，不能动态访问。

```javascript
var o = { name: '小明' };
o.name; // "小明"
```

而根据字符串索引查询对象属性就比较灵活了，属性名就是字符串表达式的值，而一个表达式是可以接受变量的，这意味着可以动态访问属性，这赋予了javascript程序员很大的灵活性。下面是一个很简单的示例，而这种特性在业务实践中作用很大，比如深拷贝的实现，你往往不知道你要拷贝的对象中有哪些属性。

```javascript
var o = { chineseName: '小明', englishName: 'XiaoMing' };
['chinese', 'english'].forEach(lang => {
  var property = lang + 'Name';
  console.log(o[property]); // 这里使用了字符串索引访问对象属性
})
```

对了，属性查询不仅可以查询自由属性，也可以查询继承属性。

```javascript
var protoObj = { age: 18 };
var o = Object.create(protoObj);
o.age; // 18，这里访问的是原型属性，也就是继承得到的属性
```

### 属性设置

通过属性访问表达式，我们可以得到属性的引用，就可以据此设置属性了。这里主要注意一下只读属性和继承属性即可，细节不再展开。

## 原型和继承

### 原型

前面也提到了，原型是实现继承的基础。那么如何去理解原型呢？

首先，要明确原型概念中的三角关系，三个主角分别是构造函数，原型，实例。我这里画了一张比较简单的图来帮助理解下。

![原型三角关系](http://qncdn.wbjiang.cn/%E5%8E%9F%E5%9E%8B%E4%B8%89%E8%A7%92%E5%85%B3%E7%B3%BB.png)

原型这东西吧，我感觉“没人能帮你理解，只有你自己去试过才是懂了”。

不过这里说说我刚学习原型时的疑惑，疑惑的是为什么构造函数有属性`prototype`指向原型，而实例又可以通过`__proto__`指向原型，究竟`prototype`和`__proto__`谁是原型？其实这明显是没有理解对象是按引用访问这个特点了。原型对象永远只有一个，它存储于堆内存中，而构造函数的`prototype`属性只是获得了原型的引用，通过这个引用可以操作原型。

同样地，`__proto__`也只是原型的引用，但是要注意了，`__proto__`不是`ECMAScript`规范里的东西，所以千万不要用在生产环境中。

至于为什么不可以通过`__proto__`访问原型，原因也很简单。通过实例直接获得了原型的访问和修改权限，这本身是一件很危险的事情。

举个例子，这里有一个类`LatinDancer`，意思是拉丁舞者。经过实例化操作，得到了多个拉丁舞者。

```javascript
function LatinDancer(name) {
  this.name = name;
};
LatinDancer.prototype.dance = function() {
  console.log(this.name + '跳拉丁舞...');
}

var dancer1 = new LatinDancer('小明');
var dancer2 = new LatinDancer('小红');
var dancer3 = new LatinDancer('小王');
dancer1.dance(); // 小明跳拉丁舞...
dancer2.dance(); // 小红跳拉丁舞...
dancer3.dance(); // 小王跳拉丁舞...
```

大家欢快地跳着拉丁舞，突然小王这个家伙心血来潮，说：“我要做b-boy，我要跳Breaking”。于是，他私下改了原型方法`dance()`。
```
dancer3.__proto__.dance = function() {
  console.log(this.name + '跳breaking...');
}

dancer1.dance(); // 小明跳breaking...
dancer2.dance(); // 小红跳breaking...
dancer3.dance(); // 小王跳breaking...
```

这个时候就不对劲了，小明和小红正跳着拉丁，突然身体不受控制了，跳起了Breaking，心里暗骂：“沃尼玛，劳资不是跳拉丁的吗？”

![看我表情](http://qncdn.wbjiang.cn/%E5%85%84%E5%98%9A%E7%9C%8B%E6%88%91%E8%A1%A8%E6%83%85.gif)

这里只是举个例子哈，没有对任何舞种或者舞者不敬的意思，抱歉抱歉。

所以，大家应该也明白了为什么不能使用`__proto__`了吧。

### 原型链

在javascript中，任何对象都有原型，除了`Object.prototype`，它没有原型，或者说它的原型是`null`。

那么什么是原型链呢？javascript程序在查找一个对象的属性或方法时，会首先在对象本身上进行查找，如果找不到则会去对象的原型上进行查找。按照这样一个递归关系，如果原型上找不到，就会到原型的原型上找，这样一直查找下去，就会形成一个链，它的终点是`null`。

还要注意的一点是，构造函数也是一个对象，也存在原型，它的原型可以通过`Function.prototype`获得，而`Function.prototype`的原型则可以通过`Object.prototype`获得。

### 继承

说到继承，可能大家脑子里已经冒出来“原型链继承”，“借用构造函数继承”，“寄生式继承”，“原型式继承”，“寄生组合继承”这些概念了吧。说实话，一开始我也是这么记忆，但是发现好像不是那么容易理解啊。最后，我发现，只要从原型三角关系入手，就能理清实现继承的思路。

![原型三角关系](http://qncdn.wbjiang.cn/%E5%8E%9F%E5%9E%8B%E4%B8%89%E8%A7%92%E5%85%B3%E7%B3%BB.png)

我们知道，对象实例能访问的属性和方法一共有三个来源，分别是：调用构造函数时挂载到实例上的属性，原型属性，对象实例化后自身新增的属性。

很明显，第三个来源不是用来做继承的，那么前两个来源用来做继承分别有什么优缺点呢？很明显，如果只基于其中一种来源做继承，都不可能全面地继承来自父类的属性或方法。

首先明确下继承中三个主体：**父类**，**子类**，**子类实例**。那么怎么才能让子类实例和父类搭上关系呢？

#### 原型链继承

所谓继承，简单说就是能通过子类实例访问父类的属性和方法。而利用原型链可以达成这样的目的，所以只要父类原型、子类原型、子类实例形成原型链关系即可。

![原型链继承](https://qncdn.wbjiang.cn/%E5%8E%9F%E5%9E%8B%E9%93%BE%E7%BB%A7%E6%89%BF.png)

代码示例：

```javascript
function Father() {
  this.nationality = 'Han';
};
Father.prototype.propA = '我是父类原型上的属性';
function Child() {};
Child.prototype = new Father();
Child.prototype.constructor = Child; // 修正原型上的constructor属性
Child.prototype.propB = '我是子类原型上的属性';
var child = new Child();
console.log(child.propA, child.propB, child.nationality); // 都可以访问到
child instanceof Father; // true
```

可以看到，在上述代码中，我们做了这样一个特殊处理`Child.prototype.constructor = Child;`。一方面是为了保证`constructor`的指向正确，毕竟实例由子类实例化得来，如果`constructor`指向父类构造函数也不太合适吧。另一方面是为了防止某些方法显示调用`constructor`时带来的麻烦。具体解释见[Why is it necessary to set the prototype constructor?](https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor#)

**关键点**：让子类原型成为父类的实例，子类实例也是父类的实例。

**缺点**：实例化时无法向父类构造函数传参。

#### 借用构造函数

在调用子类构造函数时，通过call调用父类构造函数，同时指定this值。

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
console.log(child.propA, child.propB, child.nationality);
```

这里的`child.propA`是`undefined`，因为子类实例不是父类的实例，无法继承父类原型属性。

```javascript
child instanceof Father; // false
```

**关键点**：构造函数的复用。

**缺点**：子类实例不是父类的实例，无法继承父类原型属性。

#### 组合继承

所谓组合继承，就是综合上述两种方法。实现代码如下：

```javascript
function Father() {
  this.nationality = 'Han';
};
Father.prototype.propA = '我是父类原型上的属性';
function Child() {
  Father.call(this);
};
Child.prototype = new Father();
Child.prototype.constructor = Child; // 修正原型上的constructor属性
Child.prototype.propB = '我是子类原型上的属性';
var child = new Child();
console.log(child.propA, child.propB, child.nationality); // 都能访问到
```

一眼看上去没什么问题，但是`Father()`构造函数其实是被调用了两次的。第一次发生在`Child.prototype = new Father();`，此时子类原型成为了父类实例，执行父类构造函数`Father()`时，获得了实例属性`nationality`；第二次发生在`var child = new Child();`，此时执行子类构造函数`Child()`，而`Child()`中通过`call()`调用了父类构造函数，所以子类实例也获得了实例属性`nationality`。这样理解起来可能有点晦涩难懂，我们可以看看子类实例的对象结构：

![组合继承的弊端](http://qncdn.wbjiang.cn/%E7%BB%84%E5%90%88%E7%BB%A7%E6%89%BF%E7%9A%84%E5%BC%8A%E7%AB%AF.png)

可以看到，子类实例和子类原型上都挂载了执行父类构造函数时获得的属性`nationality`。然而我们做继承的目的是很单纯的，即“让子类继承父类属性和方法”，但并不应该给子类原型挂载不必要的属性而导致污染子类原型。

有人会说“这么一点副作用怕什么”。当然，对于这么简单的父类而言，这种副作用微乎其微。假设父类有几百个属性或方法呢，这种白白耗费性能和内存的行为是有必要的吗？答案显而易见。

**关键点**：实例属性和原型属性都得以继承。

**缺点**：父类构造函数被执行了两次，污染了子类原型。

#### 原型式继承

原型式继承是相对于原型链继承而言的，与原型链继承的不同点在于，子类原型在创建时，不会执行父类构造函数，是一个纯粹的空对象。

```javascript
function Father() {
  this.nationality = 'Han';
};
Father.prototype.propA = '我是父类原型上的属性';
function Child() {};
Child.prototype = Object.create(Father.prototype);
Child.prototype.constructor = Child; // 修正原型上的constructor属性
Child.prototype.propB = '我是子类原型上的属性';
var child = new Child();
console.log(child.propA, child.propB, child.nationality); // 都可以访问到
child instanceof Father; // true
```

在`ES5`之前，可以这样模拟`Object.create`：

```javascript
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

**关键点**：利用一个空对象过渡，解除子类原型和父类构造函数的强关联关系。这也意味着继承可以是纯对象之间的继承，无需构造函数介入。

**缺点**：实例化时无法向父类构造函数传参，这一点和原型链继承并无差异。

#### 寄生式继承

寄生式继承有借鉴工厂函数的设计模式，将继承的过程封装到一个函数中并返回对象，并且可以在函数中扩展对象方法或属性。

```javascript
var obj = {
  nationality: 'Han'
};
function inherit(proto) {
  var o = Object.create(proto);
  o.extendFunc = function(a, b) {
    return a + b;
  }
  return o;
}
var inheritObj = inherit(obj);
```

这里`inheritObj`不仅继承了`obj`，而且也扩展了`extendFunc`方法。

**关键点**：工厂函数，封装过程函数化。

**缺点**：如果在工厂函数中扩展对象属性或方法，无法得到复用。

#### 寄生组合继承

用以解决组合继承过程中存在的“父类构造函数多次被调用”问题。

```javascript
function inherit(childType, fatherType) {
  childType.prototype = Object.create(fatherType.prototype);
  childType.prototype.constructor = childType;
}

function Father() {
  this.nationality = 'Han';
}
Father.prototype.propA = '我是父类原型上的属性';
function Child() {
  Father.call(this)
}
inherit(Child, Father); // 继承
Child.prototype.propB = '我是子类原型上的属性';
var child = new Child();
console.log(child);
```

**关键点**：解决父类构造函数多次执行的问题，同时让子类原型变得更加纯粹。

### 静态方法

何谓“静态方法”？静态方法为类所有，不归属于任何一个实例，需要通过类名直接调用。

```javascript
function Child() {}
Child.staticMethod = function() { console.log("我是一个静态方法") }
var child = new Child();
Child.staticMethod(); // "我是一个静态方法"
child.staticMethod(); // Uncaught TypeError: child.staticMethod is not a function
```

`Object`类有很多的静态方法，我学习的时候习惯把它们分为这么几类（当然，这里没有全部列举开来，只挑了常见的方法）。

#### 创建和复制对象

- `Object.create()`：基于原型和属性描述符集合创建一个新对象。

- `Object.assign()`：合并多个对象，会影响源对象。所以在合并对象时，为了避免这个问题，一般会这样做：

```javascript
var mergedObj = Object.assign({}, a, b);
```

#### 属性相关

- `Object.defineProperty`：通过属性描述符来定义或修改对象属性，主要涉及`value`, `configurable`, `writable`, `enumerable`四个特性。

- `Object.defineProperties`：是`defineProperty`的升级版本，一次性定义或修改多个属性。

- `Object.getOwnPropertyDescriptor`：获取属性描述符，是一个对象，包含`value`, `configurable`, `writable`, `enumerable`四个特性。

- `Object.getOwnPropertyNames`：返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

- `Object.keys`：会返回一个由一个给定对象的自身可枚举属性组成的数组，与`getOwnPropertyNames`最大的不同点在于：`keys`只返回`enumerable`为`true`的属性，并且会返回原型对象上的属性。

#### 原型相关

- `Object.getPrototypeOf`：返回指定对象的原型。

```javascript
function Child() {}
var child = new Child();
Object.getPrototypeOf(child) === Child.prototype; // true
```

- `Object.setPrototypeOf`：设置指定对象的原型。这是一个比较危险的动作，同时也是一个性能不佳的方法，不推荐使用。

#### 行为控制

以下列举的这三个方式是一个递进的关系，我们按序来看：

- `Object.preventExtensions`：让一个对象变的不可扩展，也就是永远不能再添加新的属性。

- `Object.seal`：封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。也就是说`Object.seal`在`Object.preventExtensions`的基础上，给对象属性都设置了`configurable`为`false`。

这里有一个坑是：对于`configurable`为`false`的属性，虽然不能重新设置它的`configurable`和`enumerable`特性，但是可以把它的`writable`特性从`true`改为`false`（反之不行）。

- `Object.freeze`：冻结一个对象，不能新增，修改，删除属性，也不能修改属性的原型。这里还有一个深冻结`deepFreeze`的概念，有点类似深拷贝的意思，递归冻结。

#### 检测能力

- `Object.isExtensible`：检测对象是否可扩展。

- `Object.isSealed`：检测对象是否被封闭。

- `Object.isFrozen`：检测对象是否被冻结。

#### 兼容性差

- `Object.entries`

- `Object.values`

- `Object.fromEntries`

### 原型方法

原型方法是指挂载在原型对象上的方法，可以通过实例调用，本质上是借助原型对象调用。例如：

```javascript
function Child() {}
Child.prototype.protoMethod = function() { console.log("我是一个原型方法") }
var child = new Child();
child.protoMethod(); // "我是一个原型方法"
```

ECMAScript给`Object`定义了很多原型方法。

![Object原型方法](https://qncdn.wbjiang.cn/Object%E5%8E%9F%E5%9E%8B%E6%96%B9%E6%B3%95.png)

#### hasOwnProperty

该方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键），常配合`for ... in`语句一起使用，用来遍历对象自身可枚举属性。

#### isPrototypeOf

该方法用于测试一个对象是否存在于另一个对象的原型链上。`Object.prototype.isPrototypeOf`与`Object.getPrototypeOf`不同点在于：

- `Object.prototype.isPrototypeOf`判断的是原型链关系，并且返回一个布尔值。

- `Object.getPrototypeOf`是获取目标对象的直接原型，返回的是目标对象的原型对象

#### PropertyIsEnumerable

该方法返回一个布尔值，表示指定的属性是否可枚举。它检测的是对象属性的`enumerable`特性。

#### valueOf & toString

对象转原始值会用到的方法，之前写过一篇笔记，具体见[js数据类型很简单，却也不简单](https://juejin.im/post/5eb8e2fff265da7bb46bd8ae#heading-14)。

#### toLocaleString

`toLocaleString`方法返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。常见于日期对象。

# 最后

通过阅读本文，读者们可以对Javascript对象有一个基本的认识。对象是Javascript中非常复杂的部分，绝非一篇笔记或一张思维导图可囊括，诸多细节不便展开，可关注我留言交流，回复“思维导图”可获取我整理的思维导图。

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)