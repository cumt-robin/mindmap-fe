/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 20:44:06
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 20:44:17
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/

/**
 * 大的数组用Map计数，从小的数组开始遍历，遇到相同的push进结果中，并且Map计数-1
 * 思路比较简单，但是提交成绩不佳，时间复杂度优于39.1%的用户，空间复杂度只优于14.3%的用户
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    const [min, max] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
    const map = new Map();
    const result = [];
    for (let i = max.length - 1; i >= 0; --i) {
        const element = max[i];
        map.set(element, (map.get(element) || 0) + 1)
    }
    for (let i = min.length - 1; i >= 0; --i) {
        const element = min[i];
        let count = map.get(element)
        if (count > 0) {
            result.push(element)
            if (--count > 0) {
                map.set(element, count)
            } else {
                map.delete(element)
            }
        }
    }
    return result;
};