/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 22:04:20
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 22:09:01
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/, '%20')
};

var replaceSpace = function(s) {
    var arr = s.split("")
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === " ") {
            arr[index] = '%20'
        }
    }
    return arr.join("")
};