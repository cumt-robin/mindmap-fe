/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 19:33:41
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-14 19:36:23
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/three-consecutive-odds/

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function(arr) {
    var count = 0, i = 0;
    while (i < arr.length && count < 3) {
        if (arr[i] % 2 === 1) {
            count++;
        } else {
            count = 0;
        }
        i++;
    }
    return count === 3;
};