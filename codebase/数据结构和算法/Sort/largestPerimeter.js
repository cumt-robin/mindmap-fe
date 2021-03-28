/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 12:00:45
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 12:06:14
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/largest-perimeter-triangle/

/**
 * 三角形任意两边之和要大于第三边
 * 思路：先排序，然后从最大的开始检测
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = nums.length - 1; i > 1; --i) {
        const [first, second, third] = [nums[i - 2], nums[i - 1], nums[i]]
        if (first + second > third) {
            return first + second + third
        }
    }
    return 0;
};