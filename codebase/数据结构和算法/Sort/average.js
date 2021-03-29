
// https://leetcode-cn.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/

/**
 * 教练，算平均工资这题我会
 * @param {number[]} salary
 * @return {number}
 */
var average = function(salary) {
    salary.sort((a, b) => a - b)
    const n = salary.length - 2;
    let total = 0
    for (let i = 1; i < n + 1; i++) {
        total += salary[i]
    }
    return total / n
};