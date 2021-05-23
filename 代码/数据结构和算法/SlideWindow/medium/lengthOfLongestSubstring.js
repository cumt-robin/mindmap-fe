
// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

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