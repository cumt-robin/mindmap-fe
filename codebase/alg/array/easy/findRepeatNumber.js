/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 21:59:18
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 22:01:26
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    var map = {}
    for (let index = 0; index < nums.length; index++) {
        var element = nums[index];
        if (map[element]) {
            return element
        } else {
            map[element] = 1
        }
    }
};