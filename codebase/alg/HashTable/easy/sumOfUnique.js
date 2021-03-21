/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 17:34:20
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 17:48:18
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/sum-of-unique-elements/

/**
 * 先统计每个值出现的次数，最后求和的时候只算出现过1次的
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function(nums) {
    var map = {}
    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (map.hasOwnProperty(val)) {
            map[val]++
        } else {
            map[val] = 1;
        }
    }
    var result = 0;
    Object.keys(map).forEach(key => {
        const count = map[key];
        if (count === 1) {
            result += +key
        }
    });
    return result
};