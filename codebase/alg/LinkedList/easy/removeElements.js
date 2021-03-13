/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 20:12:16
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 20:19:55
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/remove-linked-list-elements/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 与deleteNode不同的是，要删除所有满足条件的节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    var prev = null;
    var curr = head;
    var newHead = head;
    while (curr !== null) {
        if (curr.val === val) {
            curr = curr.next;
            if (prev === null) {
                newHead = curr;
            } else {
                prev.next = curr;
            }
        } else {
            prev = curr;
            curr = curr.next;
        }
    }
    return newHead;
};
