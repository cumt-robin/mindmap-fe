/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 20:12:56
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 21:33:42
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/reverse-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 迭代反转，看了其他答案就觉得这个解法太垃圾了
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head === null) {
        return null;
    }
    var stack = [];
    while(head !== null) {
        stack.push(head.val)
        head = head.next;
    }
    var dummy = {};
    var temp = dummy;
    var i = stack.length - 1;
    while(i >= 0) {
        temp.next = {
            val: stack[i],
            next: null
        };
        temp = temp.next;
        i--;
    }
    return dummy.next;
};

/**
 * 利用prev存储前序节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var prev = null;
    var curr = head;
    while(curr) {
        var next = curr.next;
        prev = curr;
        curr.next = prev
        curr = next;
    }
    return prev;
}

/**
 * 递归的没想明白
 * 好像明白了，先利用递归找到最后一个节点，这个时候调用栈最深了。
 * 然后依次出栈，除了栈顶，下面每一级出栈时都利用head.next.next = head反转指向
 * 最后还用一个head.next = null，是为了让头节点成为尾节点。
 * 最重要就是要在脑海里想象这个压栈和出栈的过程。
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};