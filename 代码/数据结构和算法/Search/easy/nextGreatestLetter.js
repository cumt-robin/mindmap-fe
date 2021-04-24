
// https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/

/**
 * a - z，比较的时候首尾循环
 * 题目中也提到了，有序列表
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    let left = 0, right = letters.length - 1;
    const targetCharCode = target.charCodeAt(0)
    while (left < right) {
        const mid = left + (right - left >> 1)
        if (letters[mid].charCodeAt(0) > targetCharCode) {
            right = mid;
        } else {
            left = mid + 1; 
        }
    }
    const char = letters[left]
    // 如果找遍了还找不到比目标大的，考虑到首尾循环比较，就按序取第一个
    return char.charCodeAt(0) > targetCharCode ? char : letters[0];
};