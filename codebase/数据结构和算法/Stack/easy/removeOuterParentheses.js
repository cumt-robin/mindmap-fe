/*
 * @Author: 蒋文斌
 * @Date: 2021-03-20 20:56:42
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-20 21:25:25
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/remove-outermost-parentheses/

class Stack {
    constructor() {
        this.list = []
    }

    get size() {
        return this.list.length;
    }

    empty() {
        return this.size === 0
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
 * 这题目说实话有点扯淡，搞了个自己的原语概念出来。
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function(S) {
    const stack = new Stack()
    let newStr = ''
    for (let index = 0; index < S.length; index++) {
        const char = S[index];
        if (char === '(') {
            stack.push(char)
            if (stack.size > 1) {
                newStr += "("
            }
        } else {
            stack.pop();
            if (stack.size > 0) {
                newStr += ")"
            }
        }
    }
    return newStr;
};