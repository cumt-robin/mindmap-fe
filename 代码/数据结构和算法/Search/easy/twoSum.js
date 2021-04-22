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
 * 先确定一个值a，再从剩下的值里面二分查找target - a
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    for (let i = 0, len = numbers.length; i < len - 1; i++) {
        const b = target - numbers[i];
        let left = i + 1, right = len - 1;
        while(left <= right) {
            const middle = (left + right) >> 1, middleValue = numbers[middle]
            if (middle === b) {
                return [i + 1, middle + 1]
            } else if (middle < b) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
    }
};