/*
 * @Author: 蒋文斌
 * @Date: 2021-04-21 08:48:47
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-21 10:03:35
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/sqrtx/

function binarySearch(left, right, target) {
    while (left <= right) {
        const middle = (left + right) >> 1;
        const x = middle * middle;
        const y = (middle + 1) * (middle + 1);
        if (x <= target && y > target) {
            return middle;
        } else if (x < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
}

/**
 * 不用Math.sqrt，开平方并去掉小数部分
 * 如果用二分搜索，则要判断一个临界点：根号x 和 x/2 相等的时候，其实也就是 x=4 的时候。
 * 在 x<4 时，根号x 在 x/2 右侧；在 x>4 时，根号x 在 x/2 左侧。
 * 搜索时，结束条件是 Math.floor(y^2) === x 
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x <= 4) {
        return binarySearch(x >> 1, x, x)
    } else {
        return binarySearch(2, x >> 1, x)
    }
};