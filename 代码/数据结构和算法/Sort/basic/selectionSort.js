/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 16:21:50
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 18:35:47
 * @Description: 自动生成
 */

/**
 * 选择排序：每一轮选出一个最小值，放在最左侧。和冒泡排序的不同点在于，每一轮最多换位一次。
 * @param {Array} a 
 */
 function selectionSort(a) {
    const n = a.length;
    // 比较n - 1轮
    for (let i = 0; i < n - 1; i++) {
        let index = i;
        let min = a[index];
        // 每一轮确定一个较小值，放在数组前部，所以每一轮的起始索引是i，终点索引是n - 1
        for (let j = i; j < n; j++) {
            if (a[j] < min) {
                index = j;
                min = a[j]
            }
        }
        a[index] = a[i];
        a[i] = min;
    }
    return a;
}