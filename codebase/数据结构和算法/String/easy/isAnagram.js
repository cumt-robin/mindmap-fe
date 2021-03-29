
// https://leetcode-cn.com/problems/valid-anagram/

/**
 * 搞来搞去，发现自己就只会map了
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const map = new Map();
    for (let i = s.length - 1; i >= 0; --i) {
        const char = s[i]
        map.set(char, (map.get(char) || 0) + 1)
        
    }
    for (let i = t.length - 1; i >= 0; --i) {
        const char = t[i]
        let count = map.get(char)
        if (count > 0) {
            --count > 0 ? map.set(char, count) : map.delete(char)
        } else {
            return false;
        }
    }
    return map.size === 0
};