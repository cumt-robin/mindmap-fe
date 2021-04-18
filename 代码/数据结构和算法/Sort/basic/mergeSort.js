
/**
 * 合并的思路是：依次比较首位元素
 * @param {Array} left 
 * @param {Array} right 
 */
function merge(left, right) {
    let startIndex = 0;
    const result = new Array(left.length + right.length);
    while(left.length > 0 || right.length > 0) {
        if (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) {
                result[startIndex++] = left.shift();
            } else {
                result[startIndex++] = right.shift();
            }
        } else if (left.length > 0) {
            // 一个分组内是有序的，不需要再排序
            result[startIndex++] = left.shift();
        } else {
            result[startIndex++] = right.shift();
        }
    }
    return result;
}

/**
 * 归并排序，也可以理解为二分排序，也是用的分治思想，把一个数组分为长度尽可能相等的两部分，对子数组继续采用归并排序。
 * 当子数组不可再分时，需要合并数组，合并时，采用依次比较首位元素的方式得出结果。
 * 归并排序是稳定的，即使是分割再合并，等值元素的相对位置还是不会变化的。
 * @param {Array} arr
 * @returns {Array} result 已排序结果
 */
function mergeSort(arr) {
    const len = arr.length
    if (len <= 1) {
        return arr;
    }
    // 分割
    const sliceIndex = Math.floor(len / 2)
    const left = arr.slice(0, sliceIndex)
    const right = arr.slice(sliceIndex)
    // 合并，这里巧妙地利用了mergeSort递归，这会有一个分割到最小单元再调merge的过程
    return merge(mergeSort(left), mergeSort(right))
}