
// https://leetcode-cn.com/problems/intersection-of-two-arrays/

/**
 * 击败96%的答案，还是可以的
 * 思路是Set去重，然后遍历数量小的那个Set，检查大的Set中有没有这个元素，有的话，push到结果中。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    let min = new Set(nums1);
    let max = new Set(nums2);
    if (min.size > max.size) {
        let temp = min;
        min = max;
        max = temp;
    }
    const results = [];
    for (const element of min.values()) {
        if (max.has(element)) {
            results.push(element)
        }
    }
    return results;
};