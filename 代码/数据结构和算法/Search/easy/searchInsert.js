/*
 * @Author: 蒋文斌
 * @Date: 2021-04-19 19:51:35
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-20 10:22:26
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/search-insert-position/

/**
 * 对于有序的情况，二分查找搜索插入位置比较靠谱
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const middle = (left + right) >> 1
        const value = nums[middle]
        if (value === target) {
            return middle;
        } else if (value < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return left;
}

/**
 * 暴力解法，不可取
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let i = 0;
    for (; i < nums.length; i++) {
        if (nums[i] >= target) {
            return i;
        }
    }
    return i;
};