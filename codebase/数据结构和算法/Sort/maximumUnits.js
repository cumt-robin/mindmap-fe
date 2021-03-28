/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 12:14:55
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 12:22:14
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/maximum-units-on-a-truck/

/**
 * 这题的基本思路是优先装大的。
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function(boxTypes, truckSize) {
    const n = boxTypes.length
    let result = 0;
    boxTypes.sort((a, b) => b[1] - a[1])
    for (let i = 0; truckSize > 0 && i < n; i++) {
        const [count, unit] = boxTypes[i];
        const loadCount = Math.min(count, truckSize)
        result += loadCount * unit;
        truckSize -= loadCount
    }
    return result;
};