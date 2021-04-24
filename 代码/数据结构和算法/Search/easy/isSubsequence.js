
// https://leetcode-cn.com/problems/is-subsequence/

// 在目标字符串指定范围内搜索目标字符索引，并返回索引
function binarySearch(s, left, right, char) {
    while (left <= right) {
        const mid = left + (right - left >> 1)
        if (s[mid] === char) {
            return mid;
        } {
            const leftResultIndex = binarySearch(s, left, mid - 1, char)
            if (leftResultIndex !== -1) {
                return leftResultIndex
            } else {
                return binarySearch(s, mid + 1, right, char)
            } 
        }
    }
    return -1;
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let left = 0, right = t.length - 1;
    for (let i = 0, len = s.length; i < len; i++) {
        const searchIndex = binarySearch(t, left, right, s[i])
        if (searchIndex === -1) {
            return false;
        } else {
            // 查找下一个s字符时，搜索的起始索引+1
            left = searchIndex + 1
        }
    }
    return true;
};