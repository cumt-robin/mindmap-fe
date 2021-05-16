/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 20:06:07
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 21:11:55
 * @Description: 移动零
 */

// https://leetcode-cn.com/problems/move-zeroes/

/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 遍历，遇到不是 0 的，就赋值给前面的索引处
 * 执行用时：84 ms, 在所有 JavaScript 提交中击败了93.49%的用户
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    let i = 0, j = 0, len = nums.length;
    for (let i = 0; i < len; i++) {
        const item = nums[i];
        if (item !== 0) {
            nums[j++] = item;
        }
    }
    for (; j < len; j++) {
        nums[j] = 0;
    }
};