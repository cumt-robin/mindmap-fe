/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 08:41:48
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 21:29:21
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
 * 这个有点套路，盗用下一个节点的值，然后把自己的next指针再往后移一下。相当于当前节点成为了下个节点。
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};