/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 08:41:48
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 08:50:43
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/delete-middle-node-lcci/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
 var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};