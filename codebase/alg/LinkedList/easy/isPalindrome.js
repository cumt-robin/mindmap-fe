/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 19:32:35
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 20:06:52
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/palindrome-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 链表转数组，最后比较数组是不是回文就简单点
 * 又学到了一个新知识，双指针遍历，速度确实快一些
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    var vals = [];
    while (head !== null) {
        vals.push(head.val)
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
};