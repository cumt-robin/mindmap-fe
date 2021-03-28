/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 10:30:44
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 10:50:50
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/shuffle-string/

/**
 * 用的map，for循环也执行了两次，性能不是很好
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function(s, indices) {
    const length = indices.length;
    const map = new Map();
    let result = ''
    for (let i = 0; i < length; i++) {
        const indice = indices[i];
        map.set(indice, s[i])
    }
    for (let i = 0; i < length; i++) {
        result += map.get(i)
    }
    return result;
};

// 这种解法性能超过65以上的答案
var restoreString = function(s, indices) {
    const length = indices.length;
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[indices[i]] = s[i]
    }
    return result.join("");
};