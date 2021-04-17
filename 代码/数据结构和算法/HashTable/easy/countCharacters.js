/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 18:27:26
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 19:36:39
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/find-words-that-can-be-formed-by-characters/

// function generateCountMap(arr) {
//     const map = {};
//     for (let i = 0; i < arr.length; i++) {
//         const val = arr[i];
//         if (map.hasOwnProperty(val)) {
//             map[val]++
//         } else {
//             map[val] = 1;
//         }
//     }
//     return map
// }

// 用Map还是快一点
function generateCountMap(arr) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        if (map.has(val)) {
            map.set(val, map.get(val) + 1)
        } else {
            map.set(val, 1);
        }
    }
    return map
}

/**
 * 需要依次核对每个单词
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function(words, chars) {
    let len = 0;
    // 首先把单词表变成一个计数的哈希表
    const charMap = generateCountMap(chars)

    for (let i = 0; i < words.length; i++) {
        // 检查每一个单词时，也要统计每个字母出现的次数
        const word = words[i]
        const wordMap = generateCountMap(word)
        let isValid = true;
        // 检查每一个字母是不是符合要求
        for (const [key, value] of wordMap) {
            if (!charMap.has(key) || value > charMap.get(key)) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            len += word.length
        }
    }
    return len;
};