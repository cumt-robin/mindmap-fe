/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 17:51:01
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 18:01:54
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/single-number/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    var map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (map.has(val)) {
            map.set(val, map.get(val) + 1)
        } else {
            map.set(val, 1)
        }
    }
    var keys = map.keys();
    var next = keys.next()
    while (map.get(next.value) !== 1 && next.done === false) {
        next = keys.next()
    }
    return next.value;
};