/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 16:04:26
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 18:35:35
 * @Description: 自动生成
 */

/**
 * 冒泡排序：相邻比较（可能会多次换位），一轮确定一个最大值，接下来的轮次在剩下元素中继续冒泡比较。
 * 稳定，等值元素会在冒泡过程走到一起，但不会交换位置
 * @param {aay} a 
 */
function bubbleSort(a) {
    const n = a.length;
    let temp;
    // 比较n - 1轮
    for (let i = 0; i < n - 1; i++) {
        // 因为每一轮确定一个值，并放在靠后位置；
        // 而每一轮都要取两个连续的元素出来，所以每一轮比较的终点索引为n - 1 - i，而通过n - 1 - i - 1和j + 1已经能拿到n - 1 - i索引位置的值了，所以是 < 而不是 <=。
        for (let j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                temp = a[j]
                a[j] = a[j + 1];
                a[j + 1] = temp
            }
        }
    }
    return a;
}