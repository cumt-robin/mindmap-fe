/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 22:19:38
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 23:57:24
 * @Description: 长按键入
 */

// https://leetcode-cn.com/problems/long-pressed-name/

/**
 * 先计算 name 中每个字符按需重复的次数，然后遍历 typed，检查是否存在 name 的每一个字符，并且在重复次数这个指标上，要大于等于 name 中每一个字符
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
    const len1 = name.length, len2 = typed.length;
    // 先通过长度对比，把一些容易判断的场景筛掉
    if (len1 > len2) {
        return false;
    }
    
};