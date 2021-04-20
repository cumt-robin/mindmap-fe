/*
 * @Author: 蒋文斌
 * @Date: 2021-04-19 10:51:49
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-20 10:16:41
 * @Description: 自动生成
 */

/**
 * 二分查找针对的是有序数组
 * @param {array} arr 
 * @param {*} target 
 */
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const middle = (left + right) >> 1
        const value = arr[middle]
        if (value === target) {
            return middle;
        } else if (value < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}