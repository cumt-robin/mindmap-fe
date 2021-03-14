/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:39:38
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:39:53
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/squares-of-a-sorted-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
    return nums.map(item => Math.pow(item, 2)).sort((a, b) => a - b)
};