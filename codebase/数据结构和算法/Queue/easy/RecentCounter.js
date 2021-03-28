/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 12:46:41
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 12:51:06
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/number-of-recent-calls/

var RecentCounter = function() {
    this.queue = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
    while(t - this.queue[0] > 3000) {
        this.queue.shift();
    }
    this.queue.push(t)
    return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */