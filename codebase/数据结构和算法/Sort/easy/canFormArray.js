/*
 * @Author: 蒋文斌
 * @Date: 2021-03-28 12:53:38
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-28 20:42:24
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/check-array-formation-through-concatenation/

/**
 * map存储子数组的第一个元素的值和子数组在pieces中的索引位置
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
var canFormArray = function(arr, pieces) {
    // map存储pieces的每个子数组的信息，其中key是子数组第一个元素的值，value是子数组在pieces中的下标。
    const map = new Map();
    for (let i = pieces.length - 1; i >= 0; i--) {
        const [firstEle] = pieces[i];
        map.set(firstEle, i)
    }
    // 遍历arr
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        // 如果pieces能拼成arr，那么map里一定有arr的元素
        if (map.has(element)) {
            // 通过index能知道这个元素是pieces中哪一个子数组的第一个元素
            const index = map.get(element)
            const piece = pieces[index]
            const pieceLength = piece.length
            // 此时要注意piece是不是有多个元素
            if (pieceLength !== 1) {
                for (let j = 1; j < pieceLength; j++) {
                    // 如果有多个，就从下一个开始继续按序比较，注意要把 i 也自增
                    if (piece[j] !== arr[++i]) {
                        return false;
                    }
                }
            }
            map.delete(element)
        } else {
            // 否则就不满足条件，直接return false
            return false;
        }
    }
    return true;
};