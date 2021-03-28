/*
 * @Author: 蒋文斌
 * @Date: 2021-03-12 08:53:13
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-12 09:11:34
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/merge-two-sorted-lists/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 要注意判断空链表
 * 从两个链表的开头开始，找最小node，然后求最小node的next节点。其实就是把最大node和最小node的原有next节点继续递归。
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (!l1 && !l2) {
        return null
    } else if (!l1 || !l2) {
        return l1 || l2;
    }
    var smallNode = l1.val < l2.val ? l1 : l2;
    var bigNode = l1.val >= l2.val ? l1 : l2;
    var listNode = smallNode;
    listNode.next = mergeTwoLists(listNode.next, bigNode)
    return listNode;
};
