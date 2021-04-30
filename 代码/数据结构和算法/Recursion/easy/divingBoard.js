/*
 * @Author: 蒋文斌
 * @Date: 2021-04-27 08:27:56
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-30 13:30:29
 * @Description: 跳水板
 */

// https://leetcode-cn.com/problems/diving-board-lcci/

/**
 * 使用k块板子，返回可能的长度，从小到大排列
 * 思路是优先用短的，直到短的为0
 * 用while循环就行了，有时候不一定要递归的
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function(shorter, longer, k) {
    if (k === 0) {
        return []
    }
    if (shorter === longer) {
        return [shorter * k]
    }
    let n = k;
    const result = [];
    while(n >= 0) {
        result.push(shorter * n + longer * (k - n))
        n--;
    }
    return result
};