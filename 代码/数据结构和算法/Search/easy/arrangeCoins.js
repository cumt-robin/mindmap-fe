
// https://leetcode-cn.com/problems/arranging-coins/

/**
 * 我们知道 1~n 求和就是 n * (n + 1) / 2，而这道题其实是反过来求 n，其实是一个 logN 的求法，正是符合二分的。
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    let left = 0, right = n;
    while(left <= right) {
        const mid = left + (right - left >> 1)
        const count = mid * (mid + 1) / 2
        const nextCount = (mid + 1) * (mid + 2) / 2
        if (count <= n) {
            if (nextCount > n) {
                return mid;
            } else {
                left = mid + 1;
            }
        } else {
            right = mid - 1
        }
    }
};