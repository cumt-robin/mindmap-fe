/**
 * 主要元素
 * 链接：https://leetcode-cn.com/problems/find-majority-element-lcci/
 * 题干：数组中占比超过一半的元素称之为主要元素。给你一个 整数 数组，找出其中的主要元素。若没有，返回 -1 。请设计时间复杂度为 O(N) 、空间复杂度为 O(1) 的解决方案。
 * 思路：用一个 map 来记录，key 是数组元素，value 是数组元素出现的次数。
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    var map = new Map()
    for (var i = 0, len = nums.length; i < len; i++) {
        var value = nums[i]
        if (map.has(value)) {
            // 如果存在，数量+1
            map.set(value, map.get(value) + 1)
        } else {
            // 不存在，数量赋值为1
            map.set(value, 1)
        }
        if (map.get(value) > nums.length / 2) {
            // 如果超过一半，返回 value
            return value
        }
    }
    return -1
}