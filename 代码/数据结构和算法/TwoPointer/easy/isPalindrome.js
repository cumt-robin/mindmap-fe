/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 12:33:22
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 13:10:51
 * @Description: 验证回文串
 */

// https://leetcode-cn.com/problems/valid-palindrome/

/**
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase()
    if (s.length <= 1) {
        return true;
    }
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        if (s[i] !== s[j]) {
            return false;
        }
    }
    return true;
};