/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 20:20:05
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:26:56
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/maximum-product-of-three-numbers/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    nums.sort((a, b) => a - b);
    return Math.max(nums[nums.length - 1] * nums[nums.length - 2] * nums[nums.length - 3], nums[0] * nums[1] * nums[nums.length - 1])
};