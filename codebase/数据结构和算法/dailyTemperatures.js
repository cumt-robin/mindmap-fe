/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:33:43
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:33:59
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/daily-temperatures/

/**
 * @param {number[]} T
 * @return {number[]}
 */
 var dailyTemperatures = function(T) {
    const res = new Array(T.length).fill(0);
    for (let i = 0; i < T.length; i++) {
        for (let j = i + 1; j < T.length; j++) {
            if (T[j] > T[i]) {
                res[i] = j - i;
                break;
            }  
        }  
    }
    return res;
};