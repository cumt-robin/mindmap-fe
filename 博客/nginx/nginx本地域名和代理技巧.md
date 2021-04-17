最近同事小G总是闷闷不乐，让我感觉慌慌的，难道是我平时压榨小G了？我转念一想，不应该啊，工作量事先都评估好了，没道理天天加班啊。

坐下来聊聊后，小G向我吐槽说，”改bug效率太低了，每天加班改bug，都不能早点下班陪女神！”

我深吸一口气，“卧槽，忘记传授小G秘籍了...”

<!-- more -->

在一步步提问引导下，我搞清楚了小G的问题所在......

![改bug好慢](http://qncdn.wbjiang.cn/%E6%94%B9bug%E5%A5%BD%E6%85%A22%E5%90%881.png)

![切生产环境调试还要重跑服务](http://qncdn.wbjiang.cn/%E5%88%87%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E8%B0%83%E8%AF%952%E5%90%881.png)

![我只想访问不同环境](http://qncdn.wbjiang.cn/%E6%88%91%E5%8F%AA%E6%83%B3%E8%AE%BF%E9%97%AE%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%832%E5%90%881.png)

![代理层需要解耦](http://qncdn.wbjiang.cn/%E4%BB%A3%E7%90%86%E5%B1%82%E8%A7%A3%E8%80%A62%E5%90%881.png)

# 问题引入

相信很多前端朋友在线上debug时都吐槽过`npm run dev`或`npm start`太费时的问题吧（这里提到的两条npm脚本代指启动前端dev server）。

由于环境差异，开发环境和生产环境下，我们访问的后端服务域名是不一样的。那么当我们debug生产问题时，难免还是要修改下`webpack devServer`的`proxy`配置指向生产环境域名，然后重启`devServer`，这个过程一般比较缓慢。

有些时候可能测试环境也能复现bug，那么只要接入测试环境也能排查问题原因。但这不是本文关注的重点，本文主要说说如何提高debug效率。

# webpack-dev-server反向代理

0202年了，如果作为开发者的你还不了解反向代理，那么是很有必要去关注下了。

我们知道，跨域对于前端而言是一个无法逃避的问题。如果不想在开发时麻烦后端同事，前端仔必须通过自己的手段解决跨域问题。当然，你帮后端同事买包辣条，他给你通过CORS解决跨域也是可以的。

还好，`webpack-dev-server`帮我们解决了这个痛点，它基于Node代理中间件`http-proxy-middleware`实现。

配置起来也非常简单：

```javascript
proxy: {
  // 需要代理的url规则
  "/api": {
    target: "https://dev.xxx.tech", // 反向代理的目标服务
    changeOrigin: true, // 开启后会虚拟一个请求头Origin
    pathRewrite: {
      "^/api": "" // 重写url，一般都用得到
    }
  }
}
```

这个时候小G打断了我，表示不理解。

![说了半天还不懂](https://qncdn.wbjiang.cn/%E7%90%86%E8%A7%A3%E4%B8%8B%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%862%E5%90%881.png)

反向代理是个什么意思呢？举个例子，我想找马云借钱，马云是肯定不会借给我的。

![马云对钱没兴趣](http://qncdn.wbjiang.cn/%E6%88%91%E5%AF%B9%E9%92%B1%E6%B2%A1%E5%85%B4%E8%B6%A3.jpg)

但是我有一个好朋友老张，我于是找老张借了1W块，但是我没想到这个朋友和马云关系不错，他从马云那里借了1W块，然后转给我。也就是说，我不知道我借到的钱实际来源于哪里，我只知道我从我朋友老张那里借到了钱，老张给我做了一层反向代理。

具体到开发中就是，我前端仔要从`https://dev.xxx.tech`这个域名调用后端接口，但是我前端开发服务运行在`http://localhost:8080`，直接调用后端接口会跨域，被浏览器同源策略阻塞，所以这条路是走不通的。

因此我需要从前端服务器做个代理，这样我就可以用`http://localhost:8080/api/user/login`这种形式调用接口，就好像在调前端自己的接口一样（因为我访问的是前端的url嘛）。

然而实际上是前端服务器做了一层代理，把`http://localhost:8080/api/user/login`这个接口代理到`https://dev.xxx.tech/user/login`。这对前端开发者而言是无感的。

![代理层模型](http://qncdn.wbjiang.cn/%E4%BB%A3%E7%90%86%E5%B1%82%E6%A8%A1%E5%9E%8B.png)

简单总结就是：反向代理隐藏了真实的服务端；相反地，正向代理隐藏了真实的客户端，类似kexueshangwang这种。

# debug痛点

问题来了，假设我们正在`feature`分支开发需求，这个时候上头通知要即时排查和解决一个生产bug，假设生产环境域名为`https://production.xxx.tech`。

我们一般会`stash`代码，然后切`fix`分支，修改`target`的值为`"https://production.xxx.tech"`，然后重新运行`npm start`重启开发服务器接入生产环境，静静等待，放空自己......

![放空自己](http://qncdn.wbjiang.cn/%E6%94%BE%E7%A9%BA%E8%87%AA%E5%B7%B1.png)

这个时候我们就会幻想“唉，要是不用等这么久就好了！”

是的，其实很多时候，一个bug并不复杂，可能解决bug只要1分钟，然而我们切换环境重新运行开发服务器就花了1分钟（大多数情况可能超过这个时间）。那么如何解决这个问题？

# 代理层解耦

是的，有的同学已经想到了，只要把代理服务器抽离出来，问题便可以得到解决，我不再需要把前端编译过程和服务代理目标捆绑在一起。在生产环境，这种Nginx转发对大多数人而言早已是熟门熟路，然而很少有人会尝试在开发环境中也这么做。那么不妨这样试试呢！

## 下载Nginx

我们照常下载[Nginx](http://nginx.org/en/download.html)，选择Windows稳定版即可。

## 固定前端代理

为了避免在debug线上问题时需要切换proxy target而重新运行`npm start`，我们在前端层把proxy target固定下来。比如我固定访问`127.0.0.1:8090`（当然，实际上访问哪个端口可以视个人情况调整）。

```javascript
proxy: {
  "/api": {
    target: "127.0.0.1:8090", // 固定代理目标
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  }
}
```

然后从`127.0.0.1:8090`肯定是无法访问到后端接口的，请接着往下看！

## Nginx代理

由于前端的接口访问已经固定为`127.0.0.1:8090`，那么剩下的工作就交给Nginx吧。我们只要在Nginx中监听本地8090端口，把请求统统转发给目标服务器即可，配置如下：

```
server {
  listen       8090;
  server_name  127.0.0.1;

  location / {
    proxy_pass https://dev.xxx.tech;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade          $http_upgrade;
    proxy_set_header   Connection       "upgrade";
    proxy_set_header   Host             $host;
    # proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```

可以看到，我在配置中注释了X-Real-IP，而我们在生产环境下配置Nginx时，一般会保留这几项Host，X-Real-IP，X-Forwarded-For，用以保留请求的服务器域名，原始客户端和代理服务器的IP等信息。

如果不注释X-Real-IP，前端访问入口的真实IP是`127.0.0.1`或`localhost`，Nginx不认可这样的本地ip，直接返回404，客户端请求不予代理到其他远程服务器。不扯了，这里具体的原因我也不知，如有大佬知道原因，还请点拨下，太感谢了。

好了，回到正题，有了以上的配置，我们就可以将前端代理层和Nginx代理层解耦，前端固定通过本地`127.0.0.1:8090`访问后端接口，而具体接口是代理到开发环境、测试环境或是生产环境，由Nginx决定，只需要修改`nginx.conf`后重启即可。

而Nginx热重启是非常快的，一条命令即可实现，几乎零等待时间。

```
// windows下是这个命令
nginx.exe -s reload
// linux是这样的
nginx -s reload
```

## 本地域名

听到这里，小G又将了我一军。

![端口占用](http://qncdn.wbjiang.cn/%E4%B8%87%E4%B8%80%E7%AB%AF%E5%8F%A3%E8%A2%AB%E5%8D%A0%E7%94%A82%E5%90%881.png)

还好我早有准备，没有自乱阵脚。

如果真的遇到本地端口被占用的情况，最简单的办法当然是换个端口。

为了杜绝这种情况，我们可以引入本地域名，兼具“装逼”效果。

我们知道，域名是通过解析后才能得到真实的服务IP。而域名解析过程中也有这么一些关键节点，是我们应该知道的。

- 浏览器缓存
- 操作系统hosts文件
- Local DNS
- Root DNS
- gTLD Server

借用网上一张图说明下大致流程（侵删）。

![域名解析过程](http://qncdn.wbjiang.cn/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B.png)

上图没提到hosts文件，但是不影响我们魔改。我们只要在操作系统hosts文件这个节点动下手脚，就可以实现本地域名了。

首先，我们找到`C:\Windows\System32\drivers\etc\hosts`这个文件，打开后在最后新增一条解析记录

```
127.0.0.1 www.devtest.com
```

然后保存这个文件，保存hosts文件时需要administrator权限。

这就相当于告诉本地操作系统，如果用户访问`www.devtest.com`，我就给他解析到`127.0.0.1`这个ip

所以，我们在Nginx只要监听`127.0.0.1`的`80`端口即可，配置如下。

```
server {
  listen       80;
  server_name  127.0.0.1;

  location / {
    proxy_pass https://dev.xxx.tech;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade          $http_upgrade;
    proxy_set_header   Connection       "upgrade";
    proxy_set_header   Host             $host;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```

最后，我们只要在前端工程中把代理目标设置为`www.devtest.com`即可。

```javascript
proxy: {
  "/api": {
    target: "http://www.devtest.com", // 固定代理目标
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  }
}
```

这样前端访问的某接口`http://localhost:8080/api/user/login`就会被代理到`http://www.devtest.com/user/login`，而`www.devtest.com`被本地hosts文件解析到`127.0.0.1`，接着Nginx监听了`127.0.0.1`的`80`端口，将请求转发到真实的后端服务，完美！

对了，`www.devtest.com`是我特意命名的一个无法访问的域名，所以你千万别把`www.taobao.com`这种地址解析到本地哦，不然你没法给女神买礼物别怪我。。。

![准时下班](http://qncdn.wbjiang.cn/%E6%97%A9%E7%82%B9%E4%B8%8B%E7%8F%AD2%E5%90%881.png)

今天分享给大家的干货就这么多，祝愿大家准点下班陪女神！

看到最后，求个关注点赞，欢迎大家加我微信交流技术，闲聊也可以哦！

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)