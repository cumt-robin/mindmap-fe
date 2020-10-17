很多人应该像我一样，对于`webpack`的`require.context`都是一知半解吧。网上很多关于`require.context`的使用案例，但是我没找到可以帮助我理解这个知识点的，于是也决定自己来探索一下。下面以网上流行的`svg`图标方案为例说明。对了，本文的重点是`require.context`，并不会去解释`svg symbol`方案`svg-sprite-loader`。

# 关键代码

![关键代码](http://qncdn.wbjiang.cn/require.context关键代码.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

`src/icons/index.js`

```javascript
const context = require.context("./svg", true, /\.svg$/)

context.keys().map(context)
```

`main.js`

```javascript
import '@/icons'
```

`webpack.base.config.js`

```javascript
{
    test: /\.svg$/,
    loader: "svg-sprite-loader",
    include: [resolve("src/icons")],
    options: {
    	symbolId: "icon-[name]"
    }
},
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    exclude: [resolve("src/icons")],
    options: {
        limit: 10000,
        name: utils.assetsPath("img/[name].[hash:7].[ext]")
    }
},
```

# why?

![](http://qncdn.wbjiang.cn/nickyang.jpg?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d3d3LndiamlhbmcuY24=/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

很多人跟我一样，一开始只想说，为什么这样就可以，why???

要知道是什么，就上打印大法。

```javascript
const context = require.context("./svg", true, /\.svg$/)
// 看看你是何方神圣
console.log(context)

context.keys().map(context)
```

下面就真的以一张图进行解释，有问题的欢迎留言交流呀！

![一张图说明](http://qncdn.wbjiang.cn/require.context%E5%88%86%E6%9E%90.png)

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)