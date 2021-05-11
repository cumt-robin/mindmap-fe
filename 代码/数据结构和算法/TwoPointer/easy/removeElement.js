
// https://leetcode-cn.com/problems/remove-element/

/**
 * 发现还是要用 removeDuplicates 的思路，left, right 双指针，left 用来计数并且重写数组
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let left = 0, len = nums.length;
    for (let right = 0; right < len; right++) {
        if (nums[right] !== val) {
            // 遇到值不等于 val 的，才计数
            nums[left] = nums[right];
            left++;
        }
    }
    nums.length = left;
    return left;
}

/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 用splice虽然解决了，但是时间复杂度贼垃圾
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for (let i = 0, j = nums.length - 1; i <= j; i++, j--) {
        if (nums[j] === val) {
            nums.splice(j, 1)
        }
        if (nums[i] === val) {
            nums.splice(i, 1)
            i--;
            j--;
        }
    }
    return nums.length;
};