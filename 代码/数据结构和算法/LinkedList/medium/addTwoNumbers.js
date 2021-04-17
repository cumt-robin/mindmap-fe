/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 13:03:56
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 14:45:45
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/add-two-numbers-ii/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var input1 = [7,2,4,3]
var input2 = [5,6,4]

function arr2ListHead(arr) {
    if (arr.length === 0) {
        return null;
    }
    var dummy = {}
    var i = 0;
    var tempNode = dummy;
    while(i < arr.length) {
        var nextNode = new ListNode(arr[i])
        tempNode.next = nextNode;
        tempNode = nextNode;
        i++;
    }
    return dummy.next;
}

var l1 = new arr2ListHead(input1)

var l2 = new arr2ListHead(input2)

/**
 * 做这个题的时候陷入了一个误区，我以为只能用链表做，但最后才发现应该结合其他数据结构来做，比如栈。
 * 虽然性能很差，但总算做出来了。
 * 也学到一个技巧，要翻转链表，可以用栈。
 * 最后还可以用虚拟节点，来构造一个可以完全递归的对象
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    var stack1 = [l1.val];
    while (l1.next) {
        l1 = l1.next;
        stack1.push(l1.val);
    }
    var stack2 = [l2.val];
    while (l2.next) {
        l2 = l2.next;
        stack2.push(l2.val);
    }
    var resultStack = [];
    var max = Math.max(stack1.length, stack2.length);
    var carry = 0;
    for (let index = 0; index < max; index++) {
        var addend1 = stack1.pop() || 0;
        var addend2 = stack2.pop() || 0;
        var sum = addend1 + addend2 + carry;
        resultStack.unshift(sum % 10);
        carry = sum / 10 >= 1 ? 1 : 0;
    }
    if (carry > 0) {
        resultStack.unshift(1);
    }
    var dummy = {}
    var tempNode = dummy;
    var i = 0;
    while (i < resultStack.length) {
        tempNode.next = {
            val: resultStack[i],
            next: null,
        };
        tempNode = tempNode.next;
        i++;
    }
    return dummy.next;
};
