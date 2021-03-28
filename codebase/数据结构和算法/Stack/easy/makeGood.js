/*
 * @Author: 蒋文斌
 * @Date: 2021-03-20 21:28:55
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-20 21:46:20
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
 * 遍历字符串，需要与栈顶元素比较，如果不相等但是通过toLowerCase()转换后相等，说明是需要被整理的，此时出栈即可；否则就入栈。
 * 最后把栈pop出来作为整理后的字符串结果，注意拼接的时候是在左侧拼接，因为入栈和出栈的顺序反了。
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