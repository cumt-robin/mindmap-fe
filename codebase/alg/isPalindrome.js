/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:32:52
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:33:11
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
    var reverseNumList = [];
    var tempNum = x;
    while(tempNum > 0) {
        var lastNum = tempNum % 10;
        reverseNumList.push(lastNum);
        tempNum = Math.floor(tempNum / 10);
    }
    var reversedValue = 0;
    for (var i = 0, len = reverseNumList.length; i < len; i++) {
        reversedValue += reverseNumList[i] * Math.pow(10, len - 1 - i)
    }
    return reversedValue === x;
};