
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
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
    for (let i = arr.length - 1; i >= 0; --i) {
        const element = arr[i];
        const count = getCountOfOneInBinary(element)
    }
};