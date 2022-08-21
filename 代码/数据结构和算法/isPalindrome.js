/**
 * 回文数
 * 链接：https://leetcode-cn.com/problems/palindrome-number/
 * 概念：回文数是指正序和倒序读，值都一样的数字
 * 思路1：最简单的办法就是先转为字符串，然后for循环中使用双指针比较。
 * 思路2：如果用纯数字的解决方法，可以通过 mod 10 求出倒序的每一位的值，放进数组中，再从数组末尾开始循环，依次乘以10的n-1次方
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
    for (var len = reverseNumList.length, i = len - 1; i >= 0; i--) {
        reversedValue += reverseNumList[i] * Math.pow(10, len - (i + 1))
        
    }
    return reversedValue === x;
};

/**
 * 字符串双指针解法
 */
var isPalindrome2 = function(x) {
    var str = x + '';
    for (var i = 0, j = str.length - 1; i <= j; i++,j--) {
        if (str[i] !== str[j]) {
            return false;
        }
    }
    return true;
}