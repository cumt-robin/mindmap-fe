/**
 * 两数之和
 * 链接：https://leetcode-cn.com/problems/two-sum/
 * 题干：给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * 思路1：最简单粗暴的方法就是两层 for 循环来寻找两个数之和是 target 的组合，但是复杂度也到了 O(n2)。
 * 思路2：用一个 map 来记录每个数组元素与 target 相差的 diff 值以及元素的下标（diff 作为 map key, 下标作为 map value）。
 * 只要在遍历的时候能够通过 map.has 匹配到当前元素，就证明已经找到了配对的组合，返回两者的的下标即可，复杂度是 O(n)。
 * 用数组代替 map 也一样，不过 map 查询更简洁。
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