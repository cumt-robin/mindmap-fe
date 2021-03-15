/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 23:29:13
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-15 14:07:19
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/can-place-flowers/

/**
 * 边界情况考虑太多了，人都傻了，不过竟然和官方解法思路一致，分区间求解，好处是没有改变原数组。
 * 其实可以聚焦于每一个坑位能不能种，看下面的解法
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    var startIndex = -1;
    var count = 0;
    for (let index = 0; index < flowerbed.length; index++) {
        if (flowerbed[index] === 1) {
            if (startIndex === -1) {
                // 第一次遇到1，检查前面能不能种，能种几颗
                var gap = index - startIndex;
                count += Math.floor(gap / 2);
            } else {
                // 检查两个1中间能种几颗
                var gap = index - startIndex - 1;
                if (gap > 2) {
                    count += Math.ceil((gap - 2) / 2);
                }
            }
            startIndex = index;
        } else if (index === flowerbed.length - 1) {
            // 到了最后还是0，检查距离上一个1有几个空位，到最后还能种几颗
            var gap = index - startIndex;
            count += Math.floor(gap / 2);
        }
    }
    // 还有可能从未出现过1
    if (startIndex === -1) {
        count = 1 + Math.floor((flowerbed.length - 1) / 2);
    }
    return count >= n;
};

// 查询太费时，也改变了原数组
var canPlaceFlowers = function (flowerbed, n) {
    flowerbed.push(0);
    flowerbed.unshift(0);
    for (let index = 0; index < flowerbed.length; index++) {
        if (flowerbed[index - 1] === 0 && flowerbed[index] === 0 && flowerbed[index + 1] === 0) {
            flowerbed[index] = 1;
            n--;
        }
    }
    return n <= 0;
};
