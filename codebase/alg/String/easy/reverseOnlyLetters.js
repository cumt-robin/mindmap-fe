/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 12:59:44
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 14:15:11
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/reverse-only-letters/

function isLetter(char) {
    const ascii = char.charCodeAt();
    return (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)
}

/**
 * 我的思路是，先把字符串分隔为数组splits。
 * 然后用ASCII码判断，把字母部分挑出来，得到字母数组letters。
 * 再遍历splits，如果当前位置是字母，从letters尾部取出来一个字母，替换之。
 * 最后返回splits.join("")
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
    var splits = S.split('')
    var letters = splits.filter(isLetter)
    let startIndex = letters.length - 1
    splits.forEach((char, index, arr) => {
        if (isLetter(char)) {
            arr[index] = letters[startIndex]
            startIndex--;
        }
    });
    return splits.join("")
};