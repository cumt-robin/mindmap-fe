/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 22:15:22
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-14 15:11:03
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/

/**
 * 一开始还没了解双栈的玩法，直接用的数组，用unshift保证先进的在前面，用pop保证先进的先出。
 * 最下面附上了双栈的玩法
 */
var CQueue = function() {
    this.stack = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack.unshift(value)
    return void 0;
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.stack.length > 0) {
        return this.stack.pop();
    } else {
        return -1;
    }
};

/**
 * 两个栈，一个负责插入，一个负责删除
 * 注意栈只能push和pop
 */
var CQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value)
    return void 0;
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.stack2.length === 0) {
        // 把stack1的先全部出栈，依次入栈到stack2
        while(this.stack1.length > 0) {
            this.stack2.push(this.stack1.pop())
        }
    }
    if (this.stack2.length > 0) {
        return this.stack2.pop();
    } else {
        return -1;
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */