
// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

/**
 * 利用map
 * 举例：1 2 3 2 4
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const len = s.length;
    // map 的 key 是字符，value 是这个字符的索引
    const map = new Map();
    let result = 0;
    for (let left = 0, right = 0; right < len; right++) {
        const element = s[right];
        if (map.has(element)) {
            // 如果遇到重复的，找出重复处的索引
            let sameEleIndex = map.get(element)
            // 把 left 到重复索引处，存在 map 的记录全部删了
            for (let i = left; i <= sameEleIndex; i++) {
                map.delete(s[i]);
            }
            // 更新 left 位置
            left = sameEleIndex + 1;
        }
        // 首先看这里，把字串长度算出来
        const subLength = right - left + 1;
        // 更新 result
        result = Math.max(result, subLength)
        // map 里面存储 element 和它的索引
        map.set(element, right);
    }
    return result;
}

/**
 * 暴力解法，滑动窗口一下还没想到
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const len = s.length;
    if (len === 0) {
        return 0;
    }
    let max = 1;
    for (let i = 0; i < len - 1; ++i) {
        let submax = 1;
        for (let j = i + 1; j < len; ++j) {
            let isRepeat = false;
            for (let k = i; k < j; ++k) {
                if (s[j] === s[k]) {
                    isRepeat = true;
                    break;
                }
            }
            if (!isRepeat) {
                // 和前一个字符不同，就计数+1
                ++submax;
            } else {
                break;
            }
        }
        // 检查一下是否需要更新 max
        if (submax > max) {
            max = submax;
        }
    }
    return max;
};