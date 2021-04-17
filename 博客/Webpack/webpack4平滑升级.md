最近有感觉到，随着系统模块数量的增加，`wepack`编译打包的速度越来越慢，于是我想给项目做一下优化升级，也借此机会系统地学习一下`webpack4`。

<!-- more -->

# 升级过程

## 当前版本

```json
"dependencies": {
    "@fullcalendar/core": "^4.2.0",
    "@fullcalendar/daygrid": "^4.2.0",
    "@fullcalendar/interaction": "^4.2.0",
    "@fullcalendar/vue": "^4.2.2",
    "axios": "0.18.1",
    "babel-polyfill": "6.26.0",
    "echarts": "4.0.4",
    "element-ui": "2.10.0",
    "jquery": "3.3.1",
    "js-cookie": "2.2.0",
    "js-md5": "0.7.3",
    "lodash": "4.17.5",
    "moment": "^2.24.0",
    "node-sass": "^4.11.0",
    "normalize.css": "7.0.0",
    "nprogress": "0.2.0",
    "qs": "6.5.1",
    "vue": "2.6.10",
    "vue-router": "3.0.3",
    "vuex": "3.1.1"
},
"devDependencies": {
    "autoprefixer": "7.2.3",
    "babel-core": "6.26.0",
    "babel-eslint": "8.0.3",
    "babel-helper-vue-jsx-merge-props": "2.0.3",
    "babel-loader": "7.1.2",
    "babel-plugin-syntax-jsx": "6.18.0",
    "babel-plugin-transform-runtime": "6.23.0",
    "babel-plugin-transform-vue-jsx": "3.7.0",
    "babel-preset-env": "1.6.1",
    "babel-preset-stage-2": "6.24.1",
    "chalk": "2.3.0",
    "copy-webpack-plugin": "4.2.3",
    "css-loader": "0.28.7",
    "eslint": "4.13.1",
    "eslint-friendly-formatter": "3.0.0",
    "eslint-loader": "1.9.0",
    "eslint-plugin-html": "4.0.1",
    "eventsource-polyfill": "0.9.6",
    "extract-text-webpack-plugin": "3.0.2",
    "file-loader": "1.1.5",
    "friendly-errors-webpack-plugin": "1.6.1",
    "html-webpack-plugin": "2.30.1",
    "node-notifier": "5.1.2",
    "optimize-css-assets-webpack-plugin": "3.2.0",
    "ora": "1.3.0",
    "portfinder": "1.0.13",
    "postcss-import": "11.0.0",
    "postcss-loader": "2.0.9",
    "rimraf": "2.6.2",
    "sass-loader": "6.0.6",
    "semver": "5.4.1",
    "shelljs": "0.7.8",
    "svg-sprite-loader": "4.1.6",
    "uglifyjs-webpack-plugin": "1.1.3",
    "url-loader": "0.6.2",
    "vue-loader": "15.7.0",
    "vue-style-loader": "4.1.2",
    "vue-template-compiler": "2.6.10",
    "webpack": "3.10.0",
    "webpack-bundle-analyzer": "2.9.1",
    "webpack-dev-server": "2.9.7",
    "webpack-merge": "4.1.1"
}
```

## 目标版本

```json
"dependencies": {
    "@fullcalendar/core": "^4.2.0",
    "@fullcalendar/daygrid": "^4.2.0",
    "@fullcalendar/interaction": "^4.2.0",
    "@fullcalendar/vue": "^4.2.2",
    "axios": "0.18.1",
    "babel-polyfill": "6.26.0",
    "echarts": "4.0.4",
    "element-ui": "2.10.0",
    "jquery": "3.3.1",
    "js-cookie": "2.2.0",
    "js-md5": "0.7.3",
    "lodash": "4.17.5",
    "moment": "^2.24.0",
    "node-sass": "^4.11.0",
    "normalize.css": "7.0.0",
    "nprogress": "0.2.0",
    "qs": "6.5.1",
    "vue": "2.6.10",
    "vue-router": "3.0.3",
    "vuex": "3.1.1"
},
"devDependencies": {
    "autoprefixer": "9.6.1",
    "babel-core": "6.26.3",
    "babel-eslint": "10.0.3",
    "babel-helper-vue-jsx-merge-props": "2.0.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-syntax-jsx": "6.18.0",
    "babel-plugin-transform-runtime": "6.23.0",
    "babel-plugin-transform-vue-jsx": "3.7.0",
    "babel-preset-env": "1.7.0",
    "babel-preset-stage-2": "6.24.1",
    "chalk": "2.4.2",
    "copy-webpack-plugin": "5.0.4",
    "css-loader": "3.2.0",
    "eslint": "6.3.0",
    "eslint-friendly-formatter": "3.0.0",
    "eslint-import-resolver-webpack": "^0.11.1",
    "eslint-loader": "3.0.0",
    "eslint-plugin-vue": "^5.2.3",
    "eventsource-polyfill": "0.9.6",
    "file-loader": "4.2.0",
    "friendly-errors-webpack-plugin": "1.7.0",
    "html-webpack-plugin": "3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "node-notifier": "5.1.2",
    "optimize-css-assets-webpack-plugin": "3.2.0",
    "ora": "1.3.0",
    "portfinder": "1.0.13",
    "postcss-import": "12.0.1",
    "postcss-loader": "3.0.0",
    "rimraf": "2.6.2",
    "sass-loader": "8.0.0",
    "semver": "5.4.1",
    "shelljs": "0.7.8",
    "svg-sprite-loader": "4.1.6",
    "uglifyjs-webpack-plugin": "2.2.0",
    "url-loader": "2.1.0",
    "vue-loader": "15.7.1",
    "vue-style-loader": "4.1.2",
    "vue-template-compiler": "2.6.10",
    "webpack": "4.39.3",
    "webpack-bundle-analyzer": "3.4.1",
    "webpack-cli": "^3.3.8",
    "webpack-dev-server": "3.8.0",
    "webpack-merge": "4.2.2"
}
```

## 第一步

升级`webpack`到`4.39.3`版本，`npm run dev`遇到了报错......

## npm run dev报错

### webpack-dev-server版本过低

```shell
Error: Cannot find module 'webpack/bin/config-yargs'
```

应该是`webpack`与`webpack-dev-server`版本不符，于是升级`webpack-dev-server`到`3.8.0`版本。

### webpack-cli缺失

```shell
The CLI moved into a separate package: webpack-cli
Please install 'webpack-cli' in addition to webpack itself to use the CLI
-> When using npm: npm i -D webpack-cli
-> When using yarn: yarn add -D webpack-cli
internal/modules/cjs/loader.js:584
    throw err;
    ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

`webpack4`将`webpack-cli`单独分离出来了，因此提示我们安装`webpack-cli`，那就直接安装吧。

### html-webpack-plugin版本问题

```
10% building 2/2 modules 0 active(node:8596) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:8596) DeprecationWarning: Tapable.apply is deprecated. Call apply on the plugin directly instead
53% building 363/366 modules 3 active D:\coollu\projects\coollu-v3\source-code\develop\coollu-cloud-web\node_modules\core-js\modules\_array-reduce.jsD:\coollu\projects\coollu-v3\source-code\develop\coollu-cloud-web\node_modules\html-webpack-plugin\lib\compiler.js:81
        var outputName = compilation.mainTemplate.applyPluginsWaterfall('asset-path', outputOptions.filename, {
                                                  ^

TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function
```

考虑是`html-webpack-plugin`版本问题，升级至`3.2.0`

### extract-text-webpack-plugin?

```
10% building 2/2 modules 0 active(node:19732) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
```

查到是因为`extract-text-webpack-plugin`不再支持`webpack4.3`，需要改用`mini-css-extract-plugin`。

**ps:** `extract-text-webpack-plugin`是用来抽取依赖的`.css`文件的，防止样式全部打包在`js bundle`里太大。改用了`mini-css-extract-plugin`后，该报错并未消除，考虑要用`compiler`钩子重写一些东西，先在这埋个坑，后面弄明白了再来填坑。

### eslint-loader升版本

```
Module build failed (from ./node_modules/eslint-loader/index.js):
TypeError: Cannot read property 'eslint' of undefined
    at Object.module.exports (D:\coollu\projects\coollu-v3\source-code\develop\coollu-cloud-web\node_modules\eslint-loader\index.js:148:18)
```

升级`eslint-loader`

### file-loader升版本

```
Module build failed (from ./node_modules/file-loader/dist/cjs.js):
TypeError: Cannot read property 'context' of undefined
    at Object.loader (D:\coollu\projects\coollu-v3\source-code\develop\coollu-cloud-web\node_modules\file-loader\dist\index.js:34:49)
```

升级`file-loader`

## npm run build报错

### 改用splitChunks

```
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
```

使用`webpack4`的`optimization.splitChunks`替代`CommonsChunkPlugin`

### vue-loader升版本

```
ERROR in ./src/App.vue?vue&type=style&index=0&id=7c362b6c&lang=scss&scoped=tr (./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-0!./node_mods/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=62b6c&lang=scss&scoped=true&)
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.:
ModuleParseError: Module parse failed: Unexpected character '#' (14:0)
File was processed with these loaders:
 * ./node_modules/vue-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
```

考虑是`vue-loader`版本问题，先升级`vue-loader@15.7.1`

### babel-loader降版本

```
ERROR in ./src/main.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Cannot find module '@babel/core'
 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
```

把`babel-loader@8`降低了版本，调整为`babel-loader@7`

**ps**: 想了一下，觉得可能其他的`loader`版本也会过低，于是将其他的`loader`都进行了升级，具体见[package.json](#目标版本)。

## 优化打包速度

### happypack

一个号称用多进程策略提升`webpack`打包速度的插件，真的挺管用的。

> happypack允许您并行转换多个文件，从而加快了webpack的构建速度。

安装：

```
npm install --save-dev happypack
```

简单配置如下：

```javascript
const HappyPack = require('happypack')

// webpack配置，只列出关于happypack的配置
rules: [
  // ...其他rule
  {
    test: /\.js$/,
    // 注释掉原来的babel-loader，改用happypack/loader
    // loader: "babel-loader",
    use: ['happypack/loader'],
    include: [
      resolve("src")
    ]
  }
],
plugins: [
  // ...其他plugin
  // 安装说明简单配置了一下
  new HappyPack({
    // 将我们刚才注释的loader放在这，告诉happypack
    loaders: ['babel-loader'],
    // 开启4个子进程，据说是最优解
    threads: 4
  })
]
```

# 总结

经过大量`npm`包版本的调整，以及`webpack`配置的修改（主要是`optimization`的调整；把`extract-text-webpack-plugin`换成了`mini-css-extract-plugin`；加入了`happypack`），报错基本上消除了，经测试，`dev`和`prod`环境都没有功能上的问题，热加载，编译，打包速度确实得到了显著提升。

- 热加载

  速度得到了显著提升，之前改一行代码，热加载编译的时间差不多要花`1min`，让人难受；优化后，基本上控制在`<=5s`

- `webpack`升级前打包：

  ```
  Hash: 35f207120dd3736758dd
  Version: webpack 3.10.0
  Time: 95987ms
  ```

  大概需要`96s`的打包时间。

- `webpack`升级后打包：

  ```
  Hash: fb73468076752cad58f6
  Version: webpack 4.39.3
  Time: 61597ms
  ```

  打包时间降低到`61.6s`，节约了`34.4s`，打包效率提升了`35.8%`以上。

- 使用`happypack`后：

  ```
  Happy[1]: Version: 5.0.1. Threads: 4
  Happy[1]: All set; signaling webpack to proceed.
  Hash: a635e8b39b7064adf41c
  Version: webpack 4.39.3
  Time: 41047ms
  ```

  打包时间降低到`41s`，再次节约了`20.6s`！总共节约了`55s`，与升级前相比，打包效率提升了`57%`以上。

当然可优化的空间还很大，`webpack4`还有很多东西值得我们去折腾，优化之路还在继续！


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)