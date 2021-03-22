/*
 * @Author: 蒋文斌
 * @Date: 2021-03-22 17:39:44
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-22 18:35:59
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/number-of-good-pairs/

/**
 * 如果数组中某两个元素的值一样，则认为是好数对，并且要求两个元素的下标有升序关系i < j
 * 所以，对于每一个元素，只要检查其后面的元素即可。
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    var count = 0;
    for (let i = 0; i < nums.length; i++) {
        const val1 = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            const val2 = nums[j];
            if (val2 === val1) {
                count++;
            }
        }
    }
    return count;
};

// 另一个思路，先用Map统计每个数出现的字数，然后求组合C(n, 2)
var numIdenticalPairs = function(nums) {
    var map = new Map()
    var result = 0;
    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (map.has(val)) {
            map.set(val, map.get(val) + 1)
        } else {
            map.set(val, 1)
        }
    }
    for (const count of map.values()) {
        if (count > 1) {
            result += (count * (count - 1)) / 2
        }
    }
    return result;
};