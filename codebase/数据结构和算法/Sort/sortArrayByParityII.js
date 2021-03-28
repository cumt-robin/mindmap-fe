/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 12:26:41
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 12:48:20
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/sort-array-by-parity-ii/

/**
 * 判断自身位置是否合理，不合理则交换
 * 解法超过了90%以上的答案
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function(nums) {
    // 当前位置是否应该是偶数下标位置
    let isEven = false;
    for (let i = nums.length - 1; i >= 0; --i, isEven = !isEven) {
        const element = nums[i];
        if ((isEven && element % 2 === 0) || (!isEven && element % 2 === 1)) {
            // 如果自身位置是合理的，就不处理
            continue;
        }
        // 否则，找到一个可以和自己换位置的，然后交换
        for (let j = i - 1; j >= 0; --j) {
            const checkElement = nums[j]
            if ((isEven && checkElement % 2 === 0) || (!isEven && checkElement % 2 === 1)) {
                // 找到了，交换
                nums[i] = checkElement
                nums[j] = element;
                break;
            }
        }
    }
    return nums;
};