
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
    return targetNode
};