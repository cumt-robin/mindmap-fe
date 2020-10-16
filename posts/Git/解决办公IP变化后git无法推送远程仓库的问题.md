最近公司乔迁新址，在提交代码时遇到了无法`git push`的问题。报错如下：

<!-- more -->

```
The RSA host key for github.com has changed,
and the key for the corresponding IP address 42.243.156.48
is unknown. This could either mean that
DNS SPOOFING is happening or the IP address for the host
and its host key have changed at the same time.
```

经检查，`ssh`密钥对是没有问题的，问题出在了`known_hosts`文件，办公`ip`变化了，而`known_hosts`中保留的是原来的`ip`，导致不识别当前`ip`而验证失败。

解决方法也很简单，首先找到`.ssh`目录，我的是

```
C:\Users\Jiang.Wenbin\.ssh
```

我们删除掉`known_hosts`文件，然后打开`git bash`，视个人情况选择性输入如下命令：

```shell
// 连接github
ssh -T git@github.com
// 连接gitee
ssh -T git@gitee.com
// 连接coding.net
ssh -T git@git.coding.net
```

在弹出询问后输入`yes`即可。

这里在连接`github`时比较特殊，遇到了一个报错

```
git@github.com: Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password).
```

其实是我开启了网络代理或者`fanqiang`工具引起的，关闭后正常了。

再次`git push`代码就没问题了。

------

[首发链接](https://blog.wbjiang.cn/article/198)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)