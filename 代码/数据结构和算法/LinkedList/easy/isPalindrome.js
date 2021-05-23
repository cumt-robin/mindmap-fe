/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 19:32:35
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 20:06:52
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/palindrome-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 链表转数组，最后比较数组是不是回文就简单点
 * 又学到了一个新知识，双指针遍历，速度确实快一些
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    var vals = [];
    while (head !== null) {
        vals.push(head.val)
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

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

var l1 = new arr2ListHead([1,1,2,1])

/**
 * 或者先反转链表，再对比
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let prev = null;
    let curr = head;
    const arr = [];
    while(curr) {
        arr.push(curr.val)
        let next = curr.next;
        // 前序 prev 节点变成 next 节点，实现反转
        curr.next = prev;
        // 用 prev 临时存储反转的头指针
        prev = curr;
        curr = next;
    }
    // 此时 prev 已经是反转链表的头指针了
    let i = 0;
    while(prev) {
        if (prev.val !== arr[i]) {
            return false;
        }
        prev = prev.next;
        ++i;
    }
    return true;
};