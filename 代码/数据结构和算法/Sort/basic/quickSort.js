
/**
 * 快排利用了Divide and Conquer（分治）的思想
 * 不稳定，确定middle元素的随机性强
 * @param {Array} arr
 * @returns {Array} result
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    // 选一个随机的元素出来
    const randomIndex = Math.floor(Math.random() * arr.length);
    const middleItem = arr[randomIndex]
    const left = [];
    const right = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i === randomIndex) {
            // 排除掉自己
            continue;
        }
        const element = arr[i];
        // 小的放左边，大的放右边
        if (element < middleItem) {
            left.push(element)
        } else {
            right.push(element)
        }
    }
    return [...quickSort(left), middleItem, ...quickSort(right)];
}