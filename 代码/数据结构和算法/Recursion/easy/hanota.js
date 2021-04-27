/*
 * @Author: 蒋文斌
 * @Date: 2021-04-27 08:16:10
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-27 08:23:29
 * @Description: 汉诺塔问题
 */

// https://leetcode-cn.com/problems/hanota-lcci/

/**
 * 汉诺塔问题利用了栈的数据结构，同时使用分治思想分解子问题。
 * 汉诺塔最神奇的地方在于，不要把A永远当作A，B也可以视为A。不管A柱有多少个盘子，都可以从最后一步分析。
 * 从A中移动N个盘子到C的问题，可以化解为三个步骤。
 * 1. 从A移动N-1个盘子到B
 * 2. 从A移动1个盘子到C。这是基线条件。
 * 3. 从B移动N-1个盘子到C。到了这一步，你可以发现，B可以当作A来玩，这就是递归条件。
 * 你似乎不需要关心它每一步是怎么做的，它就是这么神奇地移动过去了。
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
            move(n - 1, B, A, C)
        }
    }
    move(A.length, A, B, C)
};