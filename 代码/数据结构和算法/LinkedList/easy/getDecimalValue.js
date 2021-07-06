
// https://leetcode-cn.com/problems/convert-binary-number-in-a-linked-list-to-integer/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 二进制链表转整数
 * 首先要统计有多少位，才好计算
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
    let count = 0;
    let curr = head;
    while(curr) {
        ++count;
        curr = curr.next;
    }
    curr = head;
    let decimalValue = 0;
    let power = count - 1;
    while(curr) {
        decimalValue += curr.val * Math.pow(2, power--);
        curr = curr.next;
    }
    return decimalValue;
};