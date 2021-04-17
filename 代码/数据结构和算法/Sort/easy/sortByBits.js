
// https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/

function decimal2Binary(num) {
    const result = [];
    do {
        result.unshift(num % 2)
        num = Math.floor(num / 2)
    } while (num > 0);
    return result;
}

function getCountOfOneInBinary(num) {
    let count = 0;
    do {
        if (num % 2 === 1) {
            ++count;
        }
        num = Math.floor(num / 2)
    } while (num > 0);
    return count
}

/**
 * 除了暴力，我好像没有其他的思路了，成绩是超过了53%的答案
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
    const result = [];
    const countMap = new Map();
    for (let i = arr.length - 1; i >= 0; --i) {
        const element = arr[i];
        // 算出一个数转二进制后1的数量count
        const count = getCountOfOneInBinary(element)
        // 用count作为key，考虑可能多个element会有同一个count，这里用数组存
        const elements = countMap.get(count) || []
        elements.push(element)
        countMap.set(count, elements)
    }
    const counts = [...countMap.keys()];
    // 按1的数量进行排序
    counts.sort((a, b) => a - b);
    counts.forEach(count => {
        const elements = countMap.get(count)
        if (elements.length === 1) {
            result.push(elements[0])
        } else {
            // 对于存在多个数字二进制中 1 的数目相同的情况，按原值进行排序
            elements.sort((a, b) => a - b)
            result.push(...elements)
        }
    })
    return result;
};