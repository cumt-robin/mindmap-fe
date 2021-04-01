
// https://leetcode-cn.com/problems/sort-array-by-increasing-frequency/

/**
 * 看到这种题目，第一反应就是用Map计数
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function(nums) {
    const map = new Map();
    for (let i = nums.length - 1; i >= 0; --i) {
        const element = nums[i];
        map.set(element, (map.get(element) || 0) + 1)
    }
    // 接下来要根据数量排序，然后反查到element？明天继续
};