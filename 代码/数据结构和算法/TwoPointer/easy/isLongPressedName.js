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
    let checkIndex = 0;
    let checkIndex2 = 0;
    let repeat = 0;
    // 问题是最后一波repeat统计完了，就出循环了。。。
    for (let i = checkIndex; i < len1; i++) {
        if (name[i] === name[checkIndex]) {
            repeat++;
        } else {
            // 出现了不同，检查 typed
            inner: for (let j = checkIndex2, repeat2 = 0; j < len2; j++) {
                if (name[checkIndex] === typed[j]) {
                    repeat2++;
                } else if (repeat2 < repeat) {
                    return false;
                } else {
                    // repeat2 >= repeat，满足条件，继续
                    repeat = 0;
                    checkIndex2 = j;
                    checkIndex = i--;
                    // 外循环正常执行，会发生 i++，所以要用 i--处理一下
                    // 跳出内循环，此时未执行 j++
                    break inner;
                }
            }
        }
    }
    return repeat === 0;
};