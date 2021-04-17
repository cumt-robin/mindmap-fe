# 导读

本文主要是对`connect-history-api-fallback`库进行一次源码分析。`connect-history-api-fallback`是一个用于支持SPA History路由模式的`nodejs`库。阅读本文前，应对`HTML5 History`模式有一定程度的了解！

<!-- more -->

# 源码分析

```javascript
/** 
 * 前端需要开启history模式，而后端根据url并不知道前端在请求api还是在请求页面，如localhost:4200/home这种url，前端理所当然认为“我需要得到html，并跳转到首页”，然而后端并不能区分。
 * 因此需要一种判断机制，来使得后端能分析出前端的请求目的。
 * connect-history-api-fallback 这个中间件正好帮我们完成了上述分析操作，来看下它是怎么实现的吧！
 * 第一次把自己的源码分析思路写出来，说得不对的地方，请指出！
 */

'use strict';

var url = require('url');

exports = module.exports = function historyApiFallback(options) {
  // 接收配置参数
  options = options || {};
  // 初始化日志管理器
  var logger = getLogger(options);

  // 中间件是要返回一个函数的，函数形参有req, res, next
  return function(req, res, next) {
    var headers = req.headers;
    if (req.method !== 'GET') {
      // 如果请求方法不是GET类型，说明不需要返回html，那么就调用next()，把请求交给下一个中间件
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the method is not GET.'
      );
      return next();
    } else if (!headers || typeof headers.accept !== 'string') {
      // 如果没有请求头，或者请求头中的accept不是字符串，说明不是一个标准的http请求，也不予处理，把请求交给下一个中间件
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client did not send an HTTP accept header.'
      );
      return next();
    } else if (headers.accept.indexOf('application/json') === 0) {
      // 如果客户端希望得到application/json类型的响应，说明也不是在请求html，也不予处理，把请求交给下一个中间件
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client prefers JSON.'
      );
      return next();
    } else if (!acceptsHtml(headers.accept, options)) {
      // 如果请求头中不包含配置的Accept或者默认的['text/html', '*/*']，那么说明也不是在请求html，也不予处理，把请求交给下一个中间件
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client does not accept HTML.'
      );
      return next();
    }

    // 走到这里说明是在请求html了，要开始秀操作了

    // 首先利用url模块的parse方法解析下url，会得到一个对象，包括protocol，hash，path, pathname, query, search等字段，类似浏览器的location对象
    var parsedUrl = url.parse(req.url);
    var rewriteTarget;
    // 然后得到配置中的rewrites，也就是重定向配置；
    // 重定向配置是一个数组，每一项都包含from和to两个属性；
    // from是用来正则匹配pathname是否需要重定向的;
    // to则是重定向的url，to可以是一个字符串，也可以是一个回调方法来返回一个字符串，回调函数接收一个上下文参数context，context包含三个属性（parsedUrl，match，request）
    options.rewrites = options.rewrites || [];
    // 遍历一波重定向配置
    for (var i = 0; i < options.rewrites.length; i++) {
      var rewrite = options.rewrites[i];
      // 利用字符串的match方法去匹配
      var match = parsedUrl.pathname.match(rewrite.from);
      if (match !== null) {
        // 如果match不是null，说明pathname和重定向配置匹配上了
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to, req);

        if(rewriteTarget.charAt(0) !== '/') {
          // 推荐使用/开头的绝对路径作为重定向url
          logger(
            'We recommend using an absolute path for the rewrite target.',
            'Received a non-absolute rewrite target',
            rewriteTarget,
            'for URL',
            req.url
          );
        }

        logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
        // 进行重定向url操作
        req.url = rewriteTarget;
        return next();
      }
    }

    var pathname = parsedUrl.pathname;
    // 首先说明一下：校验逻辑默认是会去检查url中最后的.号的，有.号的说明在请求文件，那就跟history模式就没什么鸟关系了
    // 我暂且将上述规则成为“点号校验规则”
    // disableDotRule为true，代表禁用点号校验规则
    if (pathname.lastIndexOf('.') > pathname.lastIndexOf('/') &&
        options.disableDotRule !== true) {
      // 如果pathname的最后一个/之后还有.，说明请求的是/a/b/c/d.*的文件（*代表任意文件类型）;
      // 如果此时配置disableDotRule为false，说明开启点号校验规则，那么不予处理，交给其他中间件
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the path includes a dot (.) character.'
      );
      return next();
    }

    // 如果pathname最后一个/之后没有.，或者disableDotRule为true，都会走到最后一步：重写url
    // 重写url有默认值/index.html，也可以通过配置中的index自定义
    rewriteTarget = options.index || '/index.html';
    logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
    // 重写url
    req.url = rewriteTarget;
    // 此时再将执行权交给下一个中间件（url都换成index.html了，后面的路由等中间件也不会再处理了，然后前端接收到html就开始解析路由了，目的达到！）
    next();
  };
};

// 判断重定向配置中的to
function evaluateRewriteRule(parsedUrl, match, rule, req) {
  if (typeof rule === 'string') {
    // 如果是字符串，直接返回
    return rule;
  } else if (typeof rule !== 'function') {
    // 如果不是函数，抛出错误
    throw new Error('Rewrite rule can only be of type string or function.');
  }

  // 执行自定义的回调函数，得到一个重定向的url
  return rule({
    parsedUrl: parsedUrl,
    match: match,
    request: req
  });
}

// 判断请求头的accept是不是包含在配置数组或默认数组的范围内
function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}

// 处理日志
function getLogger(options) {
  if (options && options.logger) {
    // 如果有指定的日志方法，则使用指定的日志方法
    return options.logger;
  } else if (options && options.verbose) {
    // 否则，如果配置了verbose，默认使用console.log作为日志方法
    return console.log.bind(console);
  }
  // 否则就没有日志方法，就不记录日志咯
  return function(){};
}

```

------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)