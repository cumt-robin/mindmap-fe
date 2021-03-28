
// https://leetcode-cn.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters/

/**
 * 又是一波边界分析
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
    var lowerCaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'l', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var result = ''
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char !== '?') {
            result += char
        } else if (i === 0) {
            result += lowerCaseChars.find(item => item !== s[i + 1])
        } else if (i === s.length - 1) {
            result += lowerCaseChars.find(item => item !== result[i - 1])
        } else {
            result += lowerCaseChars.find(item => item !== result[i - 1] && item !== s[i + 1])
        }
    }
    return result;
};