
// https://leetcode-cn.com/problems/valid-parentheses/

// 用数组模拟一个栈的结构
class Stack {
    constructor() {
        this.list = []
    }

    get length() {
        return this.list.length;
    }

    push(val) {
        this.list.push(val)
    }

    pop() {
        return this.list.pop();
    }

    peek() {
        return this.list[this.list.length - 1]
    }
}

/**
 * 栈这里定义比较模糊，在Javascript这里应该是用数组来模拟栈的，但是要注意，只能执行4个操作，
 * 分别是入栈，出栈，获取栈顶元素，获取栈的长度。
 * 入栈push，出栈pop，获取栈顶元素暂时是通过stack[stack.length - 1]来模拟。
 * 其他操作就不要做了，比如shift, unshift，或者直接操作数组的元素；否则就不符合栈的特性了。
 * 这题我的思路是遍历字符串，同时用一个prev记住前一个字符，如果遍历时与前一个匹配，就出栈；否则就入栈。
 * 最后检查下栈的length，就可以知道是不是合法的了。
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var map = new Map([
        [")", "("],
        ["]", "["],
        ["}", "{"],
    ]);
    var stack = [];
    var prev = null;
    for (let index = 0; index < s.length; index++) {
        const character = s[index];
        if (prev === map.get(character)) {
            stack.pop();
            prev = stack.length > 0 ? stack[stack.length - 1] : null
        } else {
            stack.push(character)
            prev = character
        }
    }
    return stack.length === 0
};