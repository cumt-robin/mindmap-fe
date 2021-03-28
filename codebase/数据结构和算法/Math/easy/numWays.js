/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 18:16:33
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-14 18:50:56
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/

/**
 * 青蛙跳台阶找规律其实与斐波那契数列一致
 * 因为跳到第N阶其实是两个子问题的集合，青蛙跳到第N阶前面一步肯定是跳到第N-1或者N-2，因为它每一次只能跳1步或2步。
 * 那么只要确定了N-1和N-2的所有解法，就相当于求得了问题的解，因为最后一个步骤是没得选的。
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        var a1 = 1;
        var a2 = 1;
        var curr;
        for (let index = 2; index <= n; index++) {
            curr = (a1 + a2) % (1e9 + 7);
            a1 = a2;
            a2 = curr;
        }
        return curr;
    }
};

// 尾递归
var numWays = function (n) {
    function innerFib(n, a1, a2) {
        return n === 0 ? a1 : innerFib(n - 1, a2, (a1 + a2) % (1e9 + 7));
    }
    return innerFib(n, 1, 1);
};

// 动态规划，还没学会
var numWays = function (n) {};
