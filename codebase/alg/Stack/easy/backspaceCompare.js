
// https://leetcode-cn.com/problems/backspace-string-compare/

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
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {

};