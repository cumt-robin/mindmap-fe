
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 删除排序链表中的重复元素
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }
    let prev = head;
    let curr = head.next;
    while(curr) {
        if (curr.val === prev.val) {
            // 和前一个值相同，删掉当前值，其实就是把 prev 的 next 指针设置为 curr 的 next 指针
            prev.next = curr.next;
        } else {
            // 出现了不同，更新 prev
            prev = curr;
        }
        // 每次循环，都要更新 curr
        curr = curr.next;
    }
    return head;
};