
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
    // 接下来要根据数量升序排序，对于数量相同的，还要根据原始值的大小降序排序。
    // 我的思路是将数量去重，按数量升序排列，再遍历map，将每个element归纳到对应的数量所属的分组。
    // 分组完毕后，对每一组数量超过1个的进行降序排列，最后把分组聚合。
    const counts = [...new Set(map.values())]
    counts.sort((a, b) => a - b);
    const groups = new Array(counts.length);
    for (const [element, count] of map.entries()) {
        const countIndex = counts.findIndex(item => item === count)
        if (!groups[countIndex]) {
            groups[countIndex] = [];
        }
        groups[countIndex].push(element)
    }
    let startIndex = 0;
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const count = counts[i]
        if (group.length > 1) {
            // 降序排列
            group.sort((a, b) => b - a)
        }
        for (let j = 0; j < group.length; j++) {
            const element = group[j];
            for (let k = startIndex; k < startIndex + count; k++) {
                nums[k] = element
            }
            startIndex += count;
        }
    }
    return nums;
};