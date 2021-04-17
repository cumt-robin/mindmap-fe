本文记录了笔者在使用`Gerrit`（一种免费、开放源代码的代码审查软件）过程中的一些微小的经验，在这里做个简单的分享。

<!-- more -->

# 克隆工程

```shell
git clone ssh://tusi@xx.xx.cn:29428/project-name
```

如果使用了`Git`代理，请将`xx.xx.cn:29428`换成代理后的`ip:port`

```shell
git clone ssh://tusi@ip:port/project-name
```

# 创建develop分支

一般我们不会将代码直接提交到`master`分支，而是会选择在`develop`分支进行开发

```shell
git checkout -b develop origin/develop
```

# 添加到暂存区

修改代码后，将所修改的代码从工作区添加到暂存区

```shell
// 添加所有文件到暂存区
git add .
// 添加某目录或文件到暂存区
git add src
```

# 提交暂存区改动

将暂存区内容提交到版本库

```shell
git commit -m '测试commit'
```

# 推送到远程分支

```shell
git push origin HEAD:refs/for/develop
```

# 常见报错

## missing Change-Id in commit message footer

先执行这两条命令，命令中的信息改成自己的

```shell
gitdir=$(git rev-parse --git-dir); scp -p -P 80 tusi@ip:hooks/commit-msg ${gitdir}/hooks/
git commit --amend
```

再次`push`

## Gerrit merge conflict

1. 在`Gerrit`上`abandon`这次`push`
2. 软回滚

```
git reset --soft origin/master
```

3. `pull`代码

```
git pull
```

4. 再次`commit`, `push`

# 最佳实践

## git status检查仓库状态

一个很好的习惯，`add`, `commit`, `push`等操作前后都可以用`git status`检查下，有助于理解`Git`的原理。

```shell
git status
```

## hotfix合入master

```shell
git merge origin/hotfix/20190909
git push origin HEAD:refs/for/master
```

## 强制与远程分支同步

慎重操作！！！会覆盖掉本地代码！

```shell
git reset --hard origin/develop
```

## git add 后想撤销

不小心添加了文件到暂存区？使用以下命令：

```shell
git checkout -- src/main.js
```

## git commit 后想回退

```shell
// 不小心commit了1次
git reset --soft HEAD^
// 不小心commit了2次
git reset --soft HEAD~2
```

## 紧急bug来了，临时保存feature代码

1. 先保存代码

```shell
git stash
```

2. 检查确认下

```shell
git stash list
```

3. 切换分支去修复`bug`
4. 修复完毕，切回`feature`分支，释出`stash`代码接着干

```shell
git stash pop
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)