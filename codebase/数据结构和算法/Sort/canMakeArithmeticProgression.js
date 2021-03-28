/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 10:51:56
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 10:59:14
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/can-make-arithmetic-progression-from-sequence/

/**
 * 先排序，再根据第0个元素和第1个元素求得差值diff，接着比较后续相邻元素的差值，只要不等于diff，就return false；循环结束后，return true。
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function(arr) {
    const n = arr.length
    arr.sort((a, b) => a - b);
    let diff = arr[1] - arr[0];
    for (let i = 2; i < n; i++) {
        if (arr[i] - arr[i - 1] !== diff) {
            return false;
        }
    }
    return true;
};