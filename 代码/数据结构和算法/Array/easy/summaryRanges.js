/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 23:26:38
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-15 21:04:07
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/summary-ranges/

/**
 * 没看懂题目，干得漂亮！
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    if (nums.length === 1) {
        return ["" + nums[0]];
    }
    var prev = nums[0];
    var start = prev;
    var curr = null;
    var results = [];
    for (let index = 1; index < nums.length; index++) {
        curr = nums[index];
        prev = nums[index - 1];
        if (curr - prev > 1) {
            // 出现了断点
            if (prev === start) {
                // 并且发现上一个就是起点，说明是一个单点区间
                results.push("" + start);
            } else {
                // 取start到prev作为一个区间
                results.push(start + "->" + prev);
            }
            if (index === nums.length - 1) {
                // 出现了断点，同时也到了最后一个，说明最后一个是一个单点区间
                results.push("" + curr);
            }
            // 更新起点
            start = curr;
        } else if (index === nums.length - 1) {
            // 连续但是已经到了最后
            results.push(start + "->" + curr);
        }
    }
    return results;
};
