
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

function handleStack(S) {
    var stack = []
    for (let index = 0; index < S.length; index++) {
        var c = S[index]
        if (c === '#') {
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack;
}

/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
    var stack1 = handleStack(S)
    var stack2 = handleStack(T);
    while(stack1.length > 0 || stack2.length > 0) {
        var s1 = stack1.pop();
        var s2 = stack2.pop();
        if (s1 !== s2) {
            return false;
        }
    }
    return true;
};