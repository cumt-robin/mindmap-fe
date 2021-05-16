/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 21:13:24
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 21:18:02
 * @Description: 反转字符串
 */

// https://leetcode-cn.com/problems/reverse-string/

/**
 * 条件给的是字符串数组，这就有了按索引修改的能力，否则字符串本身是不能按索引修改的。
 * 哈哈，靠着这种简单的来找自信了！
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
 var reverseString = function(s) {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        const temp = s[j];
        s[j] = s[i];
        s[i] = temp;
    }
};