
// https://leetcode-cn.com/problems/maximum-ascending-subarray-sum/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
    const len = nums.length;
    // 最大升序和
    let maxSum = nums[0];
    // 最新一组升序和
    let sum = maxSum;
    // 左右边界索引
    let left = 0, right = 1;
    for (; right < len; left++) {
        inner: for (j = right; j < len; j++) {
            if (nums[j] > nums[j - 1]) {
                sum += nums[j];
                right++;
            } else {
                // 如果出现了降序，需要判断是否更新最大和
                if (sum > maxSum) {
                    maxSum = sum;
                }
                left = j;
                right = j + 1;
                sum = nums[left];
                break inner;
            }
        }
    }
    // 最后还是比较一下最后一轮的和，与前面记录的最大和，哪一个更大
    return Math.max(maxSum, sum);
}