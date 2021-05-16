/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 21:19:43
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 22:06:00
 * @Description: 反转字符串中的元音字母
 */

// https://leetcode-cn.com/problems/reverse-vowels-of-a-string/

/**
 * 这一题第一问是：元音字母有哪些？哈哈
 * a e i o u
 * 我的思路是先选出元音字母所在索引，然后用双指针交换位置
 * @param {string} s
 * @return {string}
 */
 var reverseVowels = function(s) {
    const len = s.length;
    const arr = new Array(len);
    const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    const vowelIndexs = [];
    for (let i = 0; i <= len; ++i) {
        // 先把位置填好值，后面再交换
        arr[i] = s[i]
        if (vowels.includes(s[i])) {
            vowelIndexs.push(i)
        }
    }
    for (let i = 0, j = vowelIndexs.length - 1; i < j; ++i, --j) {
        const leftIndex = vowelIndexs[i];
        const rightIndex = vowelIndexs[j];
        [arr[leftIndex], arr[rightIndex]] = [arr[rightIndex], arr[leftIndex]]
    }
    return arr.join("")
};