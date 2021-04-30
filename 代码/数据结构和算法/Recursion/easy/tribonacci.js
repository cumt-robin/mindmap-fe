/*
 * @Author: 蒋文斌
 * @Date: 2021-04-30 13:32:10
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-30 23:49:06
 * @Description: 第 N 个泰波那契数
 */

// https://leetcode-cn.com/problems/n-th-tribonacci-number/

/**
 * 可以利用缓存
 * 0 1 1 2 4 7 11
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    if (n === 0) {
        return 0
    } else if (n === 1 || n === 2) {
        return 1;
    } else {
        let [x, y, z] = [0, 1, 1]
        // 循环从T3开始，计算到Tn，每一步都可以利用前面缓存的值计算
        for (let i = 3; i <= n; i++) {
            [x, y, z] = [y, z, x + y + z]
        }
        return z;
    }
};

/**
 * 直接递归，内存爆了
 * T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    if (n === 0) {
        return 0
    } else if (n === 1 || n === 2) {
        return 1;
    } else {
        return tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1)
    }
};