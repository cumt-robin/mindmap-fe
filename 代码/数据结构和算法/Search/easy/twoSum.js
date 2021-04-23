/*
 * @Author: 蒋文斌
 * @Date: 2021-04-22 21:27:49
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-23 09:02:10
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/

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
            if (middleValue === b) {
                // 最终要返回的下标是从1开始的，而我们遍历是从0开始，所以这里+1
                return [i + 1, middle + 1]
            } else if (middleValue < b) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
    }
};