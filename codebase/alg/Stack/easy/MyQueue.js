
// https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/

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
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack1.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.stack2.empty()) {
        while(!this.stack1.empty()) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.stack2.empty()) {
        while(!this.stack1.empty()) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.peek();
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack1.empty() && this.stack2.empty()
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */