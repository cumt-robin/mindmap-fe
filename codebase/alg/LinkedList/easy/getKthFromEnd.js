/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 08:41:48
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 21:33:16
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 这个和kthToLast是一样的解法。
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
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
    return targetNode
};