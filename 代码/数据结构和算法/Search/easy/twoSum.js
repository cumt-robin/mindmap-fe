/*
 * @Author: 蒋文斌
 * @Date: 2021-04-22 21:27:49
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-22 22:15:27
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/

function binarySearch(arr, left, right, target) {
    while(left <= right) {
        const middle = (left + right) >> 1, middleValue = arr[middle], nextValue = arr[middle + 1]
        if (middleValue <= target && nextValue > target) {
            return middle;
        } else if (middleValue < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return right;
}

/**
 * 如果两数a, b之和是target，那么a, b肯定分别位于 target >> 1 两侧，并且 b < target
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    // 首先利用二分找出区间。
    const len = numbers.length;
    let left = 0, right = len - 1;
    const targetNearestIndex = binarySearch(numbers, left, right, target);
    const halfValue = target >> 1;
    const halfNearestIndex = binarySearch(numbers, left, targetNearestIndex, halfValue)
    // 再从区间遍历
    for (let i = 0; i <= halfNearestIndex; i++) {
        const leftValue = numbers[i]
        for (let j = halfNearestIndex + 1; j <= targetNearestIndex; j++) {
            const rightValue = numbers[j];
            if (leftValue + rightValue === target) {
                return [i + 1, j + 1]
            }
        }
    }
};