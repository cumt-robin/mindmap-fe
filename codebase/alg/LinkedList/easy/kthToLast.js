
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
    var nextNode = head.next;
    var len = 1;
    while(nextNode) {
        len++;
        nextNode = nextNode.next;
    }
    var i = 1;
    var targetNode = head;
    while(i < (len - k + 1)) {
        targetNode = targetNode.next;
        i++;
    }
    return targetNode.val
};