在网上搜了很多关于作用域插槽的解释，感觉没有写得很具体的吧，我认为应该对组件化有很深的理解才会触及到这个问题吧，这里也分享下我自己对于slot-scope的一点理解。

<!-- more -->

- slot大家看看文档都懂了，无非就是在子组件中挖个坑，坑里面放什么东西由父组件决定。

```
// 子组件
<template>
  <slot>来啊，我这里挖了个坑</slot>
</template>

// 父组件
<template>
  <child>
   <!-- 传入子组件的自定义内容，会填入到子组件的slot插槽中 -->
    <span>我在这放个span，乐意的话，放个组件都行</span>
  </child>
</template>
```

 1. 给slot传入普通文本

![slot传入普通文本](http://qncdn.wbjiang.cn/slot%E6%99%AE%E9%80%9A%E6%96%87%E6%9C%AC.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

2. 给slot传入了一个图像处理组件

![slot传入普通文本](http://qncdn.wbjiang.cn/slot%E4%BC%A0%E5%85%A5%E7%BB%84%E4%BB%B6.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

- 具名插槽也很简单，比如有多个插槽，我作为父组件，肯定想区别子组件中的几个插槽，那就要用slot标签的name属性来标识了，而父组件要决定在什么插槽里面放什么内容，就要将name的值赋值给slot属性传递给对应的插槽。如果slot没有name属性，就是匿名插槽了，而父组件中不指定slot属性的内容，就会被丢到匿名插槽中。

```
// 子组件
<template>
    <section>
        <slot name="article-title">这里放标题</slot>
        <slot>这里放作者</slot>
        <slot name="article-content">这里放文章内容</slot>
    </section>
</template>

// 父组件
<template>
    <section>
        <slot-child>
            <h1 slot="article-title">vue作用域插槽，你真的懂了吗？</h1>
            <p slot="article-content">好像有点懂了</p>
            <div>王五</div>
        </slot-child>
    </section>
</template>
```

- 最难理解的是作用域插槽。看了文档说明的朋友可能还会有点晕，大概是说在作用域插槽内，父组件可以拿到子组件的数据。子组件可以在slot标签上绑定属性值，如：

```
<slot :nickName="'Tusi'"></slot>
```

而父组件通过slot-scope绑定的对象下拿到nickName的值。 

```
<template>
    <section>
        <slot-child>
            <template slot-scope="scope">
                <div>{{scope.nickName}}</div>
            </template>
        </slot-child>
    </section>
</template>
```

这里大家应该都有疑问。这有什么用？我在子组件用$emit向父组件传递数据不就行了？

# 关于作用域插槽的一点理解

我觉得要从组件之间的数据流向来思考作用域插槽的应用场景。

> 假设第一个场景，需要你写一个商品卡片组件，并通过循环去展示多个卡片，并且要求能响应每个卡片上的图片或者其他内容的点击事件而跳转到商品详情页，你会怎么写？

![淘宝商品列表](http://qncdn.wbjiang.cn/%E6%B7%98%E5%AE%9D%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

我会使用如下的处理方式，首先将商品卡片写成一个组件Commodity.vue，而在CommodityList.vue中用一个v-for来处理商品卡片列表的展示。

```
<commodity v-for="(item,index) in commodities" @clickCommodity="onCommodityClick"></commodity>
```

Commodity组件通过$emit像父组件传递clickCommodity事件，并携带商品数据，父组件即可在onCommodityClick方法中得到数据，进行业务处理，这样便完成了一个基本的由子到父的数据传递。

> 如果再往上抽象一下呢？比如我有多个运营栏目，像淘宝首页有“有好货”，“爱逛街”这样两个栏目，每个栏目下都需要有一个商品卡片列表，那么商品卡片列表CommodityList.vue就要抽成组件了。而这个包含多个运营栏目的vue组件我假设它叫ColumnList.vue，在其中通过v-for调用了CommodityList组件。

![淘宝运营栏目列表](http://qncdn.wbjiang.cn/%E6%B7%98%E5%AE%9D%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8%E5%8A%A0%E8%BF%90%E8%90%A5%E6%A0%8F%E7%9B%AE.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

**注意**：业务来了，我希望把点击商品卡片的业务放在ColumnList.vue中处理。你们想象一下要怎么做？一种土办法就是商品按钮点击时，Commodity组件\$emit通知CommodityList.vue，而CommodityList接着把事件用\$emit往上抛，那么ColumnList.vue就能处理这个点击事件了。这样做完全没有问题，但是显得子组件很不纯粹，跟业务都扯上关系了。

那么如何优雅地解决这个问题呢？这个时候，作用域插槽真正派上用场了。

通过作用域插槽将本应该由CommodityList处理的商品卡片点击业务onCommodityClick提升到ColumnList处理。

```
<el-row :gutter="20">
        <el-col :span="12" v-for="(column, index) in columnList" :key="index">
            <el-card class="box-card card-column">
                <div slot="header" class="clearfix">
                    <span>{{column.columnName}}</span>
                </div>
                <commodity-list :commodities="column.commodityList">
                    <template slot-scope="scope">
                    <!-- 这里只需要给Commodity组件传入数据，响应Commodity组件的clickCommodity事件即可。
                        事件不必携带参数，完全符合父到子的数据流向，而不会发生子组件又给父组件反向发数据的情况 -->
                        <commodity :modityData="scope.row" @clickCommodity="onCommodityClick(scope.row)"></commodity>
                    </template>
                </commodity-list>
            </el-card>
        </el-col>
</el-row>
```

而CommodityList组件内部应该是改造成这样，slot接收来自父组件的商品卡片组件，这里面不涉及关于商品组件的业务，只关注其他业务和布局即可。最终就实现了组件和业务的剥离，这也是组件化的精髓所在吧。不知道有没有帮到您呢？

```
<el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
            <slot :row="item"></slot>
        </el-col>
</el-row>
```

这是我实现的效果，忽略样式吧，原理都懂了，做个漂亮的卡片有多难？
![淘宝运营栏目列表](http://qncdn.wbjiang.cn/%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD%E5%AE%9E%E7%8E%B0%E7%9A%84%E4%B8%89%E7%BA%A7%E7%BB%84%E4%BB%B6.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)
![淘宝运营栏目列表](http://qncdn.wbjiang.cn/%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD%E7%82%B9%E5%87%BB%E6%9F%90%E4%B8%80%E9%A1%B9.png?imageMogr2/auto-orient/blur/1x0/quality/75%7Cwatermark/2/text/d2JqaWFuZy5jbg==/font/5qW35L2T/fontsize/640/fill/IzQ5NzZEQg==/dissolve/90/gravity/SouthWest/dx/10/dy/10)

> 总结一下，作用域插槽适合的场景是至少包含三级以上的组件层级，是一种优秀的组件化方案！


------

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)