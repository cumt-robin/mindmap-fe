/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 11:10:03
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 11:17:51
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/generate-a-string-with-characters-that-have-odd-counts/

/**
 * 这道题解太多了，感觉只要用a和b拼接就行了啊
 * 一开始想着用array fill再join，发现挺麻烦的。
 * @param {number} n
 * @return {string}
 */
var generateTheString = function(n) {
    if (n % 2 === 0) {
        return new Array(n - 1).fill('a').join('') + 'b'
    } else {
        return new Array(n).fill('a').join('')
    }
};

// 原来字符串还有repeat方法可以用，哈哈，孤陋寡闻了！
var generateTheString = function(n) {
    if (n % 2 === 0) {
        return 'a'.repeat(n - 1) + 'b'
    } else {
        return 'a'.repeat(n)
    }
};