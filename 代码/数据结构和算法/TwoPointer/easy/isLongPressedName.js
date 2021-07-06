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
    let repeat2 = 0;
    for (let i = checkIndex; i <= len1; i++) {
        // 用一个 <= 是为了统计完最后一个后，不要直接出循环，而是接着去比较 typed。
        if (name[i] === name[checkIndex]) {
            repeat++;
        } else {
            // 出现了不同，检查 typed
            inner: for (let j = checkIndex2; j <= len2; j++) {
                // 这里 <= 也是一样的，不要直接出了循环，而是继续查看是不是满足条件了。
                if (name[checkIndex] === typed[j]) {
                    repeat2++;
                } else if (repeat2 < repeat) {
                    return false;
                } else {
                    // repeat2 >= repeat，满足条件，此时判断 j 是不是走完了
                    if (j === len2) {
                        // 如果 j 走完了
                        if (i < len1) {
                            // 如果 i 还没完，说明 typed 没有覆盖 name
                            return false;
                        } else {
                            // 否则就是覆盖了的
                            return true;
                        }
                    } else if (i === len1) {
                        // j 没走完，i 已经走完了，说明 typed 多输入了不符合的内容，举个例子，本来是 jackma，但是 typed 输入了 jaackmmac 也是不对的
                        return false;
                    } else {
                        // j 没走完，继续，把 repeat, repeat2 先修改为 0
                        repeat = 0;
                        repeat2 = 0;
                        // name 的检查索引更新一下
                        checkIndex2 = j;
                        // typed 的索引位置更新一下
                        checkIndex = i--;
                        // 外循环正常执行，会发生 i++，所以要用 i--处理一下
                        // 跳出内循环，此时不执行 j++
                        break inner;
                    }
                }
            }
        }
    }
    return repeat === 0;
};