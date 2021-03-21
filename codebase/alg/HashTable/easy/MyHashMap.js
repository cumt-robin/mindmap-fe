/*
 * @Author: 蒋文斌
 * @Date: 2021-03-21 12:55:40
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 13:05:34
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/design-hashmap/

/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
    this.map = {};
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    this.map[key] = value
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    if (this.map.hasOwnProperty(key)) {
        return this.map[key]
    } else {
        return -1;
    }
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    if (this.map.hasOwnProperty(key)) {
        delete this.map[key]
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */