
/**
 * 希尔排序，在插入排序的基础上优化而来。
 * 由于插入排序在数组相对有序或数组元素数量较小的情况下效率很高，所以希尔排序的思想是通过分组来减少元素数量，同时也使数组变得相对有序。
 * 分组增量逐渐缩小，使得排序结果逐渐收敛，最终增量为1，变成相对有序的普通插入排序。
 * 一般增量从 n/2 开始，逐渐衰减，但是极端情况会出现分组操作做无用功的情况，这种情况效率比插入排序还差。
 * 为了避免这种情况，有了Hibbard和Sedgewick增量法（增量互质）。
 * 希尔排序不是稳定排序
 * @param {Array} arr 
 * @returns {Array} arr 
 */
function shellSort(arr) {
    const len = arr.length;
    // 每一轮增量递减，可算出当前轮次的分组增量gap，以 gap > 0 为循环继续的必要条件。
    for (let gap = len >> 1; gap > 0; gap >>= 1) {
        // 每一轮需要进行 gap 组插入排序
        for (let i = 0; i < gap; i++) {
            // 应用插入排序
            // 假定第一个元素是已经排好序的，直接从第二个开始插入。
            for (let j = i + gap; j < len; j += gap) {
                const value = arr[j];
                // 寻找插入的位置，从前一个开始找
                let k = j - gap;
                for (; k >= i; k -= gap) {
                    if (arr[k] > value) {
                        // 如果大于待插入的元素，就往后面挪
                        arr[k + gap] = arr[k];
                    } else {
                        // 如果遇到小于或等于待插入元素的，就说明找到位置了
                        break;
                    }
                }
                // break出循环后，最后一个 k -= gap 不会执行，所以 k + gap 就是留出来的坑位，用于赋值
                arr[k + gap] = value;
            }
        }
    }
    return arr;
}

console.log(shellSort([1, 7,4,42,23,52,7,93,5,73,7,8,2,6,8,3,3,64, 2, 4, 3, 5, 8, 9,86,346,335,78,9,31,3,66, 34,43,22,3443,344,343,34,1,14,376,367,43,14,34,52,24,3434]))

/**
 * Hibbard增量计算法则 D(k) = 2^k - 1
 * @param {number} n - 数组长度
 * @returns {array} 返回的增量数组
 */
function getHibbardArr(n) {
    let i = 1, arr = [];
    while(true) {
        let tmp = (1 << i) - 1;
        if (tmp <= n) {
            arr.push(tmp)
        } else {
            break;
        }
        i += 1;
    }
    return arr;
}

/**
 * Sedgewick增量法 9*4^i - 9*2^i + 1 或者 4^i - 3*2^i + 1
 * @param {*} n 
 * @returns 
 */
function getSedgewickArr(n) {

}

function shellSort(arr) {
    const len = arr.length;
    // 每一轮增量递减，可算出当前轮次的分组增量gap，以 gap > 0 为循环继续的必要条件。
    const gapArr = getHibbardArr(len);
    for (let m = gapArr.length - 1; m >= 0; m--) {
        // 每一轮需要进行 gap 组插入排序
        const gap = gapArr[m];
        for (let i = 0; i < gap; i++) {
            // 应用插入排序
            // 假定第一个元素是已经排好序的，直接从第二个开始插入。
            for (let j = i + gap; j < len; j += gap) {
                const value = arr[j];
                // 寻找插入的位置，从前一个开始找
                let k = j - gap;
                for (; k >= i; k -= gap) {
                    if (arr[k] > value) {
                        // 如果大于待插入的元素，就往后面挪
                        arr[k + gap] = arr[k];
                    } else {
                        // 如果遇到小于或等于待插入元素的，就说明找到位置了
                        break;
                    }
                }
                // break出循环后，最后一个 k -= gap 不会执行，所以 k + gap 就是留出来的坑位，用于赋值
                arr[k + gap] = value;
            }
        }
    }
    return arr;
}