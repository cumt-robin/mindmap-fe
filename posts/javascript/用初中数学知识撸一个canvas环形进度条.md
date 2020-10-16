周末好，今天给大家带来一款接地气的环形进度条组件`vue-awesome-progress`。近日被设计小姐姐要求实现这么一个环形进度条效果，大体由四部分组成，分别是底色圆环，进度弧，环内文字，进度圆点。设计稿截图如下：

![环形进度条设计稿](https://qncdn.wbjiang.cn/%E7%8E%AF%E7%8A%B6%E8%BF%9B%E5%BA%A6%E6%9D%A1%E8%AE%BE%E8%AE%A1%E7%A8%BF.png)

我的第一反应还是找现成的组件，市面上很多组件都实现了前3点，独独没找到能画进度圆点的组件，不然稍加定制也能复用。既然没有现成的组件，只有自己用`vue + canvas`撸一个了。

![我也很无奈啊](https://qncdn.wbjiang.cn/%E6%88%91%E4%B9%9F%E5%BE%88%E6%97%A0%E5%A5%88%E5%95%8A.jpg)

# 效果图

先放个效果图，然后再说下具体实现过程，各位看官且听我慢慢道来。

![环形进度条效果图](https://qncdn.wbjiang.cn/%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1%E6%95%88%E6%9E%9C%E5%9B%BE.gif)

# 安装与使用

[源码地址]( https://github.com/cumt-robin/vue-awesome-progress )，欢迎`star`和提`issue`。

## 安装

```shell
npm install --save vue-awesome-progress
```

## 使用

###  全局注册

```javascript
import Vue from 'vue'
import VueAwesomeProgress from "vue-awesome-progress"
Vue.use(VueAwesomeProgress)
```

### 局部使用

```
import VueAwesomeProgress from "vue-awesome-progress"

export default {
    components: {
        VueAwesomeProgress
    },
    // 其他代码
}
```

### script标签引入组件

同时也支持直接使用`script`标签引入哦，满足有这部分需求的朋友。

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  <script src="path-to/vue-awesome-progress.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    new Vue({
      el: "#app",
      template: '<vue-awesome-progress :percentage="40"></vue-awesome-progress>'
    })
  </script>
</body>
</html>
```

# 静态展示

任何事都不是一蹴而就的，我们首先来实现一个静态的效果，然后再实现动画效果，甚至是复杂的控制逻辑。

## 确定画布大小

第一步是确定画布大小。从设计稿我们可以直观地看到，整个环形进度条的最外围是由进度圆点确定的，而进度圆点的圆心在圆环圆周上。

![环形进度条模型](https://qncdn.wbjiang.cn/%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1%E6%A8%A1%E5%9E%8B.png)

因此我们得出伪代码如下：

```javascript
// canvasSize: canvas宽度/高度
// outerRadius: 外围半径
// pointRadius: 圆点半径
// pointRadius: 圆环半径
canvasSize = 2 * outerRadius = 2 * (pointRadius + circleRadius)
```

据此我们可以定义如下组件属性：

```javascript
props: {
  circleRadius: {
    type: Number,
    default: 40
  },
  pointRadius: {
    type: Number,
    default: 6
  }
},
computed: {
  // 外围半径
  outerRadius() {
    return this.circleRadius + this.pointRadius
  },
  // canvas宽/高
  canvasSize() {
    return 2 * this.outerRadius + 'px'
  }
}
```

那么`canvas`大小也可以先进行绑定了

```html
<template>
    <canvas ref="canvasDemo" :width="canvasSize" :height="canvasSize" />
</template>
```

## 获取绘图上下文

` getContext('2d') `方法返回一个用于在`canvas`上绘图的环境，支持一系列`2d`绘图`API`。 

```javascript
mounted() {
  // 在$nextTick初始化画布，不然dom还未渲染好
  this.$nextTick(() => {
    this.initCanvas()
  })
},
methods: {
  initCanvas() {
    var canvas = this.$refs.canvasDemo;
    var ctx = canvas.getContext('2d');
  }
}
```

## 画底色圆环

完成了上述步骤后，我们就可以着手画各个元素了。我们先画圆环，这时我们还要定义两个属性，分别是圆环线宽`circleWidth`和圆环颜色`circleColor`。

```javascript
circleWidth: {
  type: Number,
  default: 2
},
circleColor: {
  type: String,
  default: '#3B77E3'
}
```

`canvas`提供的画圆弧的方法是`ctx.arc()`，需要提供圆心坐标，半径，起止弧度，是否逆时针等参数。

```javascript
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

 我们知道，`Web`网页中的坐标系是这样的，从绝对定位的设置上其实就能看出来（`top`，`left`设置正负值会发生什么变化），而且原点`(0, 0)`是在盒子（比如说`canvas`）的左上角哦。 

![web坐标系](https://qncdn.wbjiang.cn/web%E5%9D%90%E6%A0%87%E7%B3%BB.jpeg)

对于角度而言，`0°`是`x`轴正向，默认是顺时针方向旋转。

圆环的圆心就是`canvas`的中心，所以`x `, `y` 取`outerRadius`的值就可以了。

```javascript
ctx.strokeStyle = this.circleColor;
ctx.lineWidth = this.circleWidth;
ctx.beginPath();
ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360));
ctx.stroke();
```

注意`arc`传的是弧度参数，而不是我们常理解的`360°`这种概念，因此我们需要将我们理解的`360°`转为弧度。

```javascript
// deg转弧度
deg2Arc(deg) {
  return deg / 180 * Math.PI
}
```

![画圆环](https://qncdn.wbjiang.cn/%E7%94%BB%E5%9C%86%E7%8E%AF.png)

## 画文字

调用`fillText`绘制文字，利用`canvas.clientWidth / 2`和`canvas.clientWidth / 2`取得中点坐标，结合控制文字对齐的两个属性`textAlign`和`textBaseline`，我们可以将文字绘制在画布中央。文字的值由`label`属性接收，字体大小由`fontSize`属性接收，颜色则取的`fontColor`。

```javascript
if (this.label) {
  ctx.font = `${this.fontSize}px Arial,"Microsoft YaHei"`
  ctx.fillStyle = this.fontColor;
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(this.label, canvas.clientWidth / 2, canvas.clientWidth / 2);
}
```

![画文字](https://qncdn.wbjiang.cn/%E7%94%BB%E6%96%87%E5%AD%97.png)

## 画进度弧

支持普通颜色和渐变色，`withGradient`默认为`true`，代表使用渐变色绘制进度弧，渐变方向我默认给的从上到下。如果希望使用普通颜色，`withGradient`传`false`即可，并可以通过`lineColor`自定义颜色。

```javascript
if (this.withGradient) {
  this.gradient = ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
  this.lineColorStops.forEach(item => {
    this.gradient.addColorStop(item.percent, item.color);
  });
}
```

其中`lineColorStops`是渐变色的颜色偏移断点，由父组件传入，可传入任意个颜色断点，格式如下：

```javascript
colorStops2: [
  { percent: 0, color: '#FF9933' },
  { percent: 1, color: '#FF4949' }
]
```

画一条从上到下的进度弧，即`270°`到`90°`

```javascript
ctx.strokeStyle = this.withGradient ? this.gradient : this.lineColor;
ctx.lineWidth = this.lineWidth;
ctx.beginPath();
ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, this.deg2Arc(270), this.deg2Arc(90));
ctx.stroke();
```

![画进度弧](https://qncdn.wbjiang.cn/%E7%94%BB%E8%BF%9B%E5%BA%A6%E5%BC%A7.png)

其中`lineWidth`是弧线的宽度，由父组件传入

```javascript
lineWidth: {
  type: Number,
  default: 8
}
```

## 画进度圆点

最后我们需要把进度圆点补上，我们先写死一个角度`90°`，显而易见，圆点坐标为`(this.outerRadius, this.outerRadius + this.circleRadius)`

![90度圆点坐标](https://qncdn.wbjiang.cn/90%E5%BA%A6%E5%9C%86%E7%82%B9%E5%9D%90%E6%A0%87.png)

画圆点的代码如下：

```javascript
ctx.fillStyle = this.pointColor;
ctx.beginPath();
ctx.arc(this.outerRadius, this.outerRadius + this.circleRadius, this.pointRadius, 0, this.deg2Arc(360));
ctx.fill();
```

其中`pointRadius`是圆点的半径，由父组件传入：

```javascript
pointRadius: {
  type: Number,
  default: 6
}
```

![90度画圆点](https://qncdn.wbjiang.cn/90%E5%BA%A6%E7%94%BB%E5%9C%86%E7%82%B9.png)

## 角度自定义

当然，进度条的角度是灵活定义的，包括开始角度，结束角度，都应该由调用者随意给出。因此我们再定义一个属性`angleRange`，用于接收起止角度。

```javascript
angleRange: {
  type: Array,
  default: function() {
    return [270, 90]
  }
}
```

有了这个属性，我们就可以随意地画进度弧和圆点了，哈哈哈哈。

![等等，你忘了这个场景](https://qncdn.wbjiang.cn/%E7%AD%89%E7%AD%89%E4%BD%A0%E5%BF%98%E4%BA%86%E8%BF%99%E4%B8%AA%E5%9C%BA%E6%99%AF.jpg)

老哥，这种圆点坐标怎么求？

![特殊角度怎么求圆点圆心坐标](https://qncdn.wbjiang.cn/%E7%89%B9%E6%AE%8A%E8%A7%92%E5%BA%A6%E6%80%8E%E4%B9%88%E6%B1%82%E5%9D%90%E6%A0%87.png)

噗......看来高兴过早了，最重要的是根据不同角度求得圆点的圆心坐标，这让我顿时犯了难。

![你要冷静](https://qncdn.wbjiang.cn/%E6%96%8C%E5%93%A5%E4%BD%A0%E8%A6%81%E5%86%B7%E9%9D%99.gif)

经过冷静思考，我脑子里闪过了一个利用正余弦公式求坐标的思路，但前提是坐标系原点如果在圆环外接矩形的左上角才好算。仔细想想，冇问题啦，我先给坐标系平移一下，最后求出来结果，再补个平移差值不就行了嘛。

![平移坐标系后求圆点坐标](https://qncdn.wbjiang.cn/%E5%B9%B3%E7%A7%BB%E5%9D%90%E6%A0%87%E7%B3%BB%E5%90%8E%E6%B1%82%E5%9C%86%E7%82%B9%E5%9D%90%E6%A0%87.png)

画图工具不是很熟练，这里图没画好，线歪了，请忽略细节。

好的，我们先给坐标系向右下方平移`pointRadius`，最后求得结果再加上`pointRadius`就好了。伪代码如下：

```javascript
// realx：真实的x坐标
// realy：真实的y坐标
// resultx：平移后求取的x坐标
// resultx：平移后求取的y坐标
// pointRadius 圆点半径
realx = resultx + pointRadius
realy = resulty + pointRadius
```

求解坐标的思路大概如下，分四个范围判断，得出求解公式，应该还可以化简，不过我数学太菜了，先这样吧。

```javascript
getPositionsByDeg(deg) {
    let x = 0;
    let y = 0;
    if (deg >= 0 && deg <= 90) {
        // 0~90度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(deg)))
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(deg)))
    } else if (deg > 90 && deg <= 180) {
        // 90~180度
        x = this.circleRadius * (1 - Math.cos(this.deg2Arc(180 - deg)))
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(180 - deg)))
    } else if (deg > 180 && deg <= 270) {
        // 180~270度
        x = this.circleRadius * (1 - Math.sin(this.deg2Arc(270 - deg)))
        y = this.circleRadius * (1 - Math.cos(this.deg2Arc(270 - deg)))
    } else {
        // 270~360度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(360 - deg)))
        y = this.circleRadius * (1 - Math.sin(this.deg2Arc(360 - deg)))
    }
    return { x, y }
}
```

最后再补上偏移值即可。

```javascript
const pointPosition = this.getPositionsByDeg(nextDeg);
ctx.arc(pointPosition.x + this.pointRadius, pointPosition.y + this.pointRadius, this.pointRadius, 0, this.deg2Arc(360));
```

![ 任意角度画弧线和圆点 ](https://qncdn.wbjiang.cn/%E4%BB%BB%E6%84%8F%E8%A7%92%E5%BA%A6%E7%94%BB%E5%BC%A7%E7%BA%BF%E5%92%8C%E5%9C%86%E7%82%B9.png)

这样，一个基本的`canvas`环形进度条就成型了。

# 动画展示

静态的东西逼格自然是不够的，因此我们需要再搞点动画效果装装逼。

## 基础动画

我们先简单实现一个线性的动画效果。基本思路是把开始角度和结束角度的差值分为`N`段，利用`window.requestAnimationFrame`依次执行动画。

比如从`30°`到`90°`，我给它分为6段，每次画`10°`。要注意`canvas`画这种动画过程一般是要重复地清空画布并重绘的，所以第一次我画的弧线范围就是`30°~40°`，第二次我画的弧线范围就是`30°~50°`，以此类推......

基本的代码结构如下，具体代码请参考[vue-awesome-progress]( https://github.com/cumt-robin/vue-awesome-progress ) `v1.1.0`版本，如果顺手帮忙点个`star`也是极好的。

```javascript
animateDrawArc(canvas, ctx, startDeg, endDeg, nextDeg, step) {
  window.requestAnimationFrame(() => {
    // 清空画布
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // 求下一个目标角度
    nextDeg = this.getTargetDeg(nextDeg || startDeg, endDeg, step);
    // 画圆环
    // 画文字
    // 画进度弧线
    // 画进度圆点
    if (nextDeg !== endDeg) {
      // 满足条件继续调用动画，否则结束动画
      this.animateDrawArc(canvas, ctx, startDeg, endDeg, nextDeg, step)
    }
  }
}
```

![线性动画](https://qncdn.wbjiang.cn/%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1%E6%99%AE%E9%80%9A%E5%8A%A8%E7%94%BB.gif)

## 缓动效果

线性动画显得有点单调，可操作性不大，因此我考虑引入贝塞尔缓动函数`easing`，并且支持传入动画执行时间周期`duration`，增强了可定制性，使用体验更好。这里不列出实现代码了，请前往[vue-awesome-progress]( https://github.com/cumt-robin/vue-awesome-progress )查看。

```html
<vue-awesome-progress label="188人" :duration="10" easing="0,0,1,1" />

<vue-awesome-progress
  label="36℃"
  circle-color="#FF4949"
  :line-color-stops="colorStops"
  :angle-range="[60, 180]"
  :duration="5"
/>

// 省略部分...

<vue-awesome-progress label="188人" easing="1,0.28,0.17,0.53" :duration="10" />

<vue-awesome-progress
  label="36℃"
  circle-color="#FF4949"
  :line-color-stops="colorStops"
  :angle-range="[60, 180]"
  :duration="5"
  easing="0.17,0.67,0.83,0.67"
/>
```

![环形进度条缓动效果](https://qncdn.wbjiang.cn/%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1%E7%BC%93%E5%8A%A8%E6%95%88%E6%9E%9C.gif)

可以看到，当传入不同的动画周期`duration`和缓动参数`easing`时，动画效果各异，完全取决于使用者自己。

# 其他效果

当然根据组件支持的属性，我们也可以定制出其他效果，比如不显示文字，不显示圆点，弧线线宽与圆环线宽一样，不使用渐变色，不需要动画，等等。我们后续也会考虑支持更多能力，比如控制进度，数字动态增长等！具体使用方法，请参考[vue-awesome-progress]( https://github.com/cumt-robin/vue-awesome-progress )。

![其他效果案例](https://qncdn.wbjiang.cn/%E7%8E%AF%E5%BD%A2%E8%BF%9B%E5%BA%A6%E6%9D%A1%E5%85%B6%E4%BB%96%E6%95%88%E6%9E%9C%E6%A1%88%E4%BE%8B.gif)

# 更新日志

**2020年04月10日更新**

支持进度控制，只需要修改组件的属性值`percentage`即可。
![进度控制](https://s1.ax1x.com/2020/04/10/GIvQCF.gif)

------
**2019年11月10日更新**

由于我从业务场景出发做了这个组件，没有考虑到大部分场景都是传百分比控制进度的，因此在`v1.4.0`版本做了如下修正：

1. 废弃`angle-range`，改用`percentage`控制进度，同时提供`start-deg`属性控制起始角度；

2. `with-gradient`改为`use-gradient`

3. 通过`show-text`控制是否显示进度文字

4. 支持通过`format`函数自定义显示文字的规则


![v1.4.0版本效果](https://qncdn.wbjiang.cn/v1.4.0%E6%95%88%E6%9E%9C%E5%9B%BE.gif)

# 结语

写完这个组件有让我感觉到，程序员最终不是输给了代码和技术的快速迭代，而是输给了自己的逻辑思维能力和数学功底。就[vue-awesome-progress]( https://github.com/cumt-robin/vue-awesome-progress )这个组件而言，根据这个思路，我们也能迅速开发出适用于`React`，`Angular`以及其他框架生态下的组件。工作三年有余，接触了不少框架和技术，经历了`MVVM`，`Hybrid`，`小程序`，`跨平台`，`大前端`，` serverless `的大火，也时常感慨“学不动了”，在这个快速演进的代码世界里常常感到失落。好在自己还没有丢掉分析问题的能力，而不仅仅是调用各种`API`和插件，这可能是程序员最宝贵的财富吧。前路坎坷，我辈当不忘初心，愿你出走半生，归来仍是少年！

------

[首发链接](https://juejin.im/post/5dc626125188253aec025a60)

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)