/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:38:18
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:39:01
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/find-majority-element-lcci/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
    if (nums.length === 1) {
        return nums[0]
    } else if (nums.length === 2) {
        return nums[0] === nums[1] ? nums[0] : -1
    }
    var map = {};
    for (var i = 0; i < nums.length; i++) {
        var value = nums[i]
        if (!map[value]) {
            map[value] = 1;
        } else {
            map[value]++;
        }
        if (map[value] > nums.length / 2) {
            return value;
        }
    }
    return -1;
};