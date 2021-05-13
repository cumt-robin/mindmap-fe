
// https://leetcode-cn.com/problems/implement-strstr/

/**
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 -1 。
 * aab ab
 * acab ab
 * abc ef
 * mississippi issip
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const needleLen = needle.length;
    if (needleLen === 0) {
        // needle为空的时候返回0，符合题意
        return 0
    }
    const len = haystack.length;
    if (len === 0) {
        // 如果needle不为空，并且haystack为空，返回-1，理所应当
        return -1
    }
    // 开始从第0位比较
    let i = 0, j = 0;
    // 出循环的条件是 needle 比较完了，此时满足 j === needle.length
    while (j < needleLen) {
        if (haystack[i] === needle[j]) {
            // 如果两者相同，往前推一位
            i++;
            j++;
        } else if (i >= len - 1) {
            // 如果 i 比完了还没满足出循环的条件，说明匹配不了，返回 -1
            return -1
        } else if (j !== 0) {
            // 出现不相同，且之前有相同的，所以 j 不会是 0；此时保守玩法是 i 放弃掉已经匹配的 j 位，然后往前推 1 位，继续比较。
            // 激进的玩法是从当前位置往后推，找到最大字串继续比，免得做一些无用功，但是思路我还不太清楚。
            i = i - j + 1
            j = 0;
        } else {
            // 没匹配到，j 同时也等于 0，说明一个都还匹配上，i自增就行，继续找
            i++;
        }
    }
    // 最后，因为如果满足条件出循环，i 还会自增一下，所以取的是 i - needle.length
    return i - needleLen;
};