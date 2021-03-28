/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 11:01:50
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 11:59:01
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/relative-sort-array/

function generateMap(arr) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (map.has(value)) {
            map.set(value, map.get(value) + 1);
        } else {
            map.set(value, 1)
        }
    }
    return map;
}

/**
 * 优先排arr2中有的，然后升序排剩余部分
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
    const map = generateMap(arr1);
    const result = [];
    for (let i = 0; i < arr2.length; i++) {
        const element = arr2[i];
        const count = map.get(element);
        for (let j = 0; j < count; j++) {
            result.push(element)
        }
        map.delete(element)
    }
    const keys = Array.from(map.keys()).sort((a, b) => a - b)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const count = map.get(key);
        for (let i = 0; i < count; i++) {
            result.push(key)
        }
    }
    return result;
};