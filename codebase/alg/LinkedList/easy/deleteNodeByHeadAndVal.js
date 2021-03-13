/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 21:41:49
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 11:52:16
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 没啥技巧，主要是prev和curr的迭代
 * newHead这里就比较简单，只要删的不是头节点，newHead就直接是头节点；否则就要处理下
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
    var prev = null;
    var curr = head;
    var newHead = head;
    while(curr !== null) {
        if (curr.val === val) {
            if (prev === null) {
                newHead = curr.next;
            } else {
                prev.next = curr.next;
            }
            break;
        }
        prev = curr;
        curr = curr.next;
    }
    return newHead
};