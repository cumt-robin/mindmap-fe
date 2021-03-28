/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 13:11:34
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:41:27
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/sum-of-all-odd-length-subarrays/

/**
 * 最开始还没想到算法模型，后面突然闪过一个滑动窗口的概念。不过性能还是很差，到了O(n3)了，而且求和还重新跑了一遍
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function(arr) {
    const list = [];
    for (let subLength = 1; subLength <= arr.length; subLength = subLength + 2) {
        // 利用滑动窗口找到连续子数组
        let startIndex = 0;
        while (startIndex + subLength - 1 < arr.length) {
            list.push(arr.slice(startIndex, startIndex + subLength))
            startIndex++;
        }
    }
    return list.reduce((prev, curr) => {
        return prev + curr.reduce((prev2, curr2) => {
            return prev2 + curr2
        }, 0)
    }, 0)
};

/**
 * 优化了一点点
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function(arr) {
    let sum = 0;
    for (let subLength = 1; subLength <= arr.length; subLength = subLength + 2) {
        // 利用滑动窗口找到连续子数组
        let startIndex = 0;
        while (startIndex + subLength - 1 < arr.length) {
            var slideWindow = arr.slice(startIndex, startIndex + subLength)
            sum += slideWindow.reduce((prev, curr) => {
                return prev + curr
            }, 0)
            startIndex++;
        }
    }
    return sum;
};

/**
 * 要想把O(n3)降低到O(n)，就只能遍历一次，所以要算出每个数在滑动窗口可能出现的次数，然后求和。
 * @param {number[]} arr
 * @return {number}
 */
 var sumOddLengthSubarrays = function(arr) {
    let sum = 0;
    const oddMax = arr.length % 2 === 0 ? arr.length - 1 : arr.length
    const oddLengthTypes = arr.length % 2 === 0 ? arr.length / 2 : arr.length / 2 + 1
    for (let index = 0; index < arr.length; index++) {
        const element = array[index];
        // 哈哈，不会做了
    }
    return sum;
};