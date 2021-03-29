
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

};