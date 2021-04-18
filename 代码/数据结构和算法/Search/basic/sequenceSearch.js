/**
 * 顺序查找
 * @param {array} arr 
 * @param {*} value 
 * @returns 下标
 */
function sequenceSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
}