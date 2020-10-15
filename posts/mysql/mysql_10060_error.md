最近加班挺多，所以也好久没远程访问自己云服务器上的`MySQL`数据库了。今天本地启动`Node`服务时连不上`MySQL`，照常用`Navicat For MySQL`连接远程数据库进行检查，结果发现突然报错了。

<!-- more -->

```
2003-Can’t connect to MySQL server on ‘XXX.XX.XX.XX’（10060）
```

# 检查网络

第一反应还是检查网络是不是正常，所以就马上`ping`测试一下，然而发现并不是网络问题，可以正常`ping`通。

```
ping XXX.XX.XX.XX

正在 Ping XXX.XX.XX.XX 具有 32 字节的数据:
来自 XXX.XX.XX.XX 的回复: 字节=32 时间=64ms TTL=47
来自 XXX.XX.XX.XX 的回复: 字节=32 时间=86ms TTL=47
```

# 检查安全组

然后就想着看看云服务器的安全组设置是否有问题，但是之前都没出过这个问题，讲道理安全组出现问题的可能性不大，但还是先检查下为妙。

登录腾讯云后，发现实例对应的安全组设置妥妥的，没有什么问题。

![安全组正常](https://s1.ax1x.com/2020/03/17/8t5AeI.png)

# 检查下用户权限

由于是我自己的服务器，所以用的都是`root`用户。需要在`xshell`中登录`MySQL`查询下`user`表。

```
mysql -uroot -p
输入密码
mysql> use mysql
mysql> select host,user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | root             |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
+-----------+------------------+
4 rows in set (0.00 sec)
```

可以发现，`root`对应的`host`是`%`，任意的意思，也就意味着`root`用户在连接`MySQL`时不受`ip`约束。

所以说也不是这里的问题啦！

# 检查CentOS防火墙

这是很容易忽略的一步，可能很多人都会认为安全组已经设置好了，不必再检查`CentOS`的防火墙。其实是很有必要检查防火墙的，我们应该把`3306`放通，再重启防火墙。

```
[root@VM_0_14_centos ~]# firewall-cmd --permanent --zone=public --add-port=3306/tcp
success
[root@VM_0_14_centos ~]# firewall-cmd --reload
success
```

然后一看，很愉快，`Navicat for MySQL`连接远程数据库成功！

![Navicat for MySQL连接成功](https://s1.ax1x.com/2020/03/17/8t5RpD.png)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)