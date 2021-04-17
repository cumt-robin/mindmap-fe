本文分享一下微信小程序自定义`tabBar`的几种实现方式。

<!-- more -->

# 模拟的tabBar页面（不推荐）

## 使用策略

- `app.json`不配置`tabBar`，用普通`page`来代替`tabbar`页面，暂且称之为模拟的`tabbar`页面。

  ![tabbar效果图1](http://qncdn.wbjiang.cn/tabbar1.png)

- 每个模拟的`tabbar`页面都需要引入自定义`tabbar`组件。

1. 自定义的`tabbar`组件写法如下：

`/components/index-tabbar/index.json`

```
{
  "component": true,
  "usingComponents": {
    "van-tabbar": "vant-weapp/tabbar/index",
    "van-tabbar-item": "vant-weapp/tabbar-item/index"
  }
}
```

`/components/index-tabbar/index.wxml`

```xml
<cover-view class="container">
  <van-tabbar active="{{ active }}" bind:change="onChange">
    <van-tabbar-item name="index" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="category" icon="label-o">分类</van-tabbar-item>
    <van-tabbar-item name="msgs" icon="comment-o">留言</van-tabbar-item>
    <van-tabbar-item name="my" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</cover-view>

```

`/components/index-tabbar/index.js`

```javascript
Component({
  properties: {
    active: {
      type: String,
      value: 'index'
    },
  },
  methods: {
    onChange(event) {
      wx.redirectTo({
        url: `/pages/${event.detail}/index`,
      })
    }
  }
})
```

2. 模拟的`tabbar`页面写法如下：

`/pages/home/index.json`

```
{
  "usingComponents": {
    "index-tabbar": "/components/index-tabbar/index"
  }
}
```

`/pages/home/index.wxml`

```xml
<view class="container">
  <text>首页</text>
  <index-tabbar active="index"></index-tabbar>
</view>
```

- 跳转页面使用`wx.redirectTo`

## 总结

由于`wx.redirectTo`跳转页面是跳转的普通页面，页面渲染也自然会导致自定义的`tabbar`组件重新渲染，所以会出现底部`tabbar`闪一下的视觉体验，很尴尬。

# Component伪装Page（还不错）

## 使用策略

将上述`4`个模拟的`tabBar`页面换成组件写法，然后根据条件进行`wx:if`控制。

1. 改造首页，分类，留言，我的，将其由页面改为组件

`/pages/home/index.json`

```
{
  "component": true
}
```

`/pages/home/index.wxml`

```xml
<view>
  <text>首页</text>
</view>
```

`/pages/home/index.js`

```javascript
Component({})
```

2. `index-tabbar`组件改造

`/components/index-tabbar/index.wxml`

```xml
<cover-view class="container">
  <van-tabbar active="{{ active }}" bind:change="onChange">
    <van-tabbar-item
      wx:for="{{panels}}"
      wx:for-index="index"
      wx:for-item="item"
      wx:key="{{index}}"
      name="{{item.name}}"
      icon="{{item.icon}}"
      info="{{item.badge}}">
      {{item.label}}
    </van-tabbar-item>
  </van-tabbar>
</cover-view>


```

`/components/index-tabbar/index.js`

```javascript
Component({
  properties: {
    active: {
      type: String,
      value: 'home'
    },
    panels: {
      type: Array,
      value: []
    },
  },
  methods: {
    onChange(event) {
      this.triggerEvent('changeTab', event.detail)
    }
  }
})


```

2. 入口页`index`改写成如下

`/pages/index/index.json`

```
{
  "usingComponents": {
    "index-tabbar": "/components/index-tabbar/index",
    "home-panel": "../home/index",
    "category-panel": "../category/index",
    "msgs-panel": "../msgs/index",
    "my-panel": "../my/index"
  }
}

```

`/pages/index/index.wxml`

```xml
<view class="container">
  <home-panel wx:if="{{activeTab == 'home'}}">首页</home-panel>
  <category-panel wx:if="{{activeTab == 'category'}}">分类</category-panel>
  <msgs-panel wx:if="{{activeTab == 'msgs'}}">留言</msgs-panel>
  <my-panel wx:if="{{activeTab == 'my'}}">我的</my-panel>
  <index-tabbar active="{{activeTab}}" panels="{{panels}}" bind:changeTab="onTabChange"></index-tabbar>
</view>


```

`/pages/index/index.js`

```javascript
Page({
  data: {
    activeTab: 'home',
    panels: [
      { name: 'home', icon: 'home-o', label: '首页' },
      { name: 'category', icon: 'label-o', badge: '5', label: '分类' },
      { name: 'msgs', icon: 'comment-o', badge: '99+', label: '留言' },
      { name: 'my', icon: 'user-o', label: '我的' }
    ]
  },
  onTabChange(event) {
    this.setData({
      activeTab: event.detail
    })
  }
})


```

效果如下：

![tabbar效果图2](http://qncdn.wbjiang.cn/tabbar2.png)

## 总结

由于是通过`wx:if`控制组件的创建和销毁，是局部更新，所以不会导致底部`tabbar`的重新渲染，所以底部闪一下的问题就解决了。缺点我想是如果频繁切换`tab`可能导致`wx:if`的渲染开销大吧。

# 官方自定义tabBar

官方也提供了自定义`tabbar`的方法，见[自定义 tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)。

> 基础库 2.5.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)