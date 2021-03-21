/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 13:06:46
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 16:43:49
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/

/**
 * 这题安排在hashtable的标签下，感觉有点勉强。
 * 两层for循环是比较简单的，但是时间复杂度略高。
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    const result = []
    for (let i = 0; i < nums.length; i++) {
        const a = nums[i];
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            const b = nums[j];
            if (b < a) {
                count++;
            }
        }
        result.push(count)
    }
    return result;
};