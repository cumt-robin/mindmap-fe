/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 19:38:33
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-14 22:30:42
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/contains-duplicate-ii/

/**
 * 用Map来存储并进行判断，数组的值作为map的键，而索引作为map的值
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    var map = new Map();
    for (let index = 0; index < nums.length; index++) {
        const val = nums[index];
        if (!map.has(val)) {
            map.set(val, index)
        } else {
            var lastIndex = map.get(val);
            if (index - lastIndex <= k) {
                return true;
            } else {
                map.set(val, index)
            }
        }
    }
    return false;
};