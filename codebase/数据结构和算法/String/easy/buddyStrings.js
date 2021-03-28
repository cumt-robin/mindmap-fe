/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 11:18:46
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 12:56:11
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/buddy-strings/

function isRepeatString(s) {
    if (s.length <= 1) {
        return true;
    }
    let firstChar = s[0]
    for (let i = 1; i < s.length; i++) {
        if (s[i] !== firstChar) {
            return false;
        }
    }
    return true;
}

function isCharRepeated(s) {
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map.has(char)) {
            return true;
        } else {
            map.set(char, 1)
        }
    }
    return false;
}

/**
 * 亲密字符串，说实话题目出得有点垃圾，最多交换几次也不说。
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var buddyStrings = function(a, b) {
    if (a.length !== b.length) {
        // 如果字符串长度不同，肯定不是
        return false;
    }
    // 否则，题目要求至少交换一次，也只能交换一次。
    // 分情况讨论，如果a和b全等，那么最少要存在两个相同字母，这样交换一下，就还是原来的字符串
    if (a === b) {
        return isCharRepeated(a);
    }
    // 否则，找到不同之处
    const diffIndexs = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diffIndexs.push(i)
        }
    }
    // 如果出现了2处以上不同，说明是不可以的，因为最多只交换1次
    if (diffIndexs.length > 2) {
        return false;
    }
    // 仅有两处及以下，可以进行比较
    return a[diffIndexs[0]] === b[diffIndexs[1]] && a[diffIndexs[1]] === b[diffIndexs[0]]
};