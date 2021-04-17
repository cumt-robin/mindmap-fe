如果你使用了`element-ui`的`el-tabs`组件，并且想要单独升级`element-ui`至`2.10.0`，你会发现，使用了`el-tabs`组件的页面只要打开就卡死。<!-- more -->原因是`element-ui~2.10.0`采用了不兼容`vue~2.5.10`的写法。于是我尝试系统性升级`vue`全家桶，这也是为系统赋予更多能力做准备。结果遇到一些报错，这里记录一下。

# 升级过程

## 当前版本

`vue: 2.5.10`

`vue-loader: 13.5.0`

`vue-router: 3.0.1`

`vuex: 3.0.1`

`axios: 0.17.1`

`element-ui: 2.2.2`

## 目标版本

`vue: 2.6.10`

`vue-loader: 15.7.0`

`vue-router: 3.0.3`

`vuex: 3.1.1`

`axios: 0.18.1`

`element-ui: 2.10.0`

## 报错1(包版本不匹配)

修改`package.json`中的依赖包版本号之后，`npm install`一波后就报错了。

```javascript
Vue packages version mismatch:

- vue@2.6.10
- vue-template-compiler@2.5.10

This may cause things to work incorrectly. Make sure to use the same version for both.
If you are using vue-loader@>=10.0, simply update vue-template-compiler.
If you are using vue-loader@<10.0 or vueify, re-installing vue-loader/vueify should bump vue-template-compiler to the latest.


 @ ./src/router/modules/test/index.js 22:23-67
 @ ./src/router/common.js
 @ ./src/router/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:9532 webpack/hot/dev-server babel-polyfill ./src/main.js
```

**分析：**`vue`和`vue-template-compiler`两个包的版本不匹配，需要升级`vue-template-compile`。github搜索这个包搜不到，最后在[npm包官网](https://www.npmjs.com/package/vue-template-compiler)找到了。

**解决方案：**升级`vue-template-compile: 2.6.10`

## 报错2(vue-loader)

```javascript
|
| <section>
|     <el-form class="cl-add-form" :model="dataForm" :rules="rules" ref="dataForm" label-width="125px">
|         <el-form-item label="法定节假日名称" prop="name">

 @ ./src/views/backend/enterprise/holiday/add-public-holiday.vue 1:0-97 30:4-35:6 30:81-35:5
 @ ./src/views lazy ^\.\/.*$
 @ ./src/authority/generate-routes.js
 @ ./src/store/modules/user.js
 @ ./src/store/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:9532 webpack/hot/dev-server babel-polyfill ./src/main.js

 error  in ./src/views/backend/enterprise/holiday/add-special-holiday.vue?vue&type=template&id=09f84cb0&

Module parse failed: Unexpected token (2:0)
You may need an appropriate loader to handle this file type.
```

**分析：**经观察，发现可能是不识别`vue`文件或其中某部分，于是从`vue-loader`入手，也在网上查阅了一些资料，需要在`webpack`的`plugins`中加入`vue-loader/lib/plugin`。

**解决方案：**

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')

plugins: [
    new VueLoaderPlugin(),
    // 其他插件
    ...
]
```

## 报错3(postcss-loader)

```javascript
(Emitted value instead of an instance of Error)

 ⚠️  PostCSS Loader

Previous source map found, but options.sourceMap isn't set.
In this case the loader will discard the source map entirely for performance reasons.
See https://github.com/postcss/postcss-loader#sourcemap for more information.



 @ ./node_modules/vue-style-loader!./node_modules/css-loader?{"sourceMap":false}!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib?{"sourceMap":false}!./node_modules/vue-loader/lib?{"loaders":{"css":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}}],"postcss":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}}],"less":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}},{"loader":"less-loader","options":{"sourceMap":false}}],"sass":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}},{"loader":"sass-loader","options":{"indentedSyntax":true,"sourceMap":false}}],"scss":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}},{"loader":"sass-loader","options":{"sourceMap":false}}],"stylus":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}},{"loader":"stylus-loader","options":{"sourceMap":false}}],"styl":["vue-style-loader",{"loader":"css-loader","options":{"sourceMap":false}},{"loader":"stylus-loader","options":{"sourceMap":false}}]},"cssSourceMap":false,"cacheBusting":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"}}!./src/views/iot-supervise/truck/truck-carousel.vue?vue&type=style&index=0&lang=css& 4:14-1577 14:3-18:5 15:22-1585
 @ ./src/views/iot-supervise/truck/truck-carousel.vue?vue&type=style&index=0&lang=css&
 @ ./src/views/iot-supervise/truck/truck-carousel.vue
 @ ./src/views lazy ^\.\/.*$
 @ ./src/authority/generate-routes.js
 @ ./src/store/modules/user.js
 @ ./src/store/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:9532 webpack/hot/dev-server babel-polyfill ./src/main.js
```

**分析：**这里面的错误是关于`postcss-loader`的，只要将`config/index.js`中`dev.cssSourceMap`设置为`true`即可。

## 警告1(svg-sprite-loader)

升级过程中还遇到了一个警告，虽然不影响功能，但是看着还是很难受的。

```javascript
in ./src/icons/svg/workList.svg

svg-sprite-loader exception. 28 rules applies to D:\coollu\projects\coollu-v3\source-code\v1.0.1\update-elementui-test\src\icons\svg\workList.svg

 @ ./src/icons/svg \.svg$
 @ ./src/icons/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:9532 webpack/hot/dev-server babel-polyfill ./src/main.js
```

搜索关键词后，发现网上并没有此类答案。因此我考虑是版本问题，于是升级`svg-sprite-loader`至最新版本`4.1.6`，解决了这个警告问题。

------

## 总结

至此升级过程就完成了！顺便一提，系统性升级必须要经过全面测试，否则你难以保证完全向下兼容哦！

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)