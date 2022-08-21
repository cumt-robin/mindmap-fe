/**
 * 每日温度
 * 链接：https://leetcode.cn/problems/daily-temperatures
 * 题干：给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 * 思路：第一反应就是两层 for 循环进行比较，检查后续的高温出现在哪个下标。这里有一个小技巧，是 new 一个固定长度的数组，并默认 fill 0。
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