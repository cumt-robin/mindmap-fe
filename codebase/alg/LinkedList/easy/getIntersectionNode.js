/*
 * @Author: 蒋文斌
 * @Date: 2021-03-13 20:24:12
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-13 21:56:08
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 放两个指针，把两条路都走一遍，先走自己的，再走对方的，最后碰到了就是交点
 * 但是要注意，两条线可能永远不相交，那么换路走的时候主要不要死循环
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    var n1 = headA;
    var n2 = headB;
    // 注意，如果是平行链表，在最后null===null的时候会出循环
    while (n1 !== n2) {
        n1 = n1 ? n1.next : headB;
        n2 = n2 ? n2.next : headA;
    }
    return n1;
};