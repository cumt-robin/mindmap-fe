/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 19:39:45
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-22 17:38:02
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/happy-number/

function splitNumer(num) {
    var result = [];
    var rest;
    while (num >= 10) {
        rest = num % 10;
        num = Math.floor(num / 10);
        result.push(rest)
    }
    result.push(num)
    return result;
}

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    // 准备一个求值的集合，用于检测死循环，返回false；如果求值得到了1，则返回true
    var calcMap = new Map();
    // 写一个拆数值的方法
    var nums;
    while (n !== 1) {
        if (calcMap.has(n)) {
            return false;
        }
        calcMap.set(n, 1)
        nums = splitNumer(n);
        n = nums.reduce((prev, curr) => {
            return prev + Math.pow(curr, 2)
        }, 0)
    }
    return true;
};