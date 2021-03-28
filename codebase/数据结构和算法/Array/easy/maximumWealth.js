/*
 * @Author: 蒋文斌
 * @Date: 2021-03-15 21:28:27
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-15 21:34:55
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/richest-customer-wealth/

/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function(accounts) {
    return Math.max.apply(null, accounts.map(group => group.reduce((prev, curr) => {
        return prev + curr;
    }, 0)))
};