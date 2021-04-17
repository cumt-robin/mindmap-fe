`git`本地仓库是可以与多个远程仓库关联的，如果想知道怎么配置，请参考[Git如何使用多个托管平台管理代码](http://hexo.wbjiang.cn/干货！Git-如何使用多个托管平台管理代码.html) 。

当`git remote`关联了多个远程仓库时，总会遇到一些问题。今天就遇到了两个远程仓库不一致导致无法`push`的情况。
<!-- more -->

# 远程仓库间出现差异

大概情况是这样的，我是一个本地仓库关联了`github`和`gitee`两个远程仓库。

```shell
git remote add all git@github.com:cumt-robin/BlogFrontEnd.git
git remote set-url --add all git@gitee.com:tusi/BlogFrontEnd.git
```

由于不小心在远程仓库`gitee`上手动修改了`README.md`文件，导致两个远程仓库出现了差异。所以当我在本地完成了一部分功能，准备提交到远程仓库时，出现了报错。

```shell
$ git push all --all
Everything up-to-date
To gitee.com:tusi/BlogFrontEnd.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@gitee.com:tusi/BlogFrontEnd.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

# 解决方案

由于是`gitee`的仓库多修改了一点东西，因此在本地再加一个`remote`，单独关联`gitee`。

```shell
$ git remote add gitee git@gitee.com:tusi/BlogFrontEnd.git
```

将`gitee`的代码拉到本地`master`。

```shell
$ git pull gitee master
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (1/1), done.
From gitee.com:tusi/BlogFrontEnd
 * branch            master     -> FETCH_HEAD
 * [new branch]      master     -> gitee/master
Already up to date!
Merge made by the 'recursive' strategy.
```

再将本地`master`推送到远程`all`。

```shell
$ git push all --all
Enumerating objects: 2, done.
Counting objects: 100% (2/2), done.
Delta compression using up to 6 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 499 bytes | 499.00 KiB/s, done.
Total 2 (delta 0), reused 0 (delta 0)
To github.com:cumt-robin/BlogFrontEnd.git
   1557ece..8391333  master -> master
Enumerating objects: 2, done.
Counting objects: 100% (2/2), done.
Delta compression using up to 6 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 917 bytes | 917.00 KiB/s, done.
Total 2 (delta 0), reused 0 (delta 0)
remote: Powered By Gitee.com
To gitee.com:tusi/BlogFrontEnd.git
   8912ff5..8391333  master -> master
```

问题得以解决！

------
[首发连接](https://juejin.im/post/5dd3c40ae51d453fe34dfc5b)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)