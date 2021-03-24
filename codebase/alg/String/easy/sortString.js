
// https://leetcode-cn.com/problems/increasing-decreasing-string/

/**
 * 先用Map计数，然后用来回扫描的方法录入值，难得一次通过，哈哈
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {
    const map = new Map()
    let isAscending = true;
    let result = ''
    let scanIndex = 0
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map.has(char)) {
            map.set(char, map.get(char) + 1)
        } else {
            map.set(char, 1)
        }
    }
    const sortedKeys = [...map.keys()].sort();
    while(result.length < s.length) {
        while(map.get(sortedKeys[scanIndex]) === 0) {
            if (isAscending) {
                if (++scanIndex === sortedKeys.length) {
                    scanIndex = sortedKeys.length - 1
                    isAscending = false;
                }
            } else {
                if (--scanIndex === -1) {
                    scanIndex = 0;
                    isAscending = true;
                }
            }
        }
        let targetChar = sortedKeys[scanIndex]
        result += targetChar
        map.set(targetChar, map.get(targetChar) - 1)
        if (isAscending) {
            if (++scanIndex === sortedKeys.length) {
                scanIndex = sortedKeys.length - 1
                isAscending = false;
            }
        } else {
            if (--scanIndex === -1) {
                scanIndex = 0;
                isAscending = true;
            }
        }
    }
    return result;
};