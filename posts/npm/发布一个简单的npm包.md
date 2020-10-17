本文简单地记录了发布一个简单`npm`包的过程，以便后续参考使用。

<!-- more -->

# 初始化npm init

通过`npm init`创建一个`package.json`文件

```
D:\robin\lib\weapp-utils>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (weapp-utils)
version: (1.0.0)
description: some foundmental utils for weapp
entry point: (lib/index.js)
test command:
git repository:
keywords: weapp,utils
author: tusi666
license: (ISC) MIT
About to write to D:\robin\lib\weapp-utils\package.json:

{
  "name": "weapp-utils",
  "version": "1.0.0",
  "description": "some foundmental utils for weapp",
  "main": "lib/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "weapp",
    "utils"
  ],
  "author": "tusi666",
  "license": "MIT"
}
```

其中`main`字段是入口文件

# 写好README

一个完备的`README`文件是必要的，以便别人了解你的包是做什么用途。

# 确认registry

一般我们开发时会修改`npm registry`为`https://registry.npm.taobao.org`。

但是发布`npm`包时，我们需要将其改回来，不然是会报错的。

```shell
npm config set registry http://registry.npmjs.org/
```

# npm注册账号

打开`npm`[官网](https://www.npmjs.com/)，开始注册账号。

**ps：**记得要验证邮箱哦！

# 添加npm账户

使用`npm adduser`添加账户，别名`npm login`

```
D:\robin\lib\weapp-utils>npm adduser
Username: tusi666
Password:
Email: (this IS public) cumtrobin@163.com
Logged in as tusi666 on https://registry.npm.taobao.org/.
```

# 添加github仓库

在`package.json`添加配置项，不加也没事，看自己需求。

```json
"repository": {
  "type": "git",
  "url": "https://github.com/xxx/zqh_test2.git"
}
```

# 发布

```shell
npm publish
```

如果发布时报这样的错，

```shell
The operation was rejected by your operating system.
npm ERR! It's possible that the file was already in use (by a text editor or antivirus),
npm ERR! or that you lack permissions to access it.
```

建议还是检查下`registry`，或者`npm adduser`是不是成功了。

发布成功，会有这样的提示，

```shell
npm notice
npm notice package: weapp-utils@1.0.0
npm notice === Tarball Contents ===
npm notice 397B   package.json
npm notice 1.1kB  LICENSE
npm notice 2.7kB  README.md
npm notice 12.9kB lib/index.js
npm notice === Tarball Details ===
npm notice name:          weapp-utils
npm notice version:       1.0.0
npm notice package size:  5.1 kB
npm notice unpacked size: 17.1 kB
npm notice shasum:        a7f2f428d9334dd1dd749d2a492dbc4df7195d0d
npm notice integrity:     sha512-Cp8jPhOMq73y6[...]bfofe7X+4cLeg==
npm notice total files:   4
npm notice
+ weapp-utils@1.0.0
```

上`npm`搜索`weapp-utils`，发现有了！

![npm查询到所发布的包](http://qncdn.wbjiang.cn/npm%E6%9F%A5%E8%AF%A2%E5%88%B0%E5%8F%91%E5%B8%83%E7%9A%84%E5%8C%85.png)

# 调用

发布成功了，也要验证下，是否可正常使用。

```javascript
import { merge } from "weapp-utils"

let mergedOptions = merge(DEFAULT_OPTIONS, options)
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)