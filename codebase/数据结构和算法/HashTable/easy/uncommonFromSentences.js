/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 18:08:19
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 18:26:28
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/

function generateMap(arr) {
    var map = {};
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (map.hasOwnProperty(value)) {
            map[value]++;
        } else {
            map[value] = 1
        }
    }
    return map;
}

/**
 * 使用了两个map分别计数
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
var uncommonFromSentences = function(A, B) {
    var arr1 = A.split(" ");
    var arr2 = B.split(" ");
    var map1 = generateMap(arr1);
    var map2 = generateMap(arr2);
    var result = [];
    Object.keys(map1).forEach(key => {
        if (map1[key] === 1 && !map2.hasOwnProperty(key)) {
            result.push(key)
        }
    })
    Object.keys(map2).forEach(key => {
        if (map2[key] === 1 && !map1.hasOwnProperty(key)) {
            result.push(key)
        }
    })
    return result;
};