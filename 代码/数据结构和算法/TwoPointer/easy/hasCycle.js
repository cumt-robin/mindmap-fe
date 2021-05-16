/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 18:45:15
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 19:11:05
 * @Description: 环形链表
 */

// https://leetcode-cn.com/problems/linked-list-cycle/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 快慢指针，快指针每次走2步，慢指针每次走1步，看看是否会相遇
 * 这里最关键的是，指针值的判断，稍微不注意就会报 Cannot read property "next" of null
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // 首先一个环形链表至少有两个节点
    if (!head || !head.next) {
        return false;
    }
    // 快指针走2步，慢指针走1步。
    let fast = head.next.next, slow = head.next;
    // 环形链表会以相遇结束；非环形链表会以 fast 或 fast.next 为空结束。
    while(fast && fast.next && fast !== slow) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return fast === slow;
};
