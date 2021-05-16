/*
 * @Author: 蒋文斌
 * @Date: 2021-05-16 11:18:52
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-05-16 12:18:12
 * @Description: 合并两个有序数组
 */

// https://leetcode-cn.com/problems/merge-sorted-array/

/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。
 * 要想 in-place 替换，又不影响 nums1 的遍历，只能从尾部开始处理。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (k >= 0) {
        if (j < 0 || nums1[i] >= nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }  
};