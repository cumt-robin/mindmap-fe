/**
 * 有序数组的平方
 * 链接：https://leetcode-cn.com/problems/squares-of-a-sorted-array/
 * 题干：给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 * 思路：最简单粗暴的就是平方再排序，但是排序的复杂度是O(n2)的。
 * O(n)复杂度思路：由于是非递减顺序的，可以用双指针从首尾出发，依次检查，每次都 unshift 平方数最大的那个。
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares1 = function(nums) {
    return nums.map(item => Math.pow(item, 2)).sort((a, b) => a - b)
};

var sortedSquares2 = function(nums) {
    var len = nums.length
    var result = new Array(len)
    for (var i = 0, j = len - 1, pos = len - 1; i <= j;) {
        var s1 = nums[i] * nums[i]
        var s2 = nums[j] * nums[j]
        if (s1 >= s2) {
            result[pos--] = s1
            ++i;
        } else {
            result[pos--] = s2
            --j;
        }
    }
    return result;
};