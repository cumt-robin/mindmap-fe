忘记mysql登录密码是很常见的操作，今天讲一下linux centos7下mysql8.0版本修改密码的方法。

<!-- more -->

# 踩坑
网上很多文章说的是mysql5.x版本的修改密码方法，按照这些方法做就会遇到坑了。

忘记密码了，首先尝试修改mysql的配置文件/etc/my.cnf，有的人安装目录可能不太一样，配置文件会是/etc/mysql/my.cnf或者其他的目录下。

![mysql配置文件](http://qncdn.wbjiang.cn/mysql%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

在[mysqld]下面添加一行，可以跳过密码登录

```
skip-grant-tables
```

重启mysqld服务

```
service mysqld restart
```

输入mysql回车进入mysql命令行，尝试执行

```
update user set password=password("123456") where user="root";
```

直接就报语句错误了，看来可能是password函数有问题。

> ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '("123456") where user="root"' at line 1

接着尝试另一个方法。

```
mysql> ALTER USER 'root'@'*' IDENTIFIED WITH mysql_native_password BY '123456'
```

也报错，--skip-grant-tables模式下，不能运行这条语句。

> ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement

于是我先查查user表的数据。

```
select user, password from user
```
![mysql8 user表没有password列](http://qncdn.wbjiang.cn/mysql8user%E8%A1%A8%E6%B2%A1%E6%9C%89password.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)
发现user表中根本没有password这个字段，上网查了后发现只有authentication_string，在mysql5.7.9后就废弃了password字段和password()函数。

需要先将authentication_string设置为空

```
update user set authentication_string = ‘’ where user = ‘root’;
```

然后退出mysql，删除/etc/my.cnf的skip-grant-tables，重启mysqld服务。

接着尝试登录mysql

```
mysql -uroot -p
```

直接回车登录mysql，再使用alter修改用户密码

```
alter user ‘root’@’%’ indentified by ‘123456’;
```

提示成功！！！

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)