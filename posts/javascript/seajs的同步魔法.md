前些时间也是想写点关于`CMD`模块规范的文字，以便帮助自己理解。今天看到一篇知乎回答，算是给了我一点启发。

<!-- more -->

# 同步写法却不阻塞？

先上一个`sea.js`很经典的模块写法：

```javascript
// 定义一个模块
define(function(require, exports, module) {
  // 加载jquery模块
  var $ = require('jquery');
  // 直接使用模块里的方法
  $('#header').hide();
});
```

按道理加载模块，就是需要等`jquery.js`加载完毕才能使用，应该是一个异步的过程，为什么可以写成同步的形式呢？这是用了什么黑科技？

原来作者玉伯大佬用了一个小魔法来“欺骗”我们。而[卢勃](https://www.zhihu.com/people/lubobill1990/activities)大神在[知乎](https://www.zhihu.com/question/20342350/answer/14828786)给了一个很精彩的解释，这里直接分享下：

![sea.js同步写法解释](http://qncdn.wbjiang.cn/sea.js%E5%90%8C%E6%AD%A5%E5%86%99%E6%B3%95%E8%A7%A3%E9%87%8A.png)


也就是说，`require.js`和`sea.js`都是在执行模块前预加载了依赖的模块，并没有比`require.js`显得更“懒加载”，只是所依赖模块的代码执行时机不同。`require.js`加载时执行，而`sea.js`是使用时执行。

其实从代码的写法也看得出来，`require.js`的依赖模块在加载后便有了执行结果，并作为回调函数的实参传入。

- `reuiqre.js`写法：

```javascript
// 加载完jquery.js后，得到的执行结果$作为参数传入了回调函数
define(['jquery'], function($) {
  $('#header').hide();
});
```

- `sea.js`写法：

```javascript
// 预加载了jquery.js
define(function(require, exports, module) {
  // 执行jquery.js模块，并得到结果赋值给$
  var $ = require('jquery');
  // 调用jquery.js模块提供的方法
  $('#header').hide();
});
```

从这一点上来看，两者在性能上并没有太多差异。因为最影响页面渲染速度的当然是资源的加载速度，既然都是预加载，那么加载模块资源的耗时是一样的（网络情况相同时）。

而模块代码的执行时机并没有那么影响性能（除非你的模块太大），现在的`js`引擎如`V8`引擎足够强，没什么压力。

# 懒加载是否存在？

懒加载是存在的。我刚才说的`sea.js`并没有比`require.js`更显得“懒加载”是指模块加载的时机上两者是一致的，都是预先加载，而不是说不能懒加载。

比如说，有一个模块，页面渲染时，我不需要加载使用，但是在做了某种交互时（比如点了按钮），才需要加载使用，这个时候“懒加载”的作用就体现了。下面以`require.js`举个实例：

```javascript
require.config({
    baseUrl: './assets/js/',
    paths: {
        modulea: 'module-a',
        moduleb: 'module-b'
    }
})

require(["modulea"], function(modulea) {
    var btnNode = document.querySelector('#btn-load');
    var node1 = document.createElement('span');
    node1.innerText = '模块A已经加载！'
    btnNode.insertAdjacentElement('beforebegin',  node1)
    btnNode.addEventListener('click', function() {
        require(["moduleb"], function(moduleb) {
            var node2 = document.createElement('span');
            node2.innerText = '模块B已经加载！'
            btnNode.insertAdjacentElement('afterend',  node2)
        });
    })
});
```

- 页面渲染时只加载模块A

  ![页面渲染时只加载模块A](http://qncdn.wbjiang.cn/%E5%8F%AA%E5%8A%A0%E8%BD%BD%E4%BA%86A.png)

- 点击按钮后加载模块B

  ![点击按钮后加载模块B](http://qncdn.wbjiang.cn/%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E4%BA%86B.png)

# 总结

虽然`AMD`和`CMD`两种思想有一些差异，但都不失为一种优秀的模块化方案，为大佬们打call！

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)