在老家过完粽子节，回到工作地又可以一脸开(无)心(奈)地刷leetcode了。今天的题目是每日温度，给定一个温度数组，求解的目标是算出某一天需要等待几天才能超过该天的温度。

<!-- more -->

# 每日温度

请根据每日气温列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用`0`来代替。

例如，给定一个列表`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是`[1, 1, 4, 2, 1, 1, 0, 0]`。

提示：气温列表长度的范围是`[1, 30000]`。每个气温的值的均为华氏度，都是在`[30, 100]`范围内的整数。


## 两层循环判断

整体思路是，利用两层`for`循环，判断每个温度之后是否有更高的温度。要注意，第一层`for`循环到最后一个元素时，是不会进入第二层`for`循环的。此时直接通过`push`方法把`0`塞入数组。

```javascript
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    var result = [];
    for(var i = 0, len = T.length; i < len; i++) {
        if (i == len - 1) {
            result.push(0);
        } else {
            var currValue = T[i];
            var waitDay = 0;
            inner: for (var j = i + 1, len = T.length; j < len; j++) {
                if (T[j] > currValue) {
                    waitDay = j - i;
                    break inner;
                }
            }
            result.push(waitDay)
        }
    }
    return result;
};
```

执行结果是：

内存占用45.8M，超过100%用户？

执行时间924ms，竟然只超过了20.19%的用户。

## 考虑边界

考虑温度的边界，如果当前温度是100，那肯定就不用进第二层循环了。

```javascript
var dailyTemperatures = function(T) {
    var result = [];
    for(var i = 0, len = T.length; i < len; i++) {
        var currValue = T[i];
        if (currValue === 100) {
            result.push(0); 
        } else if (i == len - 1) {
            result.push(0);
        } else {
            var waitDay = 0;
            inner: for (var j = i + 1, len = T.length; j < len; j++) {
                if (T[j] > currValue) {
                    waitDay = j - i;
                    break inner;
                }
            }
            result.push(waitDay)
        }
    }
    return result;
};
```

## new Array & fill

提交解法后，我看了一下第一名的解法，还是学到了一点东西。

主要有两个地方不太一样：

- 一个是使用`new Array`预先声明好数组空间，在大数组时性能表现更佳；
- 第二个是使用了`Array.prototype.fill`预填充`0`，所以也不需要判断是否需要进第二层循环。

```javascript
var dailyTemperatures = function(T) {
    const res = new Array(T.length).fill(0);
    for (let i = 0; i < T.length; i++) {
        for (let j = i + 1; j < T.length; j++) {
            if (T[j] > T[i]) {
                res[i] = j - i;
                break;
            }  
        }  
    }
    return res;
};
```

特意对比了一下`fill`和`push`的执行时间，原来`fill`的性能挺好的。

```javascript
console.time('fill计时');
var a = new Array(100).fill(0);
console.timeEnd('fill计时');
// fill计时: 0.009033203125ms

console.time('push计时');
a.push(0);
a.push(0);
a.push(0);
// 此处省略97行a.push(0);特意没有用for循环，毕竟循环也是要开销的。
console.timeEnd('push计时');
// push计时: 0.02001953125ms
```

如果给数组初始化1000个值为0的元素呢？不得不说，数据量越大，`fill`性能越好。

```javascript
// fill计时: 0.01220703125ms
// push计时: 0.136962890625ms
```

再看了看`fill`的兼容性，我只想说，在LeetCode中别怕，给我用最新的特性，IE不兼容的`fill`都可以用上。

![fill兼容性](http://qncdn.wbjiang.cn/fill%E5%85%BC%E5%AE%B9%E6%80%A7.png)

最后再把第一名的代码放上去提交一遍，尼玛，啪啪打脸。

![打脸](http://qncdn.wbjiang.cn/%E6%AF%8F%E6%97%A5%E6%B8%A9%E5%BA%A6%E7%94%A8%E4%BA%86%E7%AC%AC%E4%B8%80%E5%90%8D%E7%9A%84%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%9C%E6%89%93%E8%84%B8.png)

同样的代码人家执行耗时`132ms`，我这里提交就是执行耗时`872ms`。我只想问，LeetCode执行用时是怎么算出来的？

不过有一说一，第一名的解法确实性能更好，写法也很优雅，值得学习。

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)