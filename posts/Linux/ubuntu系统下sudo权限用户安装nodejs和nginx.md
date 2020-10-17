为了支撑公司某 `ios app` 上线，今天做了个隐私政策 `h5` 页面并上线，顺手体验了一把 `ubuntu`系统的 `sudo` 权限。<!-- more -->本来想用 `nodejs` 的 `express` 框架搭个简单的静态资源托管服务，然后用 `nginx` 做下反向代理。但是在安装 `express-generator` 时遇到点问题，可能 `sudo` 权限玩得不够熟练，跟 `root` 用户还是有很大区别的。本文简单说下自己在 `ubuntu` 系统下 `sudo` 权限用户安装 `nodejs` 和 `nginx` 的过程。

# 安装nodejs

## 下载安装包

话不多说，直接上[nodejs下载链接](https://nodejs.org/en/download/)。

![nodejs下载](http://qncdn.wbjiang.cn/%E4%B8%8B%E8%BD%BDubuntu64%E4%BD%8Dnodejs%E5%8C%85.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

## 解压和软连接

下载到的 `nodejs` 包是一个 `.tar.xz` 格式的包，解压命令如下：

```
tar -xvf node-v10.15.3-linux-x64.tar.xz
```

![解压nodejs包](http://qncdn.wbjiang.cn/ubuntu%E8%A7%A3%E5%8E%8Bnodejs.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

为了让 `node` 和 `npm` 命令行全局可用，我采用了软连接的方式

```
sudo ln -s /home/devadmin/frontend/download/node/bin/node /usr/local/bin/node
sudo ln -s /home/devadmin/frontend/download/node/bin/npm /usr/local/bin/npm
```

![软连接](http://qncdn.wbjiang.cn/sudo%E8%BD%AF%E8%BF%9E%E6%8E%A5node%E5%92%8Cnpm%E5%91%BD%E4%BB%A4.png?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

然后就可以舒服地使用 `node` 和 `npm` 命令行了。

## 设置npm代理

为了提升 `npm install` 的速度和体验，我还用到了 `npm` 代理。

```
npm config set registry https://registry.npm.taobao.org
```

![npm设置代理](http://qncdn.wbjiang.cn/ubuntu%E7%9A%84npm%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86.png)

这样 `nodejs` 就算安装完成了。

# 安装nginx

安装 `nginx` 时采用的是 `apt-get` 的下载方式

```
sudo apt-get install nginx
```
## nginx关注点

安装后要知道的几点是：

 - 配置文件所在目录

```
/etc/nginx/
```

 - 静态资源所在目录

```
/usr/share/nginx/
```

 - nginx主程序

```
/usr/sbin/nginx
```

 - nginx日志所在目录

```
/var/log/nginx/
```

## 配置文件的坑

配置文件 `nginx.conf` 有个坑，需要把配置中的两行注释掉才有效。

```
# include /etc/nginx/conf.d/*.conf;
# include /etc/nginx/sites-enabled/*;
```

## 其他的坑

遇到了 `xftp` 无法上传文件的情况，一般是文件夹权限不够，可以提高权限，然后再尝试。

```
sudo chmod 777 dirname
```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)