/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 22:11:33
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 22:13:32
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    var arr = [];
    while (head !== null) {
        arr.push(head.val);
        head = head.next;
    }
    return arr.reverse();
};