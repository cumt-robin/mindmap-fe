/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 16:48:00
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 17:33:26
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/island-perimeter/

function checkPerimeter(grid, i, j) {
    let p = 4;
    if (i - 1 >= 0 && grid[i - 1][j] === 1) {
        p--;
    }
    if (i + 1 <= grid.length - 1 && grid[i + 1][j] === 1) {
        p--;
    }
    if (j - 1 >= 0 && grid[i][j - 1] === 1) {
        p--;
    }
    if (j + 1 <= grid[0].length - 1 && grid[i][j + 1] === 1) {
        p--;
    }
    return p;
}

/**
 * 一个陆地格子本来是4边的，周长为4；如果有1个方向接壤就减1
 * 感觉没用到hashmap啊，可能是我太菜了。
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if (cell === 1) {
                // 是陆地，检测周长
                result += checkPerimeter(grid, i, j)
            }
        }
    }
    return result;
};