/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:34:21
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:34:36
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    var map = new Map();
    for (var i = 0, len = nums.length; i < len; i++) {
        const diff = target - nums[i]
        if (map.has(diff)) {
            return [map.get(diff), i]
        }
        map.set(nums[i], i)
    }
};