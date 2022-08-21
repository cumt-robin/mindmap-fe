/**
 * 转置矩阵
 * 链接：https://leetcode-cn.com/problems/transpose-matrix/
 * 题干：给你一个二维整数数组 matrix，返回 matrix 的转置矩阵。矩阵的转置是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。
 * 思路：矩阵是一个二维数组，转置其实就是行转列，只需要 [i][j] = [j][i] 即可。
 * @param {*} matrix 
 * @returns 
 */
var transpose = function (matrix) {
    var m = matrix.length;
    var n = matrix[0].length;
    var result = [];
    for (var i = 0; i < n; i++) {
        result[i] = [];
        for (var j = 0; j < m; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    return result;
};
