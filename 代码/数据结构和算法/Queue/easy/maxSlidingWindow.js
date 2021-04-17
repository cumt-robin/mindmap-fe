/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 10:49:48
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 12:27:23
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/

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

class DoubleStackQueue {
    constructor() {
        this.stack1 = new Stack();
        this.stack2 = new Stack();
    }

    get size() {
        return this.stack1.size + this.stack2.size;
    }

    empty() {
        return this.size === 0
    }

    add(val) {
        this.stack1.push(val)
    }

    moveStack() {
        if (this.stack2.size === 0) {
            while(this.stack1.size > 0) {
                this.stack2.push(this.stack1.pop())
            }
        }
    }

    remove() {
        this.moveStack();
        return this.stack2.pop();
    }
    
    peek() {
        this.moveStack();
        return this.stack2.peek();
    }
}

/**
 * 暴力slice产生了多个窗口实例
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if (nums.length === 0) {
        return []
    }
    var result = [];
    var sub;
    for (let index = 0; index < nums.length - (k - 1); index++) {
        sub = nums.slice(index, index + k)
        result.push(Math.max.apply(Math, sub))
    }
    return result;
};

// 可以考虑优化为一个窗口，并缓存最大值
var maxSlidingWindow = function(nums, k) {
    if (nums.length === 0) {
        return []
    }
    var queue = [];
    for (let index = 0; index < k; index++) {
        queue.push(nums[index]);
    }
    var max = Math.max.apply(Math, queue)
    var result = [max]
    for (let index = 1; nums.length > k && index < nums.length - (k - 1); index++) {
        var removeItem = queue.shift();
        var newEle = nums[index + k - 1]
        queue.push(newEle)
        if (removeItem === max || newEle > max) {
            max = Math.max.apply(Math, queue)
        }
        result.push(max)
    }
    return result;
};