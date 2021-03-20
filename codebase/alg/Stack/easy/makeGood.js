/*
 * @Author: 蒋文斌
 * @Date: 2021-03-20 21:28:55
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-20 21:40:29
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/make-the-string-great/

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
 * @param {string} s
 * @return {string}
 */
var makeGood = function(s) {
    const stack = new Stack();
    for (let index = 0; index < s.length; index++) {
        const char = s[index];
        const top = stack.peek();
        if (stack.size > 0 && top !== char && top.toLowerCase() === char.toLowerCase()) {
            stack.pop();
        } else {
            stack.push(char)
        }
    }
    var str = ''
    while (stack.size > 0) {
        str = stack.pop() + str
    }
    return str;
};