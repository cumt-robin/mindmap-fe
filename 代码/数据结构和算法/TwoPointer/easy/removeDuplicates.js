
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/

/**
 * 用两个指针 i 和 j，一个指针 i 往前面走，每次循环都与前一个元素对比，遇到不重复的元素时，通过另一个指针 j 重设 nums[j] 的值为 nums[i]，然后 j 自增 1；其实 j 就代表不重复的数量。
 * 最后注意把 nums.length 设为 j，裁剪掉后面的部分。
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
    const len = nums.length;
    let j = 0;
    for (let i = 0; i < len; ++i) {
        if (nums[i] !== nums[i - 1]) {
            nums[j++] = nums[i];
        }
    }
    nums.length = j;
    return j;
};

/**
 * 删除有序数组中的重复项，要求原地修改，不另外使用数组空间
 * 双指针可以同时搜索
 * 一波操作猛如虎，结果成绩百分五
 * 我忽略了细节，问题说的是有序数组，我给当成无序的在这处理了
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        const ele = nums[i];
        for (let j = i + 1, k = nums.length - 1; j <= k; j++, k--) {
            // 不要const right = nums[k]这样缓存值，否则会错误地删除元素
            if (nums[k] === ele) {
                // 从右侧splice是没有副作用的
                nums.splice(k, 1)
            }
            if (nums[j] === ele) {
                // 从左侧splice是有副作用的，需要修正j和k的值。
                nums.splice(j, 1)
                j--;
                k--;
            }
        }
    }
    return nums.length;
};