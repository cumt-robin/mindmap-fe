
// https://leetcode-cn.com/problems/compress-string-lcci/

/**
 * 用一个char记录上一个是什么字符，如果当前字符和上一个一样，就计数+1；否则就把上一个字符以及计数拼接到处理后的字符串中。
 * 最后比较一下处理后的字符串和原字符串哪个长。
 * @param {string} S
 * @return {string}
 */
var compressString = function(S) {
    if (S.length === 0) {
        return ''
    }
    let char = S[0]
    let count = 1;
    let result = ''
    for (let i = 1; i < S.length; i++) {
        let currChar = S[i];
        if (currChar === char) {
            count++;
        } else {
            result += `${char}${count}`
            count = 1
            char = currChar
        }
    }
    result += `${char}${count}`
    return result.length >= S.length ? S : result
};