/*
 * @Author: 蒋文斌
 * @Date: 2021-03-14 15:14:16
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-14 18:50:27
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/

/**
 * 是解题的逻辑，但是递归爆栈了！！！可以考虑尾递归优化
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } else {
        return fib(n - 1) + fib(n - 2)
    }
};

/**
 * 尾递归优化，避免了调用栈的激增；这里的思路是把所有的已知量和每一步的运算结果带进去作为尾递归的参数。
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    function fibInner(n, a1, a2) {
        return n === 0 ? a1 : fibInner(n - 1, a2, (a1 + a2) % (1e9+7))
    }
    return fibInner(n, 0, 1)
};

/**
 * 记住前两个值，求和
 * 为啥取模是 1e9+7 ，没太懂？防止求和溢出，所以找一个32位内的较大质数
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0 || n === 1) {
        return n
    } else {
        var a1 = 0;
        var a2 = 1;
        var curr;
        for (var i = 2; i <= n; i++) {
            curr = (a1 + a2) % (1e9+7);
            a1 = a2;
            a2 = curr
        }
        return curr;
    }
};