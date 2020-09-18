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

我们再来看看，如果此时Vue文件不满足`plugin:vue/recommended`的规则，保存触发eslint的fix功能，先格式化为`plugin:vue/recommended`的代码，然后经过vetur的格式化，变成符合vetur的风格，但是此时仍然会提示代码不满足prettier的规则，需要接下来想办法解决。



其实针对Vue文件，我是希望能用vetur和符合`plugin:vue/recommended`以及我自定义的规则来检查代码风格和格式化，因为prettier格式化后的Vue模板部分太TM丑了。同时，我们似乎可以得出一个结论，editor.codeActionsOnSave会先于formatOnSave触发！



那么如何禁用prettier对vue文件的检查呢？其实VSCode的针对Vue文件的defaultFormatter已经被我设置为vetur了，所以还是eslint fix的锅，总是想要把vue文件fix成prettier想要的样子。我要改变这个事情！



