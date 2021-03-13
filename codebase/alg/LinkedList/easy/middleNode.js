/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 11:54:03
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 18:59:35
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/middle-of-the-linked-list/

/**
 * 快慢指针还是好用
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    var slow = head;
    var fast = head;
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};