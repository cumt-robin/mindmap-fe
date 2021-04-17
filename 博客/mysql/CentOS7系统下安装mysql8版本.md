1.进入到https://www.mysql.com/downloads/msyql下载页，选择社区版

<!-- more -->

2.查看linux版本，选择对应的版本下载
![linux的mysql版本](http://qncdn.wbjiang.cn/linux%E7%9A%84mysql%E7%89%88%E6%9C%AC.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

3.将下载的文件mysql-8.0.13-linux-glibc2.12-x86_64.tar.xz拷贝到linux服务器上的某目录下，然后解压，再复制到usr/local目录，并改名为mysql

```
[root@VM_0_14_centos mysql]# tar -xvf mysql-8.0.13-linux-glibc2.12-x86_64.tar.xz
[root@VM_0_14_centos mysql]# cp -rv mysql-8.0.13-linux-glibc2.12-x86_64 /usr/local
[root@VM_0_14_centos mysql]# cd /usr/local 
[root@VM_0_14_centos local]# mv mysql-8.0.13-linux-glibc2.12-x86_64 mysql
```

4.添加mysql用户

```
useradd -s /sbin/nologin -M mysql
```

5.msyql初始化

```
/usr/local/mysql/bin/mysqld --initialize --user=mysql
```

此时会生成临时密码

```
[root@VM_0_14_centos mysql]# /usr/local/mysql/bin/mysqld --initialize --user=mysql
2019-01-20T10:56:07.718326Z 0 [System] [MY-013169] [Server] /usr/local/mysql/bin/mysqld (mysqld 8.0.13) initializing of server in progress as process 5826
2019-01-20T10:56:16.915217Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: twi=Tlsi<0O!
2019-01-20T10:56:20.410563Z 0 [System] [MY-013170] [Server] /usr/local/mysql/bin/mysqld (mysqld 8.0.13) initializing of server has completed
```

6.复制启动、关闭脚本

```
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
```

7.修改配置文件，wq保存退出

```
vim /etc/my.cnf

[mysqld]
    basedir = /usr/local/mysql   
    datadir = /var/lib/mysql
    socket = /var/lib/mysql/mysql.sock
    character-set-server=utf8
 [client]
   socket = /var/lib/mysql/mysql.sock
   default-character-set=utf8
```

8.启动数据库服务

```
service mysqld start
```
报错

> mysqld_safe Directory '/var/lib/mysql' for UNIX socket file don't exists.

一是因为没有/var/lib/mysql这个目录，二是没有写的权限，mysql.sock文件无法生成。

```
[root@VM_0_14_centos lib]# mkdir mysql
[root@VM_0_14_centos lib]# chmod 777 /var/lib/mysql
```

再次运行service mysqld start报另一个错

```
Starting MySQL. ERROR! The server quit without updating PID file (/var/lib/mysql/VM_0_14_centos.pid).
```

打印出具体报错信息

```
[root@VM_0_14_centos mysql]# cat VM_0_14_centos.err

2019-01-20T11:11:45.906800Z 0 [System] [MY-010116] [Server] /usr/local/mysql/bin/mysqld (mysqld 8.0.13) starting as process 7788
2019-01-20T11:11:45.910813Z 0 [Warning] [MY-013242] [Server] --character-set-server: 'utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.
2019-01-20T11:11:45.925456Z 1 [ERROR] [MY-011011] [Server] Failed to find valid data directory.
2019-01-20T11:11:45.925586Z 0 [ERROR] [MY-010020] [Server] Data Dictionary initialization failed.
2019-01-20T11:11:45.925600Z 0 [ERROR] [MY-010119] [Server] Aborting
2019-01-20T11:11:45.926342Z 0 [System] [MY-010910] [Server] /usr/local/mysql/bin/mysqld: Shutdown complete (mysqld 8.0.13)  MySQL Community Server - GPL.
2019-01-20T11:12:00.049920Z 0 [System] [MY-010116] [Server] /usr/local/mysql/bin/mysqld (mysqld 8.0.13) starting as process 7975
2019-01-20T11:12:00.052469Z 0 [Warning] [MY-013242] [Server] --character-set-server: 'utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.
2019-01-20T11:12:00.060600Z 1 [ERROR] [MY-011011] [Server] Failed to find valid data directory.
2019-01-20T11:12:00.060745Z 0 [ERROR] [MY-010020] [Server] Data Dictionary initialization failed.
2019-01-20T11:12:00.060759Z 0 [ERROR] [MY-010119] [Server] Aborting
2019-01-20T11:12:00.061610Z 0 [System] [MY-010910] [Server] /usr/local/mysql/bin/mysqld: Shutdown complete (mysqld 8.0.13)  MySQL Community Server - GPL.
```

看不出来具体是哪里的问题，于是运行service --status-all，有报错信息

> ERROR! MySQL is not running, but lock file (/var/lock/subsys/mysql) exists

有网友说删了该文件就可以，结果我删了也没用。

那就接着排查刚才的err文件，关键的错误应该是这两行

```
2019-01-20T11:11:45.925456Z 1 [ERROR] [MY-011011] [Server] Failed to find valid data directory.
2019-01-20T11:11:45.925586Z 0 [ERROR] [MY-010020] [Server] Data Dictionary initialization failed.
```

于是查找my.cnf，与data目录有关的就是datadir=/var/lib/mysql这一条配置了，我尝试性地删了这一行，结果成功了，service mysqld start成功！

9.mysql -u root -p登录mysql报错
解决方法如下：

```
cd /usr/local/bin  
ln -fs /usr/local/mysql/bin/mysql mysql
```


10.show databases报错

```
you must reset your password using ALTER USER statement before executing this statement.
```

解决方法：

```
alter user user() identified by '123456';
```

11.用ip无法远程登录mysql，只能用localhost在linux服务器登录
修改权限配置

```
grant all privileges on *.* to 'root'@'%' identified by '123456';
```

但是报错

> You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'identified by '123456' at line 1

解决方法：

```
use mysql;
update user set host = '%' where user = 'root';
flush privileges;
```

接着用navicat连接时报错

> Client does not support authentication protocol requested by server; consider upgrading MySQL client

解决方法：

```
ALTER USER 'root'@'*' IDENTIFIED WITH mysql_native_password BY '123456';
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)
