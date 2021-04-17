/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 08:41:48
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 21:33:09
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function(head, k) {
    var curr = head;
    var len = 0;
    while(curr !== null) {
        len++;
        curr = curr.next;
    }
    var i = 1;
    var targetNode = head;
    while(i < (len - k + 1)) {
        targetNode = targetNode.next;
        i++;
    }
    return targetNode.val
};