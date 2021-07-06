
// https://leetcode-cn.com/problems/remove-duplicate-node-lcci/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 跟这一题不太一样，是未排序的。https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
 * 需要有一个数组或者Map来存已经走过的节点，或者依次遍历 start，直到 start 为 null 为止
 * 这个解法没有使用数组或Map缓存区，空间复杂度是超过99%的解法
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function(head) {
    let start = head;
    while(start !== null) {
        let prev = start;
        let curr = start.next;
        while(curr) {
            if (curr.val === start.val) {
                // 出现了与 start 值相同的节点，删除它
                prev.next = curr.next;
            } else {
                // 没出现，就更新 prev
                prev = curr;
            }
            // 每次都要更新 curr
            curr = curr.next;
        }
        // 更新 start，继续下一轮检查
        start = start.next;
    }
    return head;
};