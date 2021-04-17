
// https://leetcode-cn.com/problems/baseball-game/

/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
    const stack = [];
    let sum = 0;
    for (let index = 0; index < ops.length; index++) {
        const op = ops[index];
        let top, prev, newTop;
        switch (op) {
            case "+":
                top = stack.pop();
                prev = stack[stack.length - 1]
                newTop = top + prev
                stack.push(top)
                stack.push(newTop)
                break;
            case "D":
                top = stack[stack.length - 1]
                stack.push(top * 2)
                break;
            case "C":
                stack.pop();
                break;
            default:
                stack.push(+op)
                break;
        }
    }
    while (stack.length > 0) {
        sum += stack.pop();
    }
    return sum;
};