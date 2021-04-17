
// https://leetcode-cn.com/problems/matrix-cells-in-distance-order/

/**
 * 暴力排序，竟然赢得了全世界？
 * 执行用时：140 ms, 在所有 JavaScript 提交中击败了100.00%的用户
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function(R, C, r0, c0) {
    const result = new Array(R * C);
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            result[i * C + j] = [i, j]
        }
    }
    result.sort((a, b) => {
        const distanceA = Math.abs(a[0] - r0) + Math.abs(a[1] - c0)
        const distanceB = Math.abs(b[0] - r0) + Math.abs(b[1] - c0)
        return distanceA - distanceB
    })
    return result;
};