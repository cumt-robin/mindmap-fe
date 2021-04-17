
// https://leetcode-cn.com/problems/repeated-substring-pattern/

/**
 * 字符串真难啊，又是用暴力解法过的
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    let i = 0;
    // 最多检查一半的字符串就行了
    while(i < (s.length - 1) / 2) {
        let sub = s.substring(0, i + 1);
        let times = s.length / sub.length
        if (Number.isInteger(times)) {
            // 首先字符串必须是字串的整数倍
            let checkStc = ''
            for (let i = 0; i < times; i++) {
                checkStc += sub
            }
            if (checkStc === s) {
                return true;
            }
        }
        i++;
    }
    return false;
};