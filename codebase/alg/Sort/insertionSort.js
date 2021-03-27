/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 16:56:11
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 19:10:22
 * @Description: 自动生成
 */

/**
 * 插入排序，从待排序数组中取出第一个元素插入到已排序数组中，插入过程需要进行比较，类似于扑克牌插牌。
 * splice性能比较差，不推荐
 * @param {Array} a
 * @returns {Array} sortedArr
 */
function insertionSort(a) {
    const n = a.length;
    if (n === 0) {
        return a;
    }
    const sortedArr = [a[0]];
    for (let i = 1; i < n; i++) {
        let toInsertOne = a[i];
        let m = sortedArr.length;
        for (let j = m - 1; j >= 0; j--) {
            const compareOne = sortedArr[j];
            if (toInsertOne >= compareOne) {
                sortedArr.splice(j, 0, toInsertOne);
                break;
            }
        }
    }
    return sortedArr;
}

// 不用splice，检测能插入的位置，如果在已排序部分的末端，就直接插入；如果在已排序部分的中间，就把后面的往后推
function insertionSort(a) {
    const n = a.length;
    if (n <= 1) {
        return a;
    }
    // 假定第一个元素是已经排好序的，直接从第二个开始插入。
    for (let i = 1; i < n; i++) {
        const value = a[i];
        // 寻找插入的位置，从前一个开始找
        let j = i - 1;
        for (; j >= 0; j--) {
            if (a[j] > value) {
                // 如果比待插入的元素大，就往后面挪
                a[j + 1] = a[j];
            } else {
                // 如果遇到小于或等于待插入元素的，直接break
                break;
            }
        }
        // j + 1是留出来的坑位，用于赋值
        a[j + 1] = value;
    }
    return a
}
