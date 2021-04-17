/*
 * @Author: 蒋文斌
 * @Date: 2021-03-15 14:06:28
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-15 21:28:12
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/flipping-an-image/

/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function(image) {
    return image.map(row => {
        return row.reverse().map(item => item === 0 ? 1 : 0)
    })
};