
// https://leetcode-cn.com/problems/hanota-lcci/

/**
 * 汉诺塔问题利用了栈的数据结构，同时使用分治思想分解子问题
 * 
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
    function move(n, A, B, C) {
        if (n === 1) {
            C.push(A.pop())
        } else {
            move(n - 1, A, C, B)
            move(1, A, B, C)
        }
    }
    move(A.length, A, B, C)
};