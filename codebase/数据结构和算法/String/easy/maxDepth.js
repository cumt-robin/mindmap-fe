/*
 * @Author: 蒋文斌
 * @Date: 2021-03-27 14:20:36
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-27 14:25:40
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/maximum-nesting-depth-of-the-parentheses/

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
 * 看到括号，第一反应就是用栈来解决。
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    const stack = new Stack();
    let depth = 0;
    let maxDepth = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '('){
            stack.push(char)
            depth++;
        } else if (char === ')') {
            stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth
            }
            depth--;
        }
    }
    return maxDepth;
};