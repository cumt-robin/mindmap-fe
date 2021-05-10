
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/

/**
 * 用快慢指针来解决它
 * @param {*} nums 
 */
var removeDuplicates = function(nums) {
    const len = nums.length;
    if (len === 0) {
        return 0
    }
    let fast = 1, slow = 1;
    while(fast < len) {
        // fast每次都+1，slow只在出现差异值时+1，用于统计不同值的数量
        if (nums[fast] !== nums[fast - 1]) {
            // 用slow来做没有重复的数组赋值
            nums[slow] = nums[fast]
            ++slow;
        }
        ++fast;
    }
    // 最终通过改变数组length来实现裁剪
    nums.length = slow;
    // 返回长度
    return slow;
}

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