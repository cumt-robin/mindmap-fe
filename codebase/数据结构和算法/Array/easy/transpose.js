/*
 * @Author: 蒋文斌
 * @Date: 2021-03-11 21:35:07
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-11 21:37:34
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/transpose-matrix/

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
