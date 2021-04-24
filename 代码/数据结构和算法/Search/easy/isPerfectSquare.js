
// https://leetcode-cn.com/problems/valid-perfect-square/


/**
 * 这个比mySqrt还简单点，不需要取整。
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    let left = 1, right = num;
    while (left <= right) {
        let mid = left + ((right - left) >> 1)
        let product = mid * mid;
        if (product === num) {
            return true;
        } else if (product < num) {
            left = mid + 1
        } else {
            right = mid - 1;
        }
    }
    return false;
};