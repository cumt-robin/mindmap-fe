记录一个问题，今天配置`prettier`和`eslint`的时候，遇到了麻烦。`eslint`集成`plugin:prettier/recommended`后，与我希望使用的`plugin:vue/recommended`发生了规则冲突



首先，默认formatter是prettier

```json
"editor.defaultFormatter": "esbenp.prettier-vscode"
```



然后其他配置是这样：

```json
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
}
```



现在我的一个vue文件首先由于不满足`plugin:vue/recommended`的其中一个规则而报错

![image-20200918102612240](D:\robin\frontend\mindmap-fe\前端管理\image-20200918102612240.png)

然后我就保存文件，希望自动fix，确实自动fix生效了。但是马上又不满足prettier的规则了。

![image-20200918102721375](D:\robin\frontend\mindmap-fe\前端管理\image-20200918102721375.png)

这样一来，每次保存文件触发`eslint`的`fix`功能，都会出现不满足`plugin:prettier/recommended`或`plugin:vue/recommended`的情况。



于是我试验性地把`settings.json`的`editor.formatOnSave`开启，发现了一个更恶心的现象。

```json
"editor.formatOnSave": true
```

这里又分两种情况来看：

1. 首先，我的这个`vue`文件不满足`plugin:prettier/recommended`的规则

![image-20200918103205736](D:\robin\frontend\mindmap-fe\前端管理\image-20200918103205736.png)

那么我一旦保存，就会触发formatOnSave，由于我的defaultFormatter是prettier，所以会自动格式化为满足prettier的代码。同时也会触发eslint的fix功能，然而经过formatOnSave后，已经满足prettier了，这里就不会重复fix了。

2. 这个时候，这部分代码就不满足`plugin:vue/recommended`的规则了，我再次保存会触发两次格式化。按我的理解，这应该是触发了editor.codeActionsOnSave，也就是eslint的fix功能，先格式化为满足`plugin:vue/recommended`的代码。然后又不满足prettier的规则了，所以触发formatOnSave时，又格式化为满足prettier的代码。经过这两次格式化，代码又恢复原来的样子没变，真是蛋疼！
3. 而且可以通过修改vue文件的默认fomatter来验证，我们先修改settings.json，增加如下配置项：

```json
"[vue]": {
	"editor.defaultFormatter": "octref.vetur"
}
```

我们再来看看，如果此时Vue文件不满足`plugin:vue/recommended`的规则，保存触发eslint的fix功能，先格式化为符合`plugin:vue/recommended`的代码，然后经过vetur的格式化，变成符合vetur的风格，但是此时仍然会提示代码不满足prettier的规则，需要接下来想办法解决。



其实针对Vue文件，我是希望能用vetur和符合`plugin:vue/recommended`以及我自定义的规则来检查代码风格和格式化，因为prettier格式化后的Vue模板部分太TM丑了。同时，我们似乎可以得出一个结论，editor.codeActionsOnSave会先于formatOnSave触发！



那么如何禁用prettier对vue文件的检查呢？其实VSCode的针对Vue文件的defaultFormatter已经被我设置为vetur了，所以还是eslint fix的锅，总是想要把vue文件fix成prettier想要的样子。我要改变这个事情！



后面我发现prettier报的大部分错误都是受到printWidth这一个配置的影响，于是，我将printWidth调得稍微大一点，上述报错减少了很多。

```json
{
    "printWidth": 140
}
```



然而我发现prettier和eslint在一些配置上仍然会冲突，主要是体现在模板，比如一个组件，我希望通过`"vue/max-attributes-per-line": [2, { singleline: 3 }]`来达到一行最多写三个prop，而在某些情况下，prettier会通过printWidth认为即便是写了5个prop也没达到140的限制条件，而允许5个prop在同一行，而eslint的`"vue/max-attributes-per-line": [2, { singleline: 3 }]`这项rule就与它冲突了。



为了临时解决这个问题，我只能暂时通过`.prettierignore`来忽略对`.vue`文件的检查

```
// .prettierignore文件的配置
*.vue
```



但与此同时，`.vue`文件中的`script`部分也失去了`prettier`的formatting能力。



而其实我只想让prettier不要检查`.vue`的`template`部分。



经过一段时间的琢磨，我采取了一个折中的方案。



1. `.js`文件用`prettier+eslint`进行自动fix，这体现在：

```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
}
```

2. `.vue`文件用`vscode`的`vetur`插件进行formatOnSave，由于vetur也默认采用prettier对template和script进行检查，所以我仍然能利用prettier的能力去自动format vue文件中的script部分，而template部分，我只要关闭其检查开关即可（这样template部分其实是在.vue文件保存时被eslint的其他配置fix了）。

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
"[vue]": {
    "editor.defaultFormatter": "octref.vetur",
    "editor.formatOnSave": true
},
"vetur.format.defaultFormatter.html": "none",
```

`.prettierignore`仍然需要忽略对`.vue`文件的检查，否则eslint的fix又会存在冲突。



总的来说，就是eslint集成的prettier插件，对.js文件进行了autoFix，而vetur利用prettier对vue文件中的`script`部分进行了formatOnSave，而vue文件中的template部分是被eslint集成的plugin:vue/recommended以及我自定义的一些rules autoFix的，vue文件中的style scss部分则是被source.fixAll.stylelint进行autoFix的，本质上是利用了stylelint-scss的能力。



这样一来，有一个缺点，就是vetur虽然能利用prettier去自动format vue文件中的script部分代码，但是却丢失了eslint+prettier的告警提示能力。 换句话说，就是在保存文件时vetur替我进行了format，但是却没在我写代码时就用红色波浪线提醒我告警内容。下图的js文件就拥有完备的prettier告警提示能力。

![image-20201009164435852](C:\Users\Jiang.Wenbin\AppData\Roaming\Typora\typora-user-images\image-20201009164435852.png)

其实绕了这么久，我唯一的目的就是让prettier不要检查vue的template部分，如果能解决这个问题，根本不需要折腾这么多，所有文件都让prettier去format，只要别动我的template就行了。



有一个比较蠢的办法，就是为每一个vue文件的template部分增加一行注释，让prettier忽略掉对template部分的检查

```vue
<!-- prettier-ignore -->
```

但是如果存量文件很多，这个工作量太大了，不太合理。真是个令人头疼的事情！



还有一个办法就是分文件写vue，意思就是不写SFC。

```
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

这样一来，.prettierignore继续忽略.vue文件即可，而js文件经过剥离，便可以完全被prettier接管。然而这也是一个破坏性的方案，因为大部分开发者仍然采用SFC写法，包括我！

