
// https://leetcode-cn.com/problems/first-bad-version/

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * 用二分查找这都是知道的，我一开始想的是判断 middle is bad && (middle - 1) is good，结果在大量数据时超时了。
 * 2126753390
 * 1702766719
 * 其实可以只判断 middle is bad，并且一直往左边收紧
 * 我是用 (left + right) >> 1 求取 middle 的位置的，最后在评论里翻到一条评论，终于知道我错在哪里了，实际上会 left + right 会溢出。
 * 但是我最后还是超时了，结果发现把 left + (right - left) >> 1 改为 Math.floor((right - left) / 2)就不超时了，我特么，难道右移不是更快吗？
 * 原来问题不是 >> 1 慢，而是 + 的运算优先级高于 >>，这...
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1, right = n;
        while (left < right) {
            let middle = left + ((right - left) >> 1);
            if (isBadVersion(middle)) {
                right = middle
            } else {
                left = middle + 1;
            }
        }
        return left;
    };
};

// 经验证，我最开始的解法还是更快的
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1, right = n;
        while (left <= right) {
            let middle = left + ((right - left) >> 1);
            let isMiddleBad = isBadVersion(middle)
            let isLastBad = isBadVersion(middle - 1)
            if (!isLastBad && isMiddleBad) {
                return middle;
            } else if (isMiddleBad) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
    }
}